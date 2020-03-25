import { shop as types } from './type'

export const addItem = item => {
  return dispatch => {
    dispatch({
      type: types.CART_LIST_ADD,
      item
    })
  }
}

export const subItem = item => {
  return dispatch => {
    dispatch({ type: types.CART_LIST_SUB, item })
  }
}
