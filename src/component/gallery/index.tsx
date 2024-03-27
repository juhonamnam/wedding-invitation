import { useCallback, useEffect, useRef, useState } from "react"
import image1 from "../../image/sample1.png"
import image2 from "../../image/sample2.png"
import image3 from "../../image/sample3.png"

const ITEMS = [
  <img src={image1} draggable={false} />,
  <img src={image2} draggable={false} />,
  <img src={image3} draggable={false} />,
]

const ITEMS_WITH_KEYS = ITEMS.map((item, idx) => ({ key: idx, item }))

export const Gallery = () => {
  const carouselRef = useRef<HTMLDivElement>(
    null,
  ) as React.MutableRefObject<HTMLDivElement>
  const [slide, setSlide] = useState(1)
  const [isDragging, setIsDragging] = useState(false)
  const [dragOption, setDragOption] = useState({
    startingClientX: 0,
    currentTranslateX: 0,
  })

  const [isTransitioning, setIsTransitioning] = useState(false)

  const dragStart = (clientX: number) => {
    if (isTransitioning || isDragging) return
    setDragOption({
      startingClientX: clientX,
      currentTranslateX: -carouselRef.current.clientWidth,
    })
    setIsDragging(true)
  }

  // drag 중 이벤트
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

  // drag 종료 이벤트
  const dragEnd = useCallback(() => {
    if (isDragging) {
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

      setIsTransitioning(true)

      setTimeout(() => {
        setDragOption((prev) => ({
          ...prev,
          currentTranslateX: -carouselRef.current.clientWidth,
        }))
        setIsTransitioning(false)
        setIsDragging(false)
        setSlide((prev) => (prev + move + ITEMS.length) % ITEMS.length)
      }, 300)
    }
  }, [dragOption, isDragging])

  const onMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging || isTransitioning) return
      dragging(e.clientX)
    },
    [isDragging, isTransitioning, dragging],
  )

  const onTouchMove = useCallback(
    (e: TouchEvent) => {
      if (!isDragging || isTransitioning) return
      dragging(e.targetTouches[0].clientX)
    },
    [isDragging, isTransitioning, dragging],
  )

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
            className={`carousel-list${isTransitioning ? " transitioning" : ""}`}
            style={
              isDragging
                ? { transform: `translateX(${dragOption.currentTranslateX}px)` }
                : {}
            }
          >
            {isDragging ? (
              <>
                {[
                  ...(slide === 0
                    ? [ITEMS_WITH_KEYS[ITEMS_WITH_KEYS.length - 1]]
                    : []),
                  ...ITEMS_WITH_KEYS.slice(
                    slide === 0 ? 0 : slide - 1,
                    slide + 2,
                  ),
                  ...(slide === ITEMS_WITH_KEYS.length - 1
                    ? [ITEMS_WITH_KEYS[0]]
                    : []),
                ].map(({ item, key }) => (
                  <div className="carousel-item" key={key}>
                    <h2>{item}</h2>
                  </div>
                ))}
              </>
            ) : (
              <div className="carousel-item">
                <h2>{ITEMS[slide]}</h2>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
