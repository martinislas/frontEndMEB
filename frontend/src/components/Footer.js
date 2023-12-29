import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';



/*<div class="container-fluid bg-dark text-light footer pt-5 mt-5 wow fadeIn" data-wow-delay="0.1s">
    <div class="container py-5">
        <div class="row g-5">
            <div class="col-lg-3 col-md-6">
                <h4 class="text-white fw-bold d-block">BERKELEY International School</h4>
                <p>
                    Berkeley Internatinal School (BIS) is a culturally diverse school with campuses in Phsar Kandal and Toul Kork areas. BIS strives to offer a world-class education at an affordable cost.
                </p>
            </div>
            <div class="col-lg-3 col-md-6">
                <h4 class="text-white mb-3">Quick Link</h4>
                <a class="btn btn-link" href="about.html">About Us</a>
                <a class="btn btn-link" href="gallery.html">Gallery</a>
                <a class="btn btn-link" href="work.html">Work With US</a>
                <a class="btn btn-link" href="early.html">Early Years</a>
                <a class="btn btn-link" href="primary.html">Cambridge Primary</a>
                <a class="btn btn-link" href="secondary.html">Cambridge Secondary</a>
                <a class="btn btn-link" href="eca.html">ECAs</a>
                <a class="btn btn-link" href="calendar.html">Calendar</a>
                <a class="btn btn-link" href="admissions.html">Admissions</a>
                <a class="btn btn-link" href="contact.html">Contact Us</a>
                
            </div>
            <div class="col-lg-3 col-md-6">
                <h4 class="text-white mb-3">Follow Us</h4>
                <a class="btn btn-link" href="https://www.facebook.com/BerkeleyInternationalSchool" target="_blank">On Facebook</a>
                <a class="btn btn-link" href="https://www.instagram.com/berkeley_international_school/" target="_blank">On Instagram</a>
                <!--a class="btn btn-link" href="">On Linkedin</a-->
            </div>
            <div class="col-lg-3 col-md-6">
                <h4 class="text-white mb-3">Contact</h4>
                <p class="mb-2"><i class="fa fa-map-marker-alt me-3"></i>Phsar Kandal Campus: #169, St. 136, Phsar Kandal II, Daun Penh, Phnom Penh</p>
                <p class="mb-2"><i class="fa fa-map-marker-alt me-3"></i>Toul Kork Campus: #22A, St. 273, Beoung Kak I, Toul Kork, Phnom Penh</p>
                <p class="mb-2"><i class="fa fa-phone-alt me-3"></i>12 900 242 / 12 872 630</p>
                <p class="mb-2"><i class="fa fa-envelope me-3"></i>info@bischool.edu.kh</p>
               
            </div>
            
        </div>
    </div>
    <div class="container">
        <div class="copyright">
            <div class="row">
                <div class="col-md-6 text-center text-md-start mb-3 mb-md-0">
                    &copy; <a class="border-bottom" href="#">BISchool</a>, All Right Reserved.

                    
                    Designed By <a class="border-bottom" href="https://martinislas.netlify.app/" target="_blank">Martin Islas</a>
                </div>
                
            </div>
        </div>
    </div>
</div>*/
function SiteFooter() {
  return (
    <footer className="footer container-fluid py-5">
      <Container>
        <Row className="align-items-start">
          <Col md={4}>
            <h3>MEB Resources</h3>
          </Col>
          <Col md={4} >
            <h5>Follow Us</h5>
            <a href="https://facebook.com/MEBResources" className="mx-2">
              <FontAwesomeIcon icon={faFacebook} />
            </a>
            <a href="https://www.instagram.com/mebresources" className="mx-2">
              <FontAwesomeIcon icon={faInstagram} />
            </a>
          </Col>
          <Col md={4}>
            <h5>Contact Us</h5>
            <p>
              <FontAwesomeIcon icon={faPhone} className="mr-2" />
              507-799-0076 / 507-313-4804
            </p>
            <p>
              <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
              info@mebresources.com
            </p>
          </Col>
        </Row>
        <hr />
        <Row>
          <Col>
            <p className="text-center">
              &copy; {new Date().getFullYear()} MEB Resources. All rights reserved.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default SiteFooter;