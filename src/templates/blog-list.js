/** @jsx jsx */
import { jsx } from "theme-ui"
import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import PostCard from "../components/post-card"
import Seo from "../components/seo"

export const blogListQuery = graphql`query blogListQuery($skip: Int!, $limit: Int!) {
  allMarkdownRemark(
    sort: {frontmatter: {date: DESC}}
    filter: {frontmatter: {template: {eq: "blog-post"}}}
    limit: $limit
    skip: $skip
  ) {
    edges {
      node {
        id
        excerpt(pruneLength: 250)
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          slug
          title
          featuredImage {
            childImageSharp {
              gatsbyImageData(layout: CONSTRAINED, width: 345, height: 260)
            }
          }
        }
      }
    }
  }
}`
class BlogIndex extends React.Component {
  render() {
    const { data } = this.props
    const { currentPage, numPages } = this.props.pageContext

    const posts = data.allMarkdownRemark.edges
      .filter(edge => !!edge.node.frontmatter.date)
      .map(edge => <PostCard key={edge.node.id} data={edge.node} />)

    return (
      <Layout className="blog-page">
        <Seo
          title={"Our Services - Cobalt Web Technologies"}
          description={
            "Cobalt Services " + currentPage + " of " + numPages
          }
        />
        <h1>Our Services</h1>
        <div className="grids col-1 sm-2 lg-3">{posts}</div>
      </Layout>
    )
  }
}

export default BlogIndex
