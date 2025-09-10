import { ButtonHTMLAttributes } from "react"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  buttonStyle?: "style1" | "style2"
}

export const Button = (props: ButtonProps) => {
  const { buttonStyle, ...rest } = props
  return (
    <button
      {...{
        ...rest,
        className: `button ${buttonStyle === "style2" ? "button-style-2" : "button-style-1"}${props.className ? " " + props.className : ""}`,
      }}
    />
  )
}
