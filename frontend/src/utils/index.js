import React from 'react'
// import axios from 'axios'
// import { connect } from 'react-redux'
// import { fetchDocumentDetails } from '../services/actions/page'
import HeadingBlock from '../components/HeadingBlock'

// const getDocument = (id) => {
//   axi
// }

const renderPageBody = body => {
  const result = body.map(item => {
    if (item.type === 'heading_block') {
      return <HeadingBlock key={item.id} value={item.value} />
    }
    if (item.type === 'document_block') {
      return <div>item.value</div>
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

// const mapStateToProps = state => ({
//   pathname: state.router.location.pathname
// })

// const mapDispatchToProps = dispatch => ({
//   getDocument (id) {
//     dispatch(fetchDocumentDetails(id))
//   }
// })

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(renderPageBody)
export default renderPageBody
