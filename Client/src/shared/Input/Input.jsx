import css from "./Input.module.css"

export const Input = ({
  placeholder,
  value,
  onChange = () => {},
  type = "text",
  disabled = "",
}) => {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={css.input}
      disabled={disabled}
    />
  )
}
