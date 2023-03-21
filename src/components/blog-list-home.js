/** @jsx jsx */
import { jsx } from "theme-ui"
import { Link } from "gatsby"
import { MdContactMail } from "react-icons/md"

import PostCard from "./post-card"

export default function BlogListHome(props) {
  const data = props.data
  const posts = data.edges
    .filter(edge => !!edge.node.frontmatter.date)
    .map(edge => <PostCard key={edge.node.id} data={edge.node} />)
  return <PostMaker data={posts} />
}

const PostMaker = ({ data }) => (
  <section id="services" className="home-posts">
    <h2>
      Our Services
    </h2>
    <div className="grids col-1 sm-2 lg-3">{data}</div>
    <Link
      className="button"
      to="/contact"
      sx={{
        variant: "variants.button",
      }}
    >
      <strong>Contact Us for More Info
        <span className="icon -right">
          <MdContactMail size={30} />
        </span>
      </strong>
    </Link>
  </section>
)
