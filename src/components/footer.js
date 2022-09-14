/** @jsx jsx */
import { jsx } from "theme-ui"
import { Link } from "gatsby"
import { RiCodeBoxFill } from "react-icons/ri"

const Footer = () => (
  <footer
    className="site-footer"
    sx={{
      bg: "siteColor",
    }}
  >
    <div className="container">
      <p>{" "}<span className="icon -ricodebox">
          <RiCodeBoxFill />
        </span>{" "}
        Cobalt Web Technologies 
      </p>
    </div>
  </footer>
)

export default Footer
