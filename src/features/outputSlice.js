import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  value: 0,
}

const outputSlice = createSlice({
  name: "output",
  initialState,
  reducers: {
    clear: (state) => {
      return state
    },
    addBtn: (state) => {
      const newState = state.value + 1
      return { ...state, newState }
    },
    add: () => {},
    subtract: () => {},
    multiply: () => {},
    divide: () => {},
    evaluate: () => {},
  },
})

export const { clear, addBtn, add, subtract, multiply, divide, evaluate } =
  outputSlice.actions

export default outputSlice.reducer
