import { createStore, combineReducers, applyMiddleware } from "redux"
import thunk from "redux-thunk"
import { reducer as formReducer } from "redux-form"
import { composeWithDevTools } from "redux-devtools-extension"

import * as actions from "./actions"
import { basketReducer } from "./reducers"

const reducers = combineReducers({
  basket: basketReducer,
  form: formReducer
})

const initialiseStore = (initialState: any = {}) => {
  return createStore(reducers, initialState, composeWithDevTools(applyMiddleware(thunk)))
}

export { initialiseStore, actions }
