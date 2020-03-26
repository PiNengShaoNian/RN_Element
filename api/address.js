import request from '../utils/request'

export const fetchGetAddressList = user_id => {
  return request.get(`/v1/users/${user_id}/addresses`)
}

export const fetchDeleteAddress = (user_id, addressid) => {
  return request.delete(`/v1/users/${user_id}/addresses/${addressid}`)
}

export const fetchSearchNearby = keyword => {
  return request.get('/v1/pois', {
    type: 'nearby',
    keyword
  })
}

export const fetchAddAddress = (
  userId,
  address,
  address_detail,
  geohash,
  name,
  phone,
  phone_bk,
  poi_type = 0,
  sex = 1,
  tag = '公司',
  tag_type = 4
) => {
  const params = {
    address,
    address_detail,
    geohash,
    name,
    phone,
    phone_bk,
    poi_type,
    sex,
    tag,
    tag_type
  }

  return request.post(`/v1/users/${userId}/addresses`, params)
}
