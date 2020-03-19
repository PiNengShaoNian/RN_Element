import React from 'react'

export default Visible = ({ visible, children }) => {
  return visible ? children : null
}
