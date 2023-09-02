/** @jsx jsx */
import { jsx } from "theme-ui"
import { RiCodeBoxFill } from "react-icons/ri"
import { GiTexas } from "react-icons/gi"
import { LiaFlagUsaSolid } from "react-icons/lia"


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
      <p className="footer-text">Based, built, coded, and shipped from Austin, TX USA</p>
      <p className="footer-react-icons">{" "}<span className="icon -LiaFlagUsaSolid">
          <LiaFlagUsaSolid /></span>{" "}
          {" "}<span className="icon -GiTexas">
          <GiTexas /></span>{" "}
      </p>
    </div>
  </footer>
)

export default Footer
