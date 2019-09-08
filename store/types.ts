import { Reducer, AnyAction } from "redux"
import { FormStateMap } from "redux-form"

export interface BasketItem {
  momentId: string
}

export interface PictureItem {
  _id: string
  url: string
  label: string
}

export interface AddBasketItemAction {
  type: string
  payload: BasketItem
}
export interface RemoveBasketItemAction {
  type: string
  payload: BasketItem
}

export interface AddPictureAction {
  type: string
  payload: PictureItem
}

export type BasketActionTypes = AddBasketItemAction | RemoveBasketItemAction

export interface AddPictureAction {
  type: string
  payload: PictureItem
}

export type PicturesActionTypes = AddPictureAction

export type AppState = ReturnType<
  Reducer<
    {
      basket: BasketItem[]
      pictures: PictureItem[]
      form: FormStateMap
    },
    AnyAction
  >
>
