import React from 'react'
// import styled from 'styled-components'

import HeadingBlock from '../components/HeadingBlock'

const renderPageBody = body => {
  const result = body.map(item => {
    if (item.type === 'heading_block') {
      return <HeadingBlock key={item.id} value={item.value} />
    }
    return (
      <div
        css={{ overflow: 'scroll' }}
        key={item.id}
        // eslint-disable-next-line
        dangerouslySetInnerHTML={{ __html: item.value }}
      />
    )
  })
  console.log('body result', result)
  return result
}

export default renderPageBody
