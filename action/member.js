import { member as types } from './type'
import { fetchGetAddressList, fetchDeleteAddress } from '../api/address'
import Toast from '../components/Toast'

export const getAddressList = user_id => {
  return dispatch => {
    fetchGetAddressList(user_id).then(res => {
      dispatch({
        type: types.LIST,
        list: res
      })
    })
  }
}

export const deleteItem = (user_id, id) => {
  return dispatch => {
    fetchDeleteAddress(user_id, id).then(res => {
      dispatch({
        type: types.LIST_DELETE,
        id
      })

      Toast.show(res.success)
    })
  }
}
