import * as Actions from "../actions"
import { PicturesActionTypes, PictureItem } from "../types"

const DEFAULT_STATE = []

const picturesReducer = (state: PictureItem[], action: PicturesActionTypes) => {
  if (typeof state === "undefined") {
    return DEFAULT_STATE
  }

  switch (action.type) {
    case Actions.pictures.ADD_PICTURE:
      return [...state, action.payload]
    default:
      return state
  }
}

export { picturesReducer }
