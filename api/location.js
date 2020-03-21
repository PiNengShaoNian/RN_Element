import request from '../utils/request'

export const fetchCityGuess = () => {
  return request.get('/v1/cities/', { type: 'guess' })
}

export const fetchFoodTypes = geohash => {
  return request.get('/v2/index_entry')
}

export const fetchShopList = (
  latitude,
  longitude,
  offset,
  restaurant_category_id = '',
  restaurant_category_ids = '',
  order_by = '',
  delivery_mode = '',
  support_ids = []
) => {
  let supportStr = ''
  support_ids.forEach(item => {
    if (item.status) {
      supportStr += '&support_ids[]=' + item.id
    }
  })
  let params = {
    latitude,
    longitude,
    offset,
    limit: '20',
    'extras[]': 'activities',
    keyword: '',
    restaurant_category_id,
    'restaurant_category_ids[]': restaurant_category_ids,
    order_by,
    'delivery_mode[]': delivery_mode + supportStr
  }
  
  return request.get('/shopping/restaurants', params)
}
