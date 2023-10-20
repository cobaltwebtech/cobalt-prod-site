/** @jsx jsx */
import { jsx } from "theme-ui"
import { graphql } from "gatsby"
import { RiSendPlane2Line } from "react-icons/ri"
import { BiPhoneCall, BiChat } from "react-icons/bi"

import Layout from "../components/layout"
import Seo from "../components/seo"

export const pageQuery = graphql`
  query EmailMarketingQuery($id: String!) {
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

const EmailMarketing = ({ data }) => {
  const { markdownRemark, site } = data // data.markdownRemark holds your post data
  const { frontmatter, html } = markdownRemark

  return (
    <Layout className="contact-page" sx={emailmarketingStyles.emailmarketingPage}>
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
        <a className="button" target={"_blank"} rel="noreferrer" href="https://salesiq.zoho.com/signaturesupport.ls?widgetcode=b02c0667d93a35346839e5ab730f507af85d02062470316501c1c4d80b9136f1eae322a2a89cfbc9b10746de3549cb8f"
        sx={{
            variant: "variants.button",
         }}
        >
          <strong>Live Chat
            <span className="icon -right">
              <BiChat size="30" />
            </span>
           </strong>
        </a>
        <a className="button" rel="noreferrer" href="tel:+15122941600"
          sx={{
            variant: "variants.button",
          }}
        >
          <strong>Call Us 512-294-1600
            <span className="icon -right">
              <BiPhoneCall size="30" />
            </span>
          </strong>
        </a>
        <form
          className="contact-form"
          action="/thanks/"
          name="email-marketing"
          method="POST"
          data-netlify="true"
          data-netlify-honeypot="bot-field"
        >
          <input type="hidden" name="form-name" value="email-marketing" />
          <p>
            <label>
              First and Last Name
              <input type="text" name="name" required />
            </label>
          </p>
          <p>
            <label>
              Company Name
              <input type="text" name="company" />
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
              Are you currently using an email service now?
              <select name="email-service" required >
                <option value="">Please select an email service from the list</option>
                <option value="n/a">n/a</option>
                <option value="ActiveCampaign">ActiveCampaign</option>
                <option value="AWeber">AWeber</option>
                <option value="Brevo">Brevo</option>
                <option value="Campaign Monitor">Campaign Monitor</option>
                <option value="Campaigner">Campaigner</option>
                <option value="Constant Contact">Constant Contact</option>
                <option value="ConvertKit">ConvertKit</option>
                <option value="Drip">Drip</option>
                <option value="GetResponse">GetResponse</option>
                <option value="HubSpot">HubSpot</option>
                <option value="Klaviyo">Klaviyo</option>
                <option value="Mailchimp">Mailchimp</option>
                <option value="MailerLite">MailerLite</option>
                <option value="Moosend">Moosend</option>
                <option value="Salesforce">Salesforce</option>
                <option value="SendGrid">SendGrid</option>
                <option value="Zoho Campaigns">Zoho Campaigns</option>
              </select>
            </label>
          </p>
          <p>
            <label>
              How many subscribers or contacts do you currently have?
              <select name="subscribers" required >
                <option value="">Please select from list.</option>
                <option value="Less than 500">Less than 500</option>
                <option value="501-1,000">501-1,000</option>
                <option value="1,001-5,000">1,001-5,000</option>
                <option value="5,001-10,000">5,001-10,000</option>
                <option value="10,001-20,000">10,001-20,000</option>
                <option value="20,001-50,000">20,001-50,000</option>
                <option value="50,001-100,000">50,001-100,000</option>
                <option value="More than 100,000">More than 100,000</option>
              </select>
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
              Submit Request{" "}
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

export default EmailMarketing

const emailmarketingStyles = {
  emailmarketingPage: {
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
