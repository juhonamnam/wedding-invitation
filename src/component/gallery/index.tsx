import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { ReactComponent as ArrowLeft } from "../../image/angle-left-sm.svg"
import image1 from "../../image/sample1.png"
import image2 from "../../image/sample2.png"
import image3 from "../../image/sample3.png"
import image4 from "../../image/sample4.png"
import image5 from "../../image/sample5.png"
import image6 from "../../image/sample6.png"

const ITEMS = [
  <img src={image1} draggable={false} alt="image1" />,
  <img src={image2} draggable={false} alt="image2" />,
  <img src={image3} draggable={false} alt="image3" />,
  <img src={image4} draggable={false} alt="image4" />,
  <img src={image5} draggable={false} alt="image5" />,
  <img src={image6} draggable={false} alt="image6" />,
].map((item, idx) => (
  <div className="carousel-item" key={idx}>
    {item}
  </div>
))

type Status =
  | "stationary"
  | "clicked"
  | "dragging"
  | "dragEnding"
  | "prepareMoving"
  | "moving"

type DragOption = {
  startingClientX: number
  currentTranslateX: number
}

type ClickMove = "left" | "right" | null

export const Gallery = () => {
  const carouselRef = useRef<HTMLDivElement>(
    null,
  ) as React.MutableRefObject<HTMLDivElement>

  const [slide, _setSlide] = useState(0)
  const slideRef = useRef(0)
  const setSlide = (slide: number) => {
    _setSlide(slide)
    slideRef.current = slide
  }

  const [status, _setStatus] = useState<Status>("stationary")
  const statusRef = useRef<Status>("stationary")
  const setStatus = (status: Status) => {
    _setStatus(status)
    statusRef.current = status
  }

  const [dragOption, _setDragOption] = useState<DragOption>({
    startingClientX: 0,
    currentTranslateX: 0,
  })
  const dragOptionRef = useRef<DragOption>({
    startingClientX: 0,
    currentTranslateX: 0,
  })
  const setDragOption = (dragOption: DragOption) => {
    _setDragOption(dragOption)
    dragOptionRef.current = dragOption
  }

  const [moveOption, setMoveOption] = useState({
    currentTranslateX: 0,
    srcIdx: 0,
    dstIdx: 0,
  })

  const clickMoveRef = useRef<ClickMove>(null)
  const setClickMove = (clickMove: ClickMove) => {
    clickMoveRef.current = clickMove
  }

  // For debugging
  // useEffect(() => {
  //   console.log(status)
  // }, [status])

  const click = (status: Status, clientX: number) => {
    if (status !== "stationary") return
    setDragOption({
      startingClientX: clientX,
      currentTranslateX: -carouselRef.current.clientWidth,
    })
    setStatus("clicked")
  }

  const dragging = useCallback((dragOption: DragOption, clientX: number) => {
    let moveTranslateX = clientX - dragOption.startingClientX
    if (moveTranslateX === 0) return

    setStatus("dragging")

    if (moveTranslateX > carouselRef.current.clientWidth) {
      moveTranslateX = carouselRef.current.clientWidth
    } else if (moveTranslateX < -carouselRef.current.clientWidth) {
      moveTranslateX = -carouselRef.current.clientWidth
    }

    setDragOption({
      ...dragOption,
      currentTranslateX: moveTranslateX - carouselRef.current.clientWidth,
    })
  }, [])

  const dragEnd = useCallback((slide: number, dragOption: DragOption) => {
    let move = 0
    if (dragOption.currentTranslateX < -carouselRef.current.clientWidth * 1.1) {
      move = 1
    } else if (
      dragOption.currentTranslateX >
      -carouselRef.current.clientWidth * 0.9
    ) {
      move = -1
    }

    setDragOption({
      ...dragOption,
      currentTranslateX: -carouselRef.current.clientWidth * (move + 1),
    })

    setStatus("dragEnding")

    setTimeout(() => {
      setDragOption({
        ...dragOption,
        currentTranslateX: -carouselRef.current.clientWidth,
      })
      setStatus("stationary")
      setSlide((slide + move + ITEMS.length) % ITEMS.length)
    }, 300)
  }, [])

  const move = useCallback((srcIdx: number, dstIdx: number) => {
    setSlide(dstIdx)
    setStatus("prepareMoving")
    let srcTranslateX
    let dstTranslateX: number
    if (srcIdx < dstIdx) {
      srcTranslateX = 0
      dstTranslateX = -carouselRef.current.clientWidth * (dstIdx - srcIdx)
    } else {
      srcTranslateX = -carouselRef.current.clientWidth * (srcIdx - dstIdx)
      dstTranslateX = 0
    }

    setMoveOption({
      currentTranslateX: srcTranslateX,
      srcIdx,
      dstIdx,
    })

    setTimeout(() => {
      setStatus("moving")
      setMoveOption({
        currentTranslateX: dstTranslateX,
        srcIdx,
        dstIdx,
      })
      setTimeout(() => {
        setClickMove(null)
        setStatus("stationary")
      }, 300)
    }, 0)
  }, [])

  const onMouseMove = useCallback(
    (e: MouseEvent) => {
      const status = statusRef.current

      if (["clicked", "dragging"].includes(status)) {
        e.preventDefault()
        dragging(dragOptionRef.current, e.clientX)
      }
    },
    [dragging],
  )

  const onTouchMove = useCallback(
    (e: TouchEvent) => {
      const status = statusRef.current

      if (["clicked", "dragging"].includes(status)) {
        e.preventDefault()
        dragging(dragOptionRef.current, e.targetTouches[0].clientX)
      }
    },
    [dragging],
  )

  const onMouseTouchUp = useCallback(() => {
    const status = statusRef.current
    const clickMove = clickMoveRef.current
    const slide = slideRef.current

    if (status === "clicked") {
      if (clickMove === "left") {
        move(slide, (slide + ITEMS.length - 1) % ITEMS.length)
      } else if (clickMove === "right") {
        move(slide, (slide + 1) % ITEMS.length)
      } else {
        setStatus("stationary")
      }
    } else if (status === "dragging") {
      dragEnd(slide, dragOptionRef.current)
    }
  }, [dragEnd, move])

  useEffect(() => {
    window.addEventListener("mousemove", onMouseMove)
    window.addEventListener("touchmove", onTouchMove)
    window.addEventListener("mouseup", onMouseTouchUp)
    window.addEventListener("touchend", onMouseTouchUp)

    return () => {
      window.removeEventListener("mousemove", onMouseMove)
      window.removeEventListener("touchmove", onTouchMove)
      window.removeEventListener("mouseup", onMouseTouchUp)
      window.removeEventListener("touchend", onMouseTouchUp)
    }
  }, [onMouseMove, onTouchMove, onMouseTouchUp])

  const onIndicatorClick = useCallback(
    (status: Status, srcIdx: number, dstIdx: number) => {
      if (status !== "stationary" || srcIdx === dstIdx) return
      move(srcIdx, dstIdx)
    },
    [move],
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
      <h2 className="english">Gallery</h2>
      <div className="carousel-wrapper">
        <div
          className="carousel"
          ref={carouselRef}
          onMouseDown={(e) => click(status, e.clientX)}
          onTouchStart={(e) => click(status, e.targetTouches[0].clientX)}
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
                Math.min(moveOption.srcIdx, moveOption.dstIdx),
                Math.max(moveOption.srcIdx, moveOption.dstIdx) + 1,
              )}
            {["stationary", "clicked"].includes(status) && ITEMS[slide]}
          </div>
          <div className="carousel-control">
            <div
              className="control left"
              onMouseDown={() => {
                if (status === "stationary") setClickMove("left")
              }}
              onTouchStart={() => {
                if (status === "stationary") setClickMove("left")
              }}
            >
              <ArrowLeft className="arrow" />
            </div>
            <div
              className="control right"
              onMouseDown={() => {
                if (status === "stationary") setClickMove("right")
              }}
              onTouchStart={() => {
                if (status === "stationary") setClickMove("right")
              }}
            >
              <ArrowLeft className="arrow right" />
            </div>
          </div>
        </div>
        <div className="carousel-indicator">
          {ITEMS.map((_, idx) => (
            <div
              key={idx}
              className={`indicator${idx === slide ? " active" : ""}`}
              onClick={() => onIndicatorClick(status, slide, idx)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
