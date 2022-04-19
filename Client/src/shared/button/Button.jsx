import css from "./Button.module.css"

export const Button = ({ children, variant, onClick, type }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${css[variant]} ${css.button}`}
    >
      {children}
    </button>
  )
}
