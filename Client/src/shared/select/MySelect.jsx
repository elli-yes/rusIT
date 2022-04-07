import css from "./MySelect.module.css"

export const MySelect = ({ options, defaultValue, value, onChange }) => {
  return (
    <div className={css.container}>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className={css.select}
      >
        <option value="status">{defaultValue}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.name}
          </option>
        ))}
      </select>
      <hr />
    </div>
  )
}
