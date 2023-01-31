import "bulma/css/bulma.min.css";
import {
  Button,
  Columns,
  Container,
  Heading,
  Hero,
  Image,
  Level,
} from "react-bulma-components";
import SiteFooter from "../components/Footer";
import Nav from "../components/Nav";
import Logo from "../landingLogo.png";

function Landing() {
  return (
    <div>
      <Nav />
      <Hero size="fullheight" hasNavbar>
        <Hero.Header />
        <Hero.Body>
          <Columns vCentered>
            <Columns.Column size="half">
              <Image src={Logo} />
            </Columns.Column>
            <Columns.Column size="half">
              <Container>
                <Heading spaced>MEB Resources</Heading>
                <Heading size={2} subtitle spaced>
                  We provide staffing management and HR consulting in Rochester,
                  Austin and St. Cloud MN.
                </Heading>
                <Heading size={4} subtitle spaced>
                  We work here. We live here. We're committed to providing great
                  service to the clients we serve as well as the candidates and
                  employees we partner with.
                </Heading>
                <Level>
                  <Level.Side align="left">
                    <Level.Item>
                      <Button
                        renderAs="a"
                        href={"/jobs"}
                        color="primary"
                        size="large"
                        rounded
                      >
                        Check our latest openings
                      </Button>
                    </Level.Item>
                    <Level.Item>
                      <Button
                        renderAs="a"
                        href={"/contact"}
                        size="large"
                        rounded
                      >
                        Contact us
                      </Button>
                    </Level.Item>
                  </Level.Side>
                </Level>
              </Container>
            </Columns.Column>
          </Columns>
        </Hero.Body>
        <Hero.Footer>
          <SiteFooter />
        </Hero.Footer>
      </Hero>
    </div>
  );
}

export default Landing;
