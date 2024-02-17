import { useReducer } from "react"
import "./App.css"
import Buttons from "./components/Buttons"
import Operations from "./components/Operations"

const formatter = new Intl.NumberFormat(undefined, {
  maximumFractionDigits: 0,
})

const format = (number) => {
  if (number == null) return
  const [integer, decimal] = number.split(".")
  if (decimal == null) return formatter.format(integer)
  return `${formatter.format(integer)}.${decimal}`
}

export const ACTIONS = {
  ADD_DIGIT: "add-digit",
  ADD_OPERATION: "add-operation",
  EVALUATE: "evaluate",
  CLEAR: "clear",
  DELETE_DIGIT: "delete-digit",
}

const reducer = (state, { type, payload }) => {
  if (type === ACTIONS.ADD_DIGIT) {
    if (state.overwrite) {
      return {
        ...state,
        currentOperand: payload.digit,
        overwrite: false,
      }
    }
    if(!state.currentOperand && payload.digit === ".") {
      return {
        ...state,
        currentOperand: `0.`
      }
    }
    if (payload.digit === "0" && state.currentOperand === "0") return state
    if (payload.digit === "." && state.currentOperand.includes(".")) {
      return state
    }
    return {
      ...state,
      currentOperand: `${state.currentOperand ?? ""}${payload.digit}`,
    }
  }
  if (type === ACTIONS.CLEAR) {
    return { state }
  }
  if (type === ACTIONS.ADD_OPERATION) {
    if (state.currentOperand == null && state.previousOperand == null) {
      return state
    }
    if (state.operation && state.currentOperand == null) {
      return {
        ...state,
        operation: payload.operation,
      }
    }
    if (state.previousOperand && state.currentOperand) {
      return {
        ...state,
        previousOperand: evaluate(state),
        operation: payload.operation,
        currentOperand: null,
      }
    }
    return {
      ...state,
      previousOperand: state.currentOperand,
      operation: payload.operation,
      currentOperand: null,
    }
  }
  if (type === ACTIONS.DELETE_DIGIT) {
    if (state.overwrite) {
      return {
        ...state,
        currentOperand: null,
        overwrite: false,
      }
    }
    if (!state.currentOperand) {
      return state
    }
    if (state.currentOperand.length === 1) {
      return {
        ...state,
        currentOperand: null,
      }
    }
    return {
      ...state,
      currentOperand: state.currentOperand.slice(0, -1),
    }
  }
  if (type === ACTIONS.EVALUATE) {
    if (!state.currentOperand && !state.previousOperand) {
      return state
    }
    if (state.currentOperand && state.previousOperand) {
      return {
        ...state,
        currentOperand: evaluate(state),
        previousOperand: null,
        operation: null,
        overwrite: true,
      }
    }
  }
}

const evaluate = ({ currentOperand, previousOperand, operation }) => {
  const prev = parseFloat(previousOperand)
  const curr = parseFloat(currentOperand)

  let computation = ""
  if (isNaN(prev) || isNaN(curr)) {
    return ""
  }
  switch (operation) {
    case "/":
      computation = prev / curr
      break
    case "*":
      computation = prev * curr
      break
    case "+":
      computation = prev + curr
      break
    case "-":
      computation = prev - curr
      break
  }
  return computation.toString()
}

function App() {
  const [{ currentOperand, previousOperand, operation }, dispatch] = useReducer(
    reducer,
    {}
  )
  return (
    <div>
      <div className="output">
        <div className="previous-operand">
          {format(previousOperand)} {operation}
        </div>
        <div className="current-operand">{format(currentOperand)}</div>
      </div>
      <div className="btns-grid">
        <button
          className="span-two"
          onClick={() => {
            dispatch({ type: ACTIONS.CLEAR })
          }}
        >
          AC
        </button>
        <button
          onClick={() => {
            dispatch({ type: ACTIONS.DELETE_DIGIT })
          }}
        >
          DEL
        </button>
        <Operations dispatch={dispatch} operation="/" />
        <Buttons dispatch={dispatch} digit="1" />
        <Buttons dispatch={dispatch} digit="2" />
        <Buttons dispatch={dispatch} digit="3" />
        <Operations dispatch={dispatch} operation="*" />
        <Buttons dispatch={dispatch} digit="4" />
        <Buttons dispatch={dispatch} digit="5" />
        <Buttons dispatch={dispatch} digit="6" />
        <Operations dispatch={dispatch} operation="+" />
        <Buttons dispatch={dispatch} digit="7" />
        <Buttons dispatch={dispatch} digit="8" />
        <Buttons dispatch={dispatch} digit="9" />
        <Operations dispatch={dispatch} operation="-" />
        <Buttons dispatch={dispatch} digit="." />
        <Buttons dispatch={dispatch} digit="0" />
        <button
          className="span-two"
          onClick={() => {
            dispatch({ type: ACTIONS.EVALUATE })
          }}
        >
          =
        </button>
      </div>
    </div>
  )
}

export default App
