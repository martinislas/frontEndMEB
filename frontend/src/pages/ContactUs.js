import React from 'react';
import { Container, Heading, Hero } from "react-bulma-components";
import SiteFooter from "../components/Footer";
import Nav from "../components/Nav";

function ContactUs() {
  const linkStyle = {
    color: "#4a4a4a",
    textDecoration: "none",
    transition: "letter-spacing 0.3s ease-in-out",
  };

  const handleMouseEnter = (event) => {
    event.target.style.letterSpacing = "2px"; // Increase the letter spacing on hover
  };

  const handleMouseLeave = (event) => {
    event.target.style.letterSpacing = "0"; // Reset the letter spacing when not hovering
  };

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
            {/* Embed the Google Forms contact form using an iframe */}
            <iframe
              title="Contact Form"
              src="https://docs.google.com/forms/d/e/1FAIpQLSfwaCfqkaVQHnFoY78juFuOIY_yeflVV5doDN7OgV8FZnADrQ/viewform?embedded=true"
              width="100%"
              height="1000"
            >
              Loading…
            </iframe>
            <Heading size={4} subtitle spaced>
              Contact us now
            </Heading>
            <p>
              <a
                href="https://facebook.com/MEBResources"
                style={linkStyle}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                Facebook
              </a>
            </p>
            <p>
              <a
                href="mailto:info@mebresources.com"
                style={linkStyle}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                Email - info@mebresources.com
              </a>
            </p>
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