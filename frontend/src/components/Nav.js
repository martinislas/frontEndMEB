import "bulma/css/bulma.min.css";
import { Navbar } from "react-bulma-components";

function Nav() {
  return (
    <Navbar color="primary" fixed="top">
      <Navbar.Brand>
        <Navbar.Item href="/">
          <strong>MEB Resources</strong>
        </Navbar.Item>
      </Navbar.Brand>
      <Navbar.Menu>
        <Navbar.Container align="right">
          <Navbar.Item href="/">Home</Navbar.Item>
          <Navbar.Item href="/contact">Contact Us</Navbar.Item>
          {/* <Navbar.Item href="/services">Services</Navbar.Item> */}
          <Navbar.Item href="/jobs">Jobs</Navbar.Item>
          <Navbar.Item href="/about">About Us</Navbar.Item>
        </Navbar.Container>
      </Navbar.Menu>
    </Navbar>
  );
}

export default Nav;
