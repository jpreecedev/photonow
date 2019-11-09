import React from "react"
import { Typography, Container } from "@material-ui/core"

import { MainLayout } from "../../layouts/main"

const PrivacyPolicy = () => {
  return (
    <MainLayout>
      <Container maxWidth="md">
        <Typography component="h1" variant="h4" gutterBottom>
          Cookie Policy
        </Typography>

        <Typography component="p" gutterBottom>
          This Photonow Cookie Policy (“Policy”) is meant to explain the type of cookies and other
          tracking technologies that PhotoNow Limited (“Photonow”, “we”, “us” or “our”) may place on
          your device to improve our services and your experience when visiting our web properties.
        </Typography>
        <h2>What are cookies?</h2>

        <Typography component="p" gutterBottom>
          Cookies are small pieces of text sent by us to your computer or mobile device to store
          information. Cookies are unique to your account or your browser, and they are used to
          enable Photonow features and functionality. Session-based cookies are automatically
          deleted when you close your browser. Persistent cookies last until you or your browser
          delete them or until they expire.
        </Typography>
        <h2>How is Photonow using cookies?</h2>

        <Typography component="p" gutterBottom>
          Photonow uses cookies on our website (photonow.io) and any associated web properties for
          the following purpose:
        </Typography>
        <Typography component="p" gutterBottom>
          <strong>Authentication</strong> - We use cookies to determine whether or not you've signed
          in to Photonow and to keep you signed in during visits as you access different pages.
        </Typography>
        <Typography component="p" gutterBottom>
          <strong>Security</strong> - We use cookies to enable and support security features,
          prevent fraud and detect malicious activity.
        </Typography>
        <Typography component="p" gutterBottom>
          <strong>Preferences and Features</strong> - We use cookies to enable features, personalise
          your content and remember your preferences.
        </Typography>
        <Typography component="p" gutterBottom>
          <strong>Advertising</strong> - We may use cookies to deliver, evaluate and improve
          marketing campaigns (e.g. a user visited our Pricing page). Our Ad Partners may also use
          cookies to determine whether you’ve already seen an ad, or provide us with information
          about your interaction with ad. Use of those third-party cookies are subject to the
          service provider’s policies.
        </Typography>
        <Typography component="p" gutterBottom>
          <strong>Performance and Analytics</strong> - We use cookies to analyse how our services
          perform. These cookies help us identify and fix errors, understand and improve products,
          features and services, and monitor how users reach our services.
        </Typography>

        <h2>Third-Party cookies</h2>

        <Typography component="p" gutterBottom>
          These are third party services that we use for purposes as described:
        </Typography>
        <ul>
          <li>
            <strong>Google Analytics</strong> - We use Google Analytics to help measure how users
            interact with our websites -{" "}
            <a href="https://policies.google.com/privacy">https://policies.google.com/privacy</a>
          </li>

          <li>
            <strong>Facebook</strong> - We use Facebook Pixels and Custom Audiences to deliver
            targeted advertisements to individuals who visit our websites -{" "}
            <a href="https://www.facebook.com/policy.php">https://www.facebook.com/policy.php</a>
          </li>

          <li>
            Cloudflare - We use Cloudflare to provide application security -{" "}
            <a href="https://www.cloudflare.com/privacypolicy/">
              https://www.cloudflare.com/privacypolicy
            </a>
          </li>
        </ul>
        <h2>How do I control cookies?</h2>

        <Typography component="p" gutterBottom>
          Please keep in mind that removing or blocking cookies will make parts of our website no
          longer accessible. Most browsers accept cookies automatically but they also give you the
          ability to manage cookies. You can typically find cookie control in your browser’s “Tools”
          or “Preferences” menu, giving you ability to disallow cookies from all or specific sites.
          For more information on how to block, manage or filter cookies, you can learn more about
          through your browser’s help file.
        </Typography>
        <Typography component="p" gutterBottom>
          You are also able to opt-out of third party advertiser such as Facebook and ad networks
          that adhere to the Self-Regulatory Principles for Online Behavioral Advertising by
          visiting the <a href="http://www.aboutads.info/choices/">Digital Advertising Alliance</a>,
          the <a href="http://youradchoices.ca/">Digital Advertising Alliance of Canada</a> and the{" "}
          <a href="http://www.youronlinechoices.eu/">
            European Interactive Digital Advertising Alliance
          </a>
          .
        </Typography>
        <Typography component="p" gutterBottom>
          We currently do not respond to "Do Not Track” or “DNT” signals because industry standards
          for “DNT” signals have not been adopted. We will continue to make efforts to monitor the
          developments surrounding DNT technology. To learn more, you can visit{" "}
          <a href="https://allaboutdnt.com/">https://allaboutdnt.com</a>.
        </Typography>
        <Typography component="p" gutterBottom>
          Many third party advertising and tracking services offer the ability to opt-out. You can
          read more about information they collect and how to opt-out through the privacy policy
          link listed for each of the services above.
        </Typography>
        <h2>How often will you update this Cookie Statement?</h2>

        <Typography component="p" gutterBottom>
          From time to time, we will update this Cookie Policy in order to reflect changes to the
          cookies we use for operational, legal or regulatory reasons. Please visit this Cookie
          Policy again regularly to fully understand our use of cookies and other related
          technologies.
        </Typography>
        <Typography component="p" style={{ marginTop: "50px", marginBottom: "50px" }}>
          Last updated: October 30, 2019
        </Typography>
      </Container>
    </MainLayout>
  )
}

export default PrivacyPolicy
