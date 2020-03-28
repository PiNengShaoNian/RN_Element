import { find as types } from '../action/type'

const initState = {
  hasHistory: false, //没有历史记录
  hasShop: true, //没有搜索到相关店铺
  hisList: [], //搜索历史记录
  shopList: [] //店铺列表
}

export default (state = initState, action) => {
  switch (action.type) {
    case types.FIND_HISTORY:
      return {
        ...state,
        hasHistory: state.hisList.length > 0,
        hisList: state.hisList ? state.hisList : []
      }
    case types.FIND_HISTORY_ADD:
      return {
        ...state,
        hisList: state.hisList.concat(action.keyword)
      }
    case types.FIND_SHOP:
      return {
        ...state,
        hasShop: action.hasShop,
        shopList: action.shopList ? action.shopList : []
      }
    case types.FIND_CLEAR:
      return {
        ...state,
        hisList: []
      }
    case types.FIND_DELETE_ITEM:
      const index = state.hisList.findIndex(it => it.item === action.item)
      if (index !== -1) {
        state.hisList.splice(index, 1)
      }
      return {
        ...state,
        hisList: state.hisList.slice()
      }
    default:
      return state
  }
}
