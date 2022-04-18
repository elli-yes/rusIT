import css from "./BroadcastItem.module.css"

export const Info = ({ data }) => {
  return (
    <>
      <div className={css.info}>
        <span>
          <div className={data[0].status ? css.online : css.offline}></div>
          <div className={css.login}>{data[0].login}</div>
        </span>
        <div className={css.title}>{data[0].title}</div>
      </div>
      <div className={css.about}></div>
    </>
  )
}
