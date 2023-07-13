import "bulma/css/bulma.min.css";
import {
  Button,
  Columns,
  Container,
  Heading,
  Hero,
  Icon,
  Image,
  Level,
} from "react-bulma-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import SiteFooter from "../components/Footer";
import Nav from "../components/Nav";
import Logo from "../landingLogo.png";
import useContentful from "../hooks/useContentful";

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
        <Hero size="fullheight" hasNavbar>
          <Hero.Header />
          <Hero.Body>
            <Container textAlign="center">
              <Heading spaced>Welcome to MEB Resources</Heading>
              <Icon align="center">
                <FontAwesomeIcon icon={faSpinner} className={"fa-spin"} />
              </Icon>
              Fetching content...
            </Container>
          </Hero.Body>
          <Hero.Footer>
            <SiteFooter />
          </Hero.Footer>
        </Hero>
      </div>
    );
  }

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
                <Heading spaced>{data.landing.title}</Heading>
                <Heading size={2} subtitle spaced>
                  {data.landing.subTitle}
                </Heading>
                <Heading size={4} subtitle spaced>
                  {data.landing.cta}
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
                        {data.landing.jobsButton}
                      </Button>
                    </Level.Item>
                    <Level.Item>
                      <Button
                        renderAs="a"
                        href={"/contact"}
                        size="large"
                        rounded
                      >
                        {data.landing.contactUsButton}
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
