import { Reducer, AnyAction } from "redux"
import { FormStateMap } from "redux-form"

export interface PictureItem {
  momentId: string
  label: string
  url: string
  price: number
  addedToBasket: boolean
}

export interface AddPictureAction {
  type: string
  payload: PictureItem
}

export interface RemovePictureAction {
  type: string
  payload: PictureItem
}

export interface AddPictureAction {
  type: string
  payload: PictureItem
}

export type PicturesActionTypes = AddPictureAction | RemovePictureAction

export type AppState = ReturnType<
  Reducer<
    {
      pictures: PictureItem[]
      form: FormStateMap
    },
    AnyAction
  >
>
