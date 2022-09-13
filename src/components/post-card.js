/** @jsx jsx */
import { jsx } from "theme-ui"
import { Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"

const PostCard = ({ data }) => (
  <article
    className="post-card"
    sx={{
      bg: "cardBg",
    }}
  >
    {data.frontmatter.featuredImage ? (
      <Link to={data.frontmatter.slug}>
        <GatsbyImage
          image={data.frontmatter.featuredImage.childImageSharp.gatsbyImageData}
          alt={data.frontmatter.title + " - Featured image"}
          className="featured-image"
        />
      </Link>
    ) : (
      ""
    )}
    <div className="post-content">
<<<<<<< Updated upstream
      <h2 className="title">
=======
      <h3 className="title">
>>>>>>> Stashed changes
        <Link
          to={data.frontmatter.slug}
          sx={{
            variant: "links.postLink",
          }}
        >
          {data.frontmatter.title}
        </Link>
<<<<<<< Updated upstream
      </h2>
      <p
        className="meta"
        sx={{
          color: "muted",
        }}
      >
        <time>{data.frontmatter.date}</time>
      </p>
=======
      </h3>
>>>>>>> Stashed changes
    </div>
  </article>
)

export default PostCard
