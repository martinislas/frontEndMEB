import React from 'react';
import { Button, Col, Container, Image, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import SiteFooter from '../components/Footer';
import Nav from '../components/Nav';
import Logo from '../landingLogo.png';
import useContentful from '../hooks/useContentful';

const query = `query {
  landing(id: "6tngxuPAoAgIMrZbi8W9L0") {
    title
    subTitle
    cta
    jobsButton
    contactUsButton
  }
}`;

function Landing() {
  let { data } = useContentful(query);

  if (!data) {
    return (
      <div>
        <Nav />
        <div className="d-flex align-items-center justify-content-center vh-100">
          <Container>
            <h1 className="text-center mb-4" >Welcome to MEB Resources</h1>
            <FontAwesomeIcon icon={faSpinner} className="fa-spin mb-2" />
            <p className="text-center">Fetching content...</p>
          </Container>
        </div>
        <SiteFooter />
      </div>
    );
  }

  return (
    <div>
      <Nav />
      <div className="d-flex align-items-center justify-content-center vh-100 hero-text">
        <Container>
          <Row>
            <Col xs={12} md={6}>
              <Image src={Logo} fluid />
            </Col> 
            

            <Col xs={12} md={6}>
              <Container>
                <h1 className="mb-4 ">{data.landing.title}</h1>
                <h2 className="mb-4">{data.landing.subTitle}</h2>
                <h4 className="mb-4">{data.landing.cta}</h4>
                <div className="d-flex justify-content-center">
                                   
                    <Button
                      as="a"
                      href="/jobs"
                      size="lg"
                      className="mr-3 ligth btn btn-primary bg-white text-dark border border-none"
                    >
                     
                    {data.landing.jobsButton}
                  </Button>

                  <Button
                      as="a"
                      href="/contact"
                      size="lg"
                      className="mr-3 ligth btn btn-primary bg-white text-dark border border-none"

                    >
                     
                    {data.landing.contactUsButton}
                  </Button>
                  
                </div>
                
              </Container>
            </Col>
          </Row>
        </Container>
      </div>
      <SiteFooter />
    </div>
  );
}

export default Landing;