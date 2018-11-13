import React from 'react'
import styled from 'styled-components'

import HeadingBlock from '../components/HeadingBlock'

const Wrapper = styled.div`
  margin: 0;
  padding: 0;
`

const renderPageBody = body => {
  const result = []
  body.map(item => {
    if (item.type === 'heading_block') {
      result.append(<HeadingBlock key={item.id} value={item.value} />)
    } else {
      result.append(
        <div
          key={item.id}
          // eslint-disable-next-line
          dangerouslySetInnerHTML={{ __html: item.value }}
        />
      )
    }
  })

  return result
}

export default renderPageBody
