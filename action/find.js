import { find as types } from './type'
import { fethcSearchRestaurant } from '../api/shop'

const noResult = {
  type: types.FIND_SHOP,
  hasShop: false,
  shopList: null
}

export const searchShop = (geohash, keyword) => {
  return dispatch => {
    fethcSearchRestaurant(geohash, keyword)
      .then(res => {
        if (res.length === 0) {
          dispatch(noResult())
        } else {
          dispatch({
            type: types.FIND_SHOP,
            hasShop: true,
            shopList: res
          })
        }
      })
      .catch(() => {
        dispatch(noResult())
      })
      .finally(() => {
        dispatch({ type: types.FIND_HISTORY_ADD, hasShop: false, keyword })
      })
  }
}

export const deleteHis = item => {
  return {
    type: types.FIND_DELETE_ITEM,
    item
  }
}

export const showHistory = () => {
  return {
    type: types.FIND_HISTORY
  }
}

export const clearHis = () => {
  return { type: types.FIND_CLEAR }
}
