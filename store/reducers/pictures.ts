import * as Actions from "../actions"
import { PicturesActionTypes, PictureItem } from "../../global"

const DEFAULT_STATE = []

const picturesReducer = (state: PictureItem[], action: PicturesActionTypes) => {
  if (typeof state === "undefined") {
    return DEFAULT_STATE
  }

  switch (action.type) {
    case Actions.pictures.ADD_PICTURE:
      return [...state, action.payload]
    case Actions.pictures.ADD_TO_BASKET:
      return state.map(item => {
        if (item.momentId === action.payload.momentId) {
          return {
            ...item,
            addedToBasket: true
          }
        }
        return item
      })
    case Actions.pictures.REMOVE_FROM_BASKET:
      return state.map(item => {
        if (item.momentId === action.payload.momentId) {
          return {
            ...item,
            addedToBasket: false
          }
        }
        return item
      })
    default:
      return state
  }
}

export { picturesReducer }
