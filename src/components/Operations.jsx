import React from "react"
import { ACTIONS } from "../App"

const Operations = ({ dispatch, operation }) => {
  return (
    <button
      onClick={() =>
        dispatch({ type: ACTIONS.ADD_OPERATION, payload: { operation } })
      }
    >
      {operation}
    </button>
  )
}

export default Operations
