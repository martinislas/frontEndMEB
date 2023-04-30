import "bulma/css/bulma.min.css";
import { Hero } from "react-bulma-components";
import SiteFooter from "../components/Footer";
import Nav from "../components/Nav";
import GetAboutUs from "../components/GetAboutUs";

function AboutUs() {
  return (
    <div>
      <Nav />
      <Hero size="fullheight" hasNavbar>
        <Hero.Header />
        <Hero.Body>
          <GetAboutUs />
        </Hero.Body>
        <Hero.Footer>
          <SiteFooter />
        </Hero.Footer>
      </Hero>
    </div>
  );
}

export default AboutUs;
