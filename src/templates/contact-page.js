/** @jsx jsx */
import { jsx } from "theme-ui"
<<<<<<< Updated upstream
import { graphql } from "gatsby"
import { RiSendPlane2Line } from "react-icons/ri"
=======
import { graphql, Link } from "gatsby"
import { RiSendPlane2Line } from "react-icons/ri"
import { BiPhoneCall } from "react-icons/bi"
>>>>>>> Stashed changes

import Layout from "../components/layout"
import Seo from "../components/seo"

export const pageQuery = graphql`
  query ContactQuery($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      excerpt(pruneLength: 140)
      frontmatter {
        title
      }
    }
    site {
      siteMetadata {
        title
      }
    }
  }
`

const Contact = ({ data }) => {
  const { markdownRemark, site } = data // data.markdownRemark holds your post data
  const { frontmatter, html } = markdownRemark

  return (
    <Layout className="contact-page" sx={contactStyles.contactPage}>
      <Seo
        title={frontmatter.title}
        description={frontmatter.title + " " + site.siteMetadata.title}
      />
      <div className="wrapper">
        <h1>{frontmatter.title}</h1>
        <div
          className="description"
          dangerouslySetInnerHTML={{ __html: html }}
        />
<<<<<<< Updated upstream
=======
        <Link
          className="button"
          to="tel:5122941600"
          sx={{
            variant: "variants.button",
          }}
        >
          Call 512-294-1600
          <span className="icon -right">
            <BiPhoneCall />
          </span>
        </Link>
>>>>>>> Stashed changes
        <form
          className="contact-form"
          action="/thanks"
          name="contact"
          method="POST"
          data-netlify="true"
          data-netlify-honeypot="bot-field"
        >
          <input type="hidden" name="form-name" value="contact" />
          <p>
            <label>
              Name
              <input type="text" name="name" required />
            </label>
          </p>
          <p>
            <label>
              Email
              <input type="email" name="email" required />
            </label>
          </p>
          <p>
            <label>
<<<<<<< Updated upstream
              Subject
              <input type="text" name="subject" required />
=======
              Phone Number
              <input type="text" name="phone" required />
>>>>>>> Stashed changes
            </label>
          </p>
          <p>
            <label>
              Message<textarea name="message" required></textarea>
            </label>
          </p>
          <p className="text-align-right">
            <button
              className="button"
              sx={{
                variant: "variants.button",
              }}
              type="submit"
            >
<<<<<<< Updated upstream
              Send Message{" "}
=======
              Send Contact Request{" "}
>>>>>>> Stashed changes
              <span className="icon -right">
                <RiSendPlane2Line />
              </span>
            </button>
          </p>
        </form>
      </div>
    </Layout>
  )
}

export default Contact

const contactStyles = {
  contactPage: {
    input: {
      border: "6px solid",
      borderColor: "inputBorder",
      bg: "inputBackground",
      outline: "none",
    },
    textarea: {
      border: "6px solid",
      borderColor: "inputBorder",
      bg: "inputBackground",
      outline: "none",
    },
  },
}
