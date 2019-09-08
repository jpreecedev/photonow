import { createStore, combineReducers, applyMiddleware } from "redux"
import thunk from "redux-thunk"
import { reducer as formReducer } from "redux-form"
import { composeWithDevTools } from "redux-devtools-extension"

import * as actions from "./actions"
import { basketReducer, picturesReducer } from "./reducers"
import { AppState } from "./types"

const rootReducer = combineReducers({
  basket: basketReducer,
  pictures: picturesReducer,
  form: formReducer
})

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

const initialiseStore = (initialState: AppState = loadState()) => {
  const store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(thunk))
  )

  store.subscribe(() => {
    saveState(<AppState>{
      basket: store.getState().basket,
      pictures: store.getState().pictures
    })
  })

  return store
}

export { initialiseStore, actions }
