import React, { memo, forwardRef, useImperativeHandle, useRef } from 'react'
import PropTypes from 'prop-types'
import Overlay from 'teaset/components/Overlay/Overlay'

const Modal = memo(
  forwardRef(({ type, modal, children }, ref) => {
    const overlay = useRef()
    useImperativeHandle(ref, () => ({
      show() {
        Overlay.show(
          <Overlay.PopView
            style={{ alignItems: 'center', justifyContent: 'center' }}
            type={type}
            modal={modal}
            ref={overlay}
          >
            {children || null}
          </Overlay.PopView>
        )
      },
      hide() {
        overlay.current.close()
      }
    }))
    return null
  })
)

Modal.propTypes = {
  type: PropTypes.oneOf(['zoomOut', 'zoomIn', 'custom']),
  modal: PropTypes.bool
}

Modal.defaultProps = {
  type: 'zoomIn',
  modal: false
}

export default Modal
