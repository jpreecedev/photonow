import * as Actions from '../actions'

const DEFAULT_STATE = []

function basketReducer(state, action) {
  if (typeof state === 'undefined') {
    return DEFAULT_STATE
  }

  switch (action.type) {
    case Actions.basket.ADD_TO_BASKET:
      return [...state, action.payload]
    case Actions.basket.REMOVE_FROM_BASKET:
      return state.filter(item => item.moment.momentId !== action.payload.moment.momentId)
    default:
      return state
  }
}

export { basketReducer }
