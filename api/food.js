import request from '../utils/request'

export const fetchFoodCategory = (latitude, longitude) => {
  return request.get('/shopping/v2/restaurant/category', {
    latitude,
    longitude
  })
}

export const fetchFoodDelivery = (latitude, longitude) => {
  return request.get('/shopping/v1/restaurants/delivery_modes', {
    latitude,
    longitude,
    kw: ''
  })
}

export const fetchFoodActivity = (latitude, longitude) => {
  return request.get('/shopping/v1/restaurants/activity_attributes', {
    latitude,
    longitude,
    kw: ''
  })
}
