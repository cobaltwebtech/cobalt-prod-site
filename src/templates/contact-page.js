/** @jsx jsx */
import { jsx } from "theme-ui"
import { graphql, Link } from "gatsby"
import { RiSendPlane2Line } from "react-icons/ri"
import { BiPhoneCall, BiChat } from "react-icons/bi"

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
        <Link
        className="button"
        target={"_blank"}
        to="https://salesiq.zoho.com/signaturesupport.ls?widgetcode=b02c0667d93a35346839e5ab730f507af85d02062470316501c1c4d80b9136f1eae322a2a89cfbc9b10746de3549cb8f"
        sx={{
            variant: "variants.button",
         }}
        >
          <strong>Live Chat
            <span className="icon -right">
              <BiChat size="30" />
            </span>
           </strong>
        </Link>
        <Link
          className="button"
          to="tel:+15122941600"
          sx={{
            variant: "variants.button",
          }}
        >
          <strong>Call 512-294-1600
            <span className="icon -right">
              <BiPhoneCall size="30" />
            </span>
          </strong>
        </Link>
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
              Phone Number
              <input type="text" name="phone" required />
            </label>
          </p>
          <p>
            <label>
              How can we help you?<textarea name="message" required></textarea>
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
              Send Contact Request{" "}
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
