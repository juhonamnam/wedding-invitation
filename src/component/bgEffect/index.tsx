import { useEffect, useRef } from "react"
import patelUrl from "../../image/petal.png"

// Petal class
class Petal {
  x: number
  y: number
  w: number
  h: number
  opacity: number
  flip: number
  xSpeed: number
  ySpeed: number
  flipSpeed: number

  constructor(
    private canvas: HTMLCanvasElement,
    private ctx: CanvasRenderingContext2D,
    private petalImg: HTMLImageElement,
  ) {
    this.x = Math.random() * canvas.width
    this.y = Math.random() * canvas.height * 2 - canvas.height
    this.w = 25 + Math.random() * 15
    this.h = 20 + Math.random() * 10
    this.opacity = this.w / 80
    this.flip = Math.random()

    this.xSpeed = 1.5 + Math.random() * 2
    this.ySpeed = 1 + Math.random() * 1
    this.flipSpeed = Math.random() * 0.03
  }

  draw() {
    if (this.y > this.canvas.height || this.x > this.canvas.width) {
      this.x = -this.petalImg.width
      this.y = Math.random() * this.canvas.height * 2 - this.canvas.height
      this.xSpeed = 1.5 + Math.random() * 2
      this.ySpeed = 1 + Math.random() * 1
      this.flip = Math.random()

      const rand = Math.random() * (this.canvas.width + this.canvas.height)
      if (rand > this.canvas.width) {
        this.x = 0
        this.y = rand - this.canvas.width
      } else {
        this.x = rand
        this.y = 0
      }
    }
    this.ctx.globalAlpha = this.opacity
    this.ctx.drawImage(
      this.petalImg,
      this.x,
      this.y,
      this.w * (0.6 + Math.abs(Math.cos(this.flip)) / 3),
      this.h * (0.8 + Math.abs(Math.sin(this.flip)) / 5),
    )
  }

  animate() {
    this.x += this.xSpeed
    this.y += this.ySpeed
    this.flip += this.flipSpeed
    this.draw()
  }
}

export const BGEffect = () => {
  const ref = useRef<HTMLCanvasElement>(
    null,
  ) as React.MutableRefObject<HTMLCanvasElement>

  const petalsRef = useRef<Petal[]>([])

  const resizeTimeoutRef = useRef(0)
  const animationFrameIdRef = useRef(0)

  useEffect(() => {
    const canvas = ref.current

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D

    const petalImg = new Image()
    petalImg.src = patelUrl

    const initializePetals = () => {
      const count = Math.floor((window.innerWidth * window.innerHeight) / 30000)
      const petals = []
      for (let i = 0; i < count; i++) {
        petals.push(new Petal(canvas, ctx, petalImg))
      }
      petalsRef.current = petals
    }

    initializePetals()

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      petalsRef.current.forEach((petal) => petal.animate())
      animationFrameIdRef.current = requestAnimationFrame(render)
    }

    render()

    const onResize = () => {
      clearTimeout(resizeTimeoutRef.current)
      resizeTimeoutRef.current = window.setTimeout(() => {
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
        initializePetals()
      }, 100)
    }

    window.addEventListener("resize", onResize)

    return () => {
      window.removeEventListener("resize", onResize)
      cancelAnimationFrame(animationFrameIdRef.current)
    }
  }, [])

  return (
    <div className="bg-effect">
      <canvas ref={ref} style={{ position: "absolute" }} />
    </div>
  )
}
