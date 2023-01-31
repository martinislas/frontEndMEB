import "bulma/css/bulma.min.css";
import { Container, Heading, Hero } from "react-bulma-components";
import SiteFooter from "../components/Footer";
import Nav from "../components/Nav";

function ContactUs() {
  const linkStyle = {
    color: "#4a4a4a",
    textDecoration: "none",
  };

  // const bgStyle = {
  //   background: `url(${Logo}) no-repeat center fixed`,
  //   backgroundSize: "contain",
  // };

  return (
    <div>
      <Nav />
      <Hero size="fullheight" hasNavbar>
        <Hero.Header />
        <Hero.Body>
          <Container textAlign="center">
            <Heading spaced>Contact Us</Heading>
            <Heading size={2} subtitle spaced>
              Thank you for taking the time to reach out to us.
              {/* we will be in contact with you soon. */}
            </Heading>
            {/* Need a contact form here - https://xd.adobe.com/view/5ca5762f-eba0-4037-aa58-25fd35029f78-09f6/screen/01e7e54f-db45-4a3d-8c26-aa1d6bbda020/ */}
            <Heading size={4} subtitle spaced>
              Contact us now
            </Heading>
            <p>
              <a href="https://facebook.com/MEBResources" style={linkStyle}>
                Facebook
              </a>
            </p>
            <p>Email - info@mebresources.com</p>
            <p>Phone - 507-313-4804</p>
          </Container>
        </Hero.Body>
        <Hero.Footer>
          <SiteFooter />
        </Hero.Footer>
      </Hero>
    </div>
  );
}

export default ContactUs;
