import { member as types } from '../action/type'

const initState = {
  list: []
}

export default (state = initState, action) => {
  switch (action.type) {
    case types.LIST:
      return {
        list: action.list
      }
    case types.LIST_DELETE:
      const index = state.list.findIndex(it => it.id === action.id)
      if (index !== -1) {
        state.list.splice(index, 1)
      }
      return {
        list: state.list.slice()
      }
    default:
      return state
  }
}
