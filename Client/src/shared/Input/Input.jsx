import css from "./Input.module.css"

export const Input = ({ placeholder, value, onChange }) => {
  return (
    <input
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      type="text"
      className={css.input}
    />
  )
}
