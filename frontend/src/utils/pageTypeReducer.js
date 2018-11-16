import React from 'react'

import Loading from '../components/Loading'
import BlogIndexPage from '../containers/BlogIndexPage'
import BlogPage from '../containers/BlogPage'
import StandardPage from '../containers/StandardPage'
import PortfolioIndexPage from '../containers/PortfolioIndexPage'
import ProjectIndexPage from '../containers/ProjectIndexPage'
import ProjectPage from '../containers/ProjectPage'
import PortfolioPage from '../containers/PortfolioPage'

const pageTypeReducer = (id, type) => {
  let page = <Loading />
  if (type === 'blog.BlogIndexPage') {
    page = <BlogIndexPage id={id} type={type} />
  }
  if (type === 'pages.StandardPage') {
    page = <StandardPage id={id} type={type} />
  }
  if (type === 'blog.BlogPage') {
    page = <BlogPage id={id} type={type} />
  }
  if (type === 'portfolio.PortfolioIndexPage') {
    page = <PortfolioIndexPage id={id} type={type} />
  }
  if (type === 'projects.ProjectIndexPage') {
    page = <ProjectIndexPage id={id} type={type} />
  }
  if (type === 'projects.ProjectPage') {
    page = <ProjectPage id={id} type={type} />
  }
  if (type === 'portfolio.PortfolioPage') {
    page = <PortfolioPage id={id} type={type} />
  }
  return page
}

export default pageTypeReducer
