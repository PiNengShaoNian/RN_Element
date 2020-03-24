import React from 'react'

export default function Visible({ visible, children }) {
  return visible ? children : null
}
