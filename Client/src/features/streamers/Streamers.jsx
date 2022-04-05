import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { turnOff, turnOn } from "./streamersSlice"

export function Counter() {
  const count = useSelector((state) => state.streamers.online)
  const dispatch = useDispatch()

  return (
    <div>
      <div>
        <button
          aria-label="Increment value"
          onClick={() => dispatch(turnOn({ stream: "1" }))}
        >
          Increment
        </button>
        <span>{count}</span>
        <button
          aria-label="Decrement value"
          onClick={() => dispatch(turnOff({ stream: "1" }))}
        >
          Decrement
        </button>
      </div>
    </div>
  )
}
