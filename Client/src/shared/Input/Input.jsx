import css from "./Input.module.css"

export const Input = ({ placeholder, value, onChange }) => {
  return (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      type="text"
      className={css.input}
    />
  )
}
