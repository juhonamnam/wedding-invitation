import { HTMLAttributes, useEffect, useRef } from "react"

export const LazyDiv = (props: HTMLAttributes<HTMLDivElement>) => {
  const ref = useRef({} as HTMLDivElement)

  useEffect(() => {
    const divElement = ref.current
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("lazy-active")
          observer.unobserve(entry.target)
        }
      })
    })
    observer.observe(divElement)

    return () => observer.unobserve(divElement)
  }, [])
  return <div ref={ref} {...props} />
}
