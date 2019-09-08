import * as Actions from "../actions"
import { BasketItem, BasketActionTypes } from "../types"

const DEFAULT_STATE = []

const basketReducer = (state: BasketItem[], action: BasketActionTypes) => {
  if (typeof state === "undefined") {
    return DEFAULT_STATE
  }

  switch (action.type) {
    case Actions.basket.ADD_TO_BASKET:
      return [...state, action.payload]
    case Actions.basket.REMOVE_FROM_BASKET:
      return state.filter(item => item.momentId !== action.payload.momentId)
    default:
      return state
  }
}

export { basketReducer }
