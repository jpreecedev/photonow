import { createSlice } from "@reduxjs/toolkit"

const initialState = []

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    addPicture(state, action) {
      const exists = state.some(item => item.momentId === action.payload.momentId)
      if (exists) {
        return state
      }

      return [...state, action.payload]
    },
    add(state, action) {
      return state.map(item => {
        if (item.momentId === action.payload.momentId) {
          return {
            ...item,
            addedToBasket: true
          }
        }
        return item
      })
    },
    remove(state, action) {
      return state.map(item => {
        if (item.momentId === action.payload.momentId) {
          return {
            ...item,
            addedToBasket: false
          }
        }
        return item
      })
    },
    clear() {
      return initialState
    }
  }
})

export const { addPicture, add, remove, clear } = basketSlice.actions
