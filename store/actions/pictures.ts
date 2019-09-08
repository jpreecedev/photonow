import { AddPictureAction } from "../types"

export const ADD_PICTURE = "ADD_PICTURE"

export const addPicture = (picture: AddPictureAction) => dispatch => {
  dispatch({
    type: ADD_PICTURE,
    payload: {
      picture
    }
  })
}
