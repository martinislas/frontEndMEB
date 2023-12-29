import React from 'react';
import { Navbar, Nav as BootstrapNav } from "react-bootstrap";

function Nav() {
  return (
    <Navbar collapseOnSelect expand="lg" className='nav-bar' style={{ backgroundColor: "rgba(255, 217, 198, 255)"}} fixed="top">
      
      <Navbar.Brand className="brand" href="/">
        MEB resources
      </Navbar.Brand>

      <Navbar.Toggle className="nav-toggle" aria-controls="responsive-navbar-nav" style={{ border: "none" }}/>

      <Navbar.Collapse id="responsive-navbar-nav" >
        <BootstrapNav className="ml-auto" >
          <BootstrapNav.Link href="/" className="mr-3">Home</BootstrapNav.Link>
          <BootstrapNav.Link href="/about" className="mr-3">About Us</BootstrapNav.Link>
          <BootstrapNav.Link href="/jobs" className="mr-3">Jobs</BootstrapNav.Link>
          <BootstrapNav.Link href="/contact" className="mr-3">Contact Us</BootstrapNav.Link>
          
        </BootstrapNav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Nav;