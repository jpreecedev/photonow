export const ADD_TO_BASKET = 'ADD_TO_BASKET'
export const REMOVE_FROM_BASKET = 'REMOVE_FROM_BASKET'

export const addToBasket = moment => dispatch => {
  dispatch({
    type: ADD_TO_BASKET,
    payload: {
      moment
    }
  })
}

export const removeFromBasket = moment => dispatch => {
  dispatch({
    type: REMOVE_FROM_BASKET,
    payload: {
      moment
    }
  })
}
