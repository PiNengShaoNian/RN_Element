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
