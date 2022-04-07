import css from "./Button.module.css"

export const Button = ({ children, variant, onClick }) => {
  return (
    <button onClick={onClick} className={`${css[variant]} ${css.button}`}>
      {children}
    </button>
  )
}
