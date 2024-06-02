import { ButtonHTMLAttributes } from "react"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  buttonStyle?: "style1" | "style2"
}

export const Button = (props: ButtonProps) => {
  return (
    <button
      {...{
        ...props,
        className: `button ${props.buttonStyle === "style2" ? "button-style-2" : "button-style-1"}${props.className ? " " + props.className : ""}`,
      }}
    />
  )
}
