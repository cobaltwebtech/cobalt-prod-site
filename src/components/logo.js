import React from "react"
import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

<<<<<<< Updated upstream
=======

>>>>>>> Stashed changes
const Logo = props => (
  <div className="site-logo">
    <Link to="/"><StaticImage
      className="logo-img"
      src="https://res.cloudinary.com/df1a5u7x7/image/upload/v1662670057/cobalt/cwt-logo-primary.png"
      alt="Cobalt Web Technologies logo"
      placeholder="blurred"
      layout="fixed"
      height={100}
    />
    <span>{props.title}</span></Link>
  </div>
)

export default Logo
