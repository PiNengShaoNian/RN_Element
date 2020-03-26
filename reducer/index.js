import { combineReducers } from 'redux'

import home from './home'
import shop from './shop'
import member from './member'

export default combineReducers({
  home,
  shop,
  member
})
