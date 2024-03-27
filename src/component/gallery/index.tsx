import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import image1 from "../../image/sample1.png"
import image2 from "../../image/sample2.png"
import image3 from "../../image/sample3.png"

const ITEMS = [
  <img src={image1} draggable={false} alt="image1" />,
  <img src={image2} draggable={false} alt="image2" />,
  <img src={image3} draggable={false} alt="image3" />,
].map((item, idx) => (
  <div className="carousel-item" key={idx}>
    {item}
  </div>
))

export const Gallery = () => {
  const carouselRef = useRef<HTMLDivElement>(
    null,
  ) as React.MutableRefObject<HTMLDivElement>
  const [slide, setSlide] = useState(0)
  const [status, setStatus] = useState<
    "stationary" | "dragging" | "dragEnding" | "prepareMoving" | "moving"
  >("stationary")
  const [dragOption, setDragOption] = useState({
    startingClientX: 0,
    currentTranslateX: 0,
  })
  const [moveOption, setMoveOption] = useState({
    currentTranslateX: 0,
    srcIdx: 0,
    destIdx: 0,
  })

  const dragStart = (clientX: number) => {
    if (status !== "stationary") return
    setDragOption({
      startingClientX: clientX,
      currentTranslateX: -carouselRef.current.clientWidth,
    })
    setStatus("dragging")
  }

  const dragging = useCallback(
    (clientX: number) => {
      let moveTranslateX = clientX - dragOption.startingClientX

      if (moveTranslateX > carouselRef.current.clientWidth) {
        moveTranslateX = carouselRef.current.clientWidth
      } else if (moveTranslateX < -carouselRef.current.clientWidth) {
        moveTranslateX = -carouselRef.current.clientWidth
      }

      setDragOption((prev) => ({
        ...prev,
        currentTranslateX: moveTranslateX - carouselRef.current.clientWidth,
      }))
    },
    [dragOption],
  )

  const onMouseMove = useCallback(
    (e: MouseEvent) => {
      if (status === "dragging") {
        e.preventDefault()
        dragging(e.clientX)
      }
    },
    [status, dragging],
  )

  const onTouchMove = useCallback(
    (e: TouchEvent) => {
      if (status === "dragging") {
        e.preventDefault()
        dragging(e.targetTouches[0].clientX)
      }
    },
    [status, dragging],
  )

  const dragEnd = useCallback(() => {
    if (status === "dragging") {
      let move = 0
      if (
        dragOption.currentTranslateX <
        -carouselRef.current.clientWidth * 1.1
      ) {
        move = 1
      } else if (
        dragOption.currentTranslateX >
        -carouselRef.current.clientWidth * 0.9
      ) {
        move = -1
      }

      setDragOption((prev) => ({
        ...prev,
        currentTranslateX: -carouselRef.current.clientWidth * (move + 1),
      }))

      setStatus("dragEnding")

      setTimeout(() => {
        setDragOption((prev) => ({
          ...prev,
          currentTranslateX: -carouselRef.current.clientWidth,
        }))
        setStatus("stationary")
        setSlide((prev) => (prev + move + ITEMS.length) % ITEMS.length)
      }, 300)
    }
  }, [dragOption, status])

  useEffect(() => {
    window.addEventListener("mousemove", onMouseMove)
    window.addEventListener("touchmove", onTouchMove)
    window.addEventListener("mouseup", dragEnd)
    window.addEventListener("touchend", dragEnd)

    return () => {
      window.removeEventListener("mousemove", onMouseMove)
      window.removeEventListener("touchmove", onTouchMove)
      window.removeEventListener("mouseup", dragEnd)
      window.removeEventListener("touchend", dragEnd)
    }
  }, [onMouseMove, onTouchMove, dragEnd])

  const moveTo = useCallback(
    (idx: number) => {
      if (status === "stationary") {
        setSlide(idx)
        setStatus("prepareMoving")
        let srcTranslateX
        let dstTranslateX: number
        if (slide < idx) {
          srcTranslateX = 0
          dstTranslateX = -carouselRef.current.clientWidth * (idx - slide)
        } else {
          srcTranslateX = -carouselRef.current.clientWidth * (slide - idx)
          dstTranslateX = 0
        }

        setMoveOption({
          currentTranslateX: srcTranslateX,
          srcIdx: slide,
          destIdx: idx,
        })

        setTimeout(() => {
          setStatus("moving")
          setMoveOption({
            currentTranslateX: dstTranslateX,
            srcIdx: slide,
            destIdx: idx,
          })
          setTimeout(() => {
            setStatus("stationary")
          }, 300)
        }, 0)
      }
    },
    [status, slide],
  )

  const transformStyle = useMemo(() => {
    switch (status) {
      case "dragging":
      case "dragEnding":
        return { transform: `translateX(${dragOption.currentTranslateX}px)` }
      case "prepareMoving":
      case "moving":
        return { transform: `translateX(${moveOption.currentTranslateX}px)` }
      default:
        return {}
    }
  }, [status, dragOption, moveOption])

  return (
    <div className="section gallery">
      <h1>겔러리</h1>
      <div className="carousel-wrapper">
        <div
          className="carousel"
          ref={carouselRef}
          onMouseDown={(e) => dragStart(e.clientX)}
          onTouchStart={(e) => dragStart(e.targetTouches[0].clientX)}
        >
          <div
            className={`carousel-list${["dragEnding", "moving"].includes(status) ? " transitioning" : ""}`}
            style={transformStyle}
          >
            {["dragging", "dragEnding"].includes(status) && [
              ...(slide === 0 ? [ITEMS[ITEMS.length - 1]] : []),
              ...ITEMS.slice(slide === 0 ? 0 : slide - 1, slide + 2),
              ...(slide === ITEMS.length - 1 ? [ITEMS[0]] : []),
            ]}
            {["prepareMoving", "moving"].includes(status) &&
              ITEMS.slice(
                Math.min(moveOption.srcIdx, moveOption.destIdx),
                Math.max(moveOption.srcIdx, moveOption.destIdx) + 1,
              )}
            {status === "stationary" && ITEMS[slide]}
          </div>
        </div>
        <div className="carousel-indicator">
          {ITEMS.map((_, idx) => (
            <div
              key={idx}
              className={`indicator${idx === slide ? " active" : ""}`}
              onClick={() => {
                if (idx === slide) return
                moveTo(idx)
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
