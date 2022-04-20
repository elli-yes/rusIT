import css from "./Input.module.css"

export const Input = ({ placeholder, value, onChange, type = "text" }) => {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={css.input}
    />
  )
}
