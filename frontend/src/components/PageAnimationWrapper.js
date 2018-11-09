import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { withRouter } from 'react-router-dom'

function PageAnimationWrapper ({
  children,
  color,
  background,
  location: { state }
}) {
  const cx = classNames({
    page: true,
    'page--prev': state && state.prev
  })
  return (
    <section
      className={cx}
      style={{
        color,
        background
      }}
    >
      {children}
    </section>
  )
}

PageAnimationWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  color: PropTypes.string,
  background: PropTypes.string
}

PageAnimationWrapper.defaultProps = {
  color: '',
  background: ''
}

export default withRouter(PageAnimationWrapper)
