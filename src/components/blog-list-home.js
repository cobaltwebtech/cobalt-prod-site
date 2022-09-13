/** @jsx jsx */
import { jsx } from "theme-ui"
import { Link } from "gatsby"
<<<<<<< Updated upstream
import { RiArrowDownLine, RiArrowRightSLine } from "react-icons/ri"
=======
import { RiContactsFill } from "react-icons/ri"
>>>>>>> Stashed changes

import PostCard from "./post-card"

export default function BlogListHome(props) {
  const data = props.data
  const posts = data.edges
    .filter(edge => !!edge.node.frontmatter.date)
    .map(edge => <PostCard key={edge.node.id} data={edge.node} />)
  return <PostMaker data={posts} />
}

const PostMaker = ({ data }) => (
<<<<<<< Updated upstream
  <section className="home-posts">
    <h2>
      Latest in <strong>Blog</strong>{" "}
      <span className="icon -right">
        <RiArrowDownLine />
      </span>
=======
  <section id="services" className="home-posts">
    <h2>
      Our Services
>>>>>>> Stashed changes
    </h2>
    <div className="grids col-1 sm-2 lg-3">{data}</div>
    <Link
      className="button"
<<<<<<< Updated upstream
      to="/blog"
=======
      to="/contact"
>>>>>>> Stashed changes
      sx={{
        variant: "variants.button",
      }}
    >
<<<<<<< Updated upstream
      See more
      <span className="icon -right">
        <RiArrowRightSLine />
=======
      Contact Us for More Info
      <span className="icon -right">
        <RiContactsFill />
>>>>>>> Stashed changes
      </span>
    </Link>
  </section>
)
