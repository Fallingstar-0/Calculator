import { configureStore } from "@reduxjs/toolkit"
import outputReducer from "./features/outputSlice"

export const store = configureStore({
  reducer: {
    output: outputReducer,
  },
})
