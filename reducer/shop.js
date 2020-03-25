import { shop as types } from '../action/type'

const initState = {
  totalPrice: 0,
  totalCount: 0,
  list: [] //购物车列表
}

function toDecimal2(x) {
  let ff = parseFloat(x)
  if (isNaN(ff)) {
    return false
  }
  let f = Math.round(x * 100) / 100
  let s = f.toString()
  let rs = s.indexOf('.')
  if (rs < 0) {
    rs = s.length
    s += '.'
  }
  while (s.length <= rs + 2) {
    s += '0'
  }
  return s
}

export default (state = initState, action) => {
  switch (action.type) {
    case types.CART_LIST_ADD:
      let existFoot = state.list.find(food => food.id === action.item.id)
      if (existFoot === undefined) {
        action.item.buyNum = 1
        state.list.push(action.item)
      } else {
        state.list.forEach(item => item.id === action.item.id && ++item.buyNum)
      }
      /*计算总价格和总数量*/
      let totalPrice = 0
      let totalCount = 0
      for (let food of state.list) {
        totalPrice += food.buyNum * food.money
        totalCount += food.buyNum
      }

      return {
        totalPrice: toDecimal2(totalPrice),
        totalCount: totalCount,
        list: state.list
      }

    case types.CART_LIST_SUB:
      state.list.forEach(
        item => item.id === action.item.id && item.buyNum > 0 && --item.buyNum
      )

      /*计算总价格和总数量*/
      let total_price = 0
      let total_count = 0
      for (let food of state.list) {
        total_price += food.buyNum * food.money
        total_count += food.buyNum
      }
      return {
        totalPrice: toDecimal2(total_price),
        totalCount: total_count,
        list: state.list
      }
    default:
      return state
  }
}
