import { combineReducers } from 'redux'

import home from './home'
import shop from './shop'
import member from './member'
import find from './find'

export default combineReducers({
  home,
  shop,
  member,
  find
})
