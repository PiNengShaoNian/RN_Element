import request from '../utils/request'

export const fetchShopDetails = (shopid, latitude, longitude) => {
  const params = {
    latitude,
    longitude:
      longitude +
      '&extras[]=activities&extras[]=album&extras[]=license&extras[]=identification&extras[]=statistics'
  }

  return request.get(`/shopping/restaurant/${shopid}`, params)
}

export const fetchShopSources = shopId => {
  return request.get(`/ugc/v2/restaurants/${shopId}/ratings/scores`)
}

export const fetchShopRatingTags = shopId => {
  return request.get(`/ugc/v2/restaurants/${shopId}/ratings/tags`)
}

export const fetchShopRatingList = shopId => {
  let params = {
    has_content: true,
    offset: 0,
    limit: 10,
    tag_name: ''
  }

  return request.get(`/ugc/v2/restaurants/${shopId}/ratings`, params)
}
