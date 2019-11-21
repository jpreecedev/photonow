import { combineReducers } from "redux"
import { reducer as formReducer } from "redux-form"
import { configureStore } from "@reduxjs/toolkit"

import { AppState } from "../global"
import { basketSlice } from "./basket"

const loadState = () => {
  try {
    const serializedState = localStorage.getItem("state")
    if (serializedState === null) {
      return {}
    }
    return JSON.parse(serializedState)
  } catch (err) {
    return {}
  }
}
const saveState = (state: AppState) => {
  try {
    const serializedState = JSON.stringify(state)
    localStorage.setItem("state", serializedState)
  } catch {
    // ignore write errors
  }
}

let store

const initialise = (state: AppState = loadState()) => {
  store = configureStore({
    reducer: combineReducers({
      pictures: basketSlice.reducer,
      form: formReducer
    }),
    preloadedState: state
  })

  store.subscribe(() => {
    saveState(<AppState>{
      pictures: store.getState().pictures
    })
  })

  return store
}

export { initialise, store }
