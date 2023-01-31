import "bulma/css/bulma.min.css";
import { Block, Container, Heading, Hero } from "react-bulma-components";
import SiteFooter from "../components/Footer";
import Nav from "../components/Nav";

function Services() {
  return (
    <div>
      <Nav />
      <Hero size="fullheight" hasNavbar>
        <Hero.Header />
        <Hero.Body>
          <Container>
            <Heading spaced>About Us</Heading>
            <Heading size={2} subtitle spaced>
              We provide staffing management and HR consulting in Rochester,
              Austin and St. Cloud MN.
            </Heading>

            <Heading size={4} subtitle spaced>
              Anything But Ordinary
            </Heading>
            <Block>
              <p>
                In the past few years, we've been called a lot of things...
                We've been called a partner, a friend and once in a while even a
                lifesaver. But what we've never been called is ordinary.
              </p>
            </Block>
          </Container>
        </Hero.Body>
        <Hero.Footer>
          <SiteFooter />
        </Hero.Footer>
      </Hero>
    </div>
  );
}

export default Services;
