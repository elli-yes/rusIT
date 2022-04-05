import css from "./Button.module.css"

export const Button = (props) => {
  return (
    <button className={`${css[props.variant]} ${css.button}`}>
      {props.children}
    </button>
  )
}
