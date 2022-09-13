/** @jsx jsx */
import { jsx } from "theme-ui"
import { Link } from "gatsby"
<<<<<<< Updated upstream
import { RiHeart2Line } from "react-icons/ri"
=======
import { RiCodeBoxFill } from "react-icons/ri"
>>>>>>> Stashed changes

const Footer = () => (
  <footer
    className="site-footer"
    sx={{
      bg: "siteColor",
    }}
  >
    <div className="container">
<<<<<<< Updated upstream
      <p>
        A GatsbyJS Starter for Netlify CMS, Made with{" "}
        <span className="icon -love">
          <RiHeart2Line />
        </span>{" "}
        by <Link to="/">Stackrole.com</Link>
=======
      <p>{" "}<span className="icon -ricodebox">
          <RiCodeBoxFill />
        </span>{" "}
        Cobalt Web Technologies 
>>>>>>> Stashed changes
      </p>
    </div>
  </footer>
)

export default Footer
