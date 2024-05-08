import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { ReactComponent as ArrowLeft } from "../../image/angle-left-sm.svg"
import image1 from "../../image/sample1.png"
import image2 from "../../image/sample2.png"
import image3 from "../../image/sample3.png"
import image4 from "../../image/sample4.png"
import image5 from "../../image/sample5.png"
import image6 from "../../image/sample6.png"
import { LazyDiv } from "../lazyDiv"

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

const DRAG_SENSITIVITY = 15

type Status =
  | "stationary"
  | "clicked"
  | "clickCanceled"
  | "dragging"
  | "dragEnding"
  | "moving-left"
  | "moving-right"

type DragOption = {
  startingClientX: number
  startingClientY: number
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
    startingClientY: 0,
    currentTranslateX: 0,
  })
  const dragOptionRef = useRef<DragOption>({
    startingClientX: 0,
    startingClientY: 0,
    currentTranslateX: 0,
  })
  const setDragOption = (dragOption: DragOption) => {
    _setDragOption(dragOption)
    dragOptionRef.current = dragOption
  }

  const [moveOption, setMoveOption] = useState({
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

  const click = (
    status: Status,
    clientX: number,
    clientY: number,
    carouselWidth: number,
  ) => {
    if (status !== "stationary") return
    setDragOption({
      startingClientX: clientX,
      startingClientY: clientY,
      currentTranslateX: -carouselWidth,
    })
    setStatus("clicked")
  }

  const dragging = useCallback(
    (dragOption: DragOption, clientX: number, carouselWidth: number) => {
      let moveTranslateX = clientX - dragOption.startingClientX

      if (moveTranslateX > carouselWidth) {
        moveTranslateX = carouselWidth
      } else if (moveTranslateX < -carouselWidth) {
        moveTranslateX = -carouselWidth
      }

      setDragOption({
        ...dragOption,
        currentTranslateX: moveTranslateX - carouselWidth,
      })
    },
    [],
  )

  const dragEnd = useCallback(
    (slide: number, dragOption: DragOption, carouselWidth: number) => {
      let move = 0
      if (dragOption.currentTranslateX < -carouselWidth * 1.1) {
        move = 1
      } else if (dragOption.currentTranslateX > -carouselWidth * 0.9) {
        move = -1
      }

      setDragOption({
        ...dragOption,
        currentTranslateX: -carouselWidth * (move + 1),
      })

      setStatus("dragEnding")

      setTimeout(() => {
        setDragOption({
          ...dragOption,
          currentTranslateX: -carouselWidth,
        })
        setStatus("stationary")
        setSlide((slide + move + ITEMS.length) % ITEMS.length)
      }, 300)
    },
    [],
  )

  const move = useCallback(
    (srcIdx: number, dstIdx: number, carouselWidth: number) => {
      setSlide(dstIdx)
      if (srcIdx < dstIdx) {
        setStatus("moving-right")
      } else {
        setStatus("moving-left")
      }

      setMoveOption({ srcIdx, dstIdx })

      setTimeout(() => {
        setClickMove(null)
        setStatus("stationary")
      }, 300)
    },
    [],
  )

  /* Events */
  const onMouseMove = useCallback(
    (e: MouseEvent) => {
      const status = statusRef.current

      if (status === "clicked") {
        setStatus("dragging")
      } else if (status === "dragging") {
        e.preventDefault()
        dragging(
          dragOptionRef.current,
          e.clientX,
          carouselRef.current.clientWidth,
        )
      }
    },
    [dragging],
  )

  const onTouchMove = useCallback(
    (e: TouchEvent) => {
      const status = statusRef.current

      if (status === "clicked") {
        e.preventDefault()
        const xMove =
          e.targetTouches[0].clientX - dragOptionRef.current.startingClientX
        const yMove =
          e.targetTouches[0].clientY - dragOptionRef.current.startingClientY
        if (Math.abs(xMove) > DRAG_SENSITIVITY) {
          setStatus("dragging")
        } else if (Math.abs(yMove) > DRAG_SENSITIVITY) {
          setStatus("clickCanceled")
        }
      } else if (status === "dragging") {
        e.preventDefault()
        dragging(
          dragOptionRef.current,
          e.targetTouches[0].clientX,
          carouselRef.current.clientWidth,
        )
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
        move(
          slide,
          (slide + ITEMS.length - 1) % ITEMS.length,
          carouselRef.current.clientWidth,
        )
      } else if (clickMove === "right") {
        move(slide, (slide + 1) % ITEMS.length, carouselRef.current.clientWidth)
      } else {
        setStatus("stationary")
      }
    } else if (status === "dragging") {
      dragEnd(slide, dragOptionRef.current, carouselRef.current.clientWidth)
    } else if (status === "clickCanceled") {
      setStatus("stationary")
    }
  }, [dragEnd, move])

  useEffect(() => {
    const carouselElement = carouselRef.current

    window.addEventListener("mousemove", onMouseMove)
    carouselElement.addEventListener("touchmove", onTouchMove)
    window.addEventListener("mouseup", onMouseTouchUp)
    window.addEventListener("touchend", onMouseTouchUp)
    return () => {
      window.removeEventListener("mousemove", onMouseMove)
      carouselElement.removeEventListener("touchmove", onTouchMove)
      window.removeEventListener("mouseup", onMouseTouchUp)
      window.removeEventListener("touchend", onMouseTouchUp)
    }
  }, [onMouseMove, onTouchMove, onMouseTouchUp])

  const onIndicatorClick = useCallback(
    (status: Status, srcIdx: number, dstIdx: number) => {
      if (status !== "stationary" || srcIdx === dstIdx) return
      move(srcIdx, dstIdx, carouselRef.current.clientWidth)
    },
    [move],
  )

  const transformStyle = useMemo(() => {
    switch (status) {
      case "dragging":
      case "dragEnding":
        return { transform: `translateX(${dragOption.currentTranslateX}px)` }
      default:
        return {}
    }
  }, [status, dragOption])

  const transformClass = useMemo(() => {
    const className = "carousel-list"
    switch (status) {
      case "dragEnding":
        return className + " transitioning"
      case "moving-left":
        return className + " moving-left"
      case "moving-right":
        return className + " moving-right"
      default:
        return className
    }
  }, [status])

  return (
    <LazyDiv className="card gallery">
      <h2 className="english">Gallery</h2>
      <div className="carousel-wrapper">
        <div
          className="carousel"
          ref={carouselRef}
          onMouseDown={(e) =>
            click(
              statusRef.current,
              e.clientX,
              e.clientY,
              e.currentTarget.clientWidth,
            )
          }
          onTouchStart={(e) =>
            click(
              statusRef.current,
              e.targetTouches[0].clientX,
              e.targetTouches[0].clientY,
              e.currentTarget.clientWidth,
            )
          }
        >
          <div className={transformClass} style={transformStyle}>
            {["dragging", "dragEnding"].includes(status) && [
              ...(slide === 0 ? [ITEMS[ITEMS.length - 1]] : []),
              ...ITEMS.slice(slide === 0 ? 0 : slide - 1, slide + 2),
              ...(slide === ITEMS.length - 1 ? [ITEMS[0]] : []),
            ]}
            {status === "moving-right" &&
              ITEMS.slice(moveOption.srcIdx, moveOption.dstIdx + 1)}
            {status === "moving-left" &&
              ITEMS.slice(moveOption.dstIdx, moveOption.srcIdx + 1)}
            {["stationary", "clicked", "clickCanceled"].includes(status) &&
              ITEMS[slide]}
          </div>
          <div className="carousel-control">
            <div
              className="control left"
              onMouseDown={() => {
                if (statusRef.current === "stationary") setClickMove("left")
              }}
              onTouchStart={() => {
                if (statusRef.current === "stationary") setClickMove("left")
              }}
            >
              <ArrowLeft className="arrow" />
            </div>
            <div
              className="control right"
              onMouseDown={() => {
                if (statusRef.current === "stationary") setClickMove("right")
              }}
              onTouchStart={() => {
                if (statusRef.current === "stationary") setClickMove("right")
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
              onClick={() =>
                onIndicatorClick(statusRef.current, slideRef.current, idx)
              }
            />
          ))}
        </div>
      </div>
    </LazyDiv>
  )
}
