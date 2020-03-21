import { home as types } from '../action/type'
import { RefreshState } from '../components/RefreshListView'

const initState = {
  refreshState: RefreshState.Idle,
  noMoreData: false,
  latitude: 0,
  longitude: 0,
  geohash: null,
  name: '',
  categoryList: [],
  shopList: []
}

export default (state = initState, action) => {
  if (state.shopList.length >= 60) {
    return {
      ...state,
      refreshState: RefreshState.NoMoreData,
      noMoreData: true
    }
  }

  switch (action.type) {
    case types.HOME_REFRESH_ING:
      return {
        ...state,
        refreshState: RefreshState.HeaderRefreshing
      }
    case types.HOME_REFRESH_SUCCESS:
      return {
        ...state,
        refreshState: RefreshState.Idle,
        noMoreData: false,
        latitude: action.latitude,
        longitude: action.longitude,
        geohash: action.geohash,
        name: action.name,
        categoryList: action.categoryList,
        shopList: action.shopList
      }
    case types.HOME_REFRESH_FAIL:
      return {
        ...state,
        refreshState: refreshState.Idle
      }
    case types.HOME_LOAD_MORE_ING:
      return {
        ...state,
        refreshState: RefreshState.FooterRefreshing
      }
    case types.HOME_LOAD_MORE_SUCCESS:
      return {
        ...state,
        refreshState: RefreshState.Idle,
        shopList: state.shopList.concat(action.shopList)
      }
    case types.HOME_LOAD_MORE_FAIL:
      return {
        ...state,
        refreshState: RefreshState.Idle
      }
    default:
      return state
  }
}
