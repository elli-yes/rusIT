import css from "./BroadcastItem.module.css"

export const Info = ({ data }) => {
  return (
    <>
      <div className={css.info}>
        <span>
          <div className={css.online}></div>
          <div className={css.username}>{data.username}</div>
          <span> online at:</span>
        </span>

        <div className={css.stream_title}>{data.stream_title}</div>
      </div>
      <div className={css.about}>
        <h4>About channel:</h4>
        <div>{data.description}</div>
      </div>
    </>
  )
}
