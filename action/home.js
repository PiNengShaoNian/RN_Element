import { home as types } from './type'
import { fetchCityGuess, fetchFoodTypes, fetchShopList } from '../api/location'

const getList = async (dispatch, res) => {
  const categoryList = await fetchFoodTypes(res.geohash)
  const shopList = await fetchShopList(res.latitude, res.longitude, 0)
  dispatch(mergeData(res, categoryList, shopList))
}

const mergeData = (cityInfo, cList, shopList) => {
  const categoryList = computeCategory(cList)

  return {
    type: types.HOME_REFRESH_SUCCESS,
    latitude: cityInfo.latitude,
    longitude: cityInfo.longitude,
    geohash: cityInfo.latitude + ',' + cityInfo.longitude,
    name: cityInfo.name,
    categoryList,
    shopList
  }
}

const computeCategory = list => {
  let temp = []
  const itemCount = 8 //一页8个分类
  const pageCount = list.length / itemCount
  const last = list.length % 8 //余下的个数，不满一页8个的，如果=0则刚刚被整除
  for (let i = 0; i < pageCount; i++) {
    temp.push(list.slice(i * itemCount, (i + 1) * itemCount))
  }
  if (last > 0) {
    temp.push(list.slice(itemCount * pageCount, list.length))
  }
  return temp
}

export const getHomeData = () => {
  return dispatch => {
    dispatch({ type: types.HOME_REFRESH_ING })
    fetchCityGuess().then(res => {
      getList(dispatch, res)
    })
  }
}

export const loadMoreShopList = (latitude, longitude) => {
  return dispatch => {
    dispatch({ type: types.HOME_LOAD_MORE_ING })
    fetchShopList(latitude, longitude, 10)
      .then(res => {
        dispatch({
          type: types.HOME_LOAD_MORE_SUCCESS,
          shopList: res
        })
      })
      .catch(() => {
        dispatch({ type: types.HOME_LOAD_MORE_FAIL })
      })
  }
}
