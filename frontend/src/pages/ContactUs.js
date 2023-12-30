import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import SiteFooter from '../components/Footer';
import Nav from '../components/Nav';

function ContactUs() {
  

  return (
    <div>
      <Nav />
      <Container fluid className="hero">
        <Row className="hero-body">
          <Col className="text-center hero-text">
            <h1 className="">Contact Us</h1>
            <h2 className="">
              Thank you for taking the time to reach out to us.
            </h2>
            {/* Embed the Google Forms contact form using an iframe */}
            <iframe
              title="Contact Form"
              src="https://docs.google.com/forms/d/e/1FAIpQLSfwaCfqkaVQHnFoY78juFuOIY_yeflVV5doDN7OgV8FZnADrQ/viewform?embedded=true"
              width="100%"
              height="1000"
              className="mb-4"
            >
              Loading...
            </iframe>
            <h2 className="subtitle">Contact us now</h2>
            <p>
              <a href="https://facebook.com/MEBResources" className="me-3 hyperlink">Facebook</a>
            </p>
            <p>
              <a href="mailto:info@mebresources.com" className="hyperlink">info@mebresources.com</a>
            </p>
            <p className="mt-3">Phone - 507-313-4804</p>
          </Col>
        </Row>
        <SiteFooter />
      </Container>
    </div>
  );
}

export default ContactUs;