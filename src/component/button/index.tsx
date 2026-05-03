import { ButtonHTMLAttributes } from "react"

/**
 * 버튼 컴포넌트의 속성 정의
 */
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** 버튼 스타일 (style1: 기본, style2: 강조/모달용) */
  buttonStyle?: "style1" | "style2"
}

/**
 * 공통적으로 사용되는 버튼 컴포넌트입니다.
 *
 * @param {ButtonProps} props - 버튼 속성
 * @returns {JSX.Element} 버튼 요소
 */
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
