import "bulma/css/bulma.min.css";
import { Block, Container, Heading, Hero } from "react-bulma-components";
import SiteFooter from "../components/Footer";
import Nav from "../components/Nav";

function AboutUs() {
  return (
    <div>
      <Nav />
      <Hero size="fullheight" hasNavbar>
        <Hero.Header />
        <Hero.Body>
          <Container textAlign="center">
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
            <Heading size={4} subtitle spaced>
              We don't "fill orders"
            </Heading>
            <Block>
              <p>
                We focus on results... and the smartest ways to achieve them.
              </p>
            </Block>
            <Heading size={4} subtitle spaced>
              We're not just about speed
            </Heading>
            <Block>
              <p>
                We take the time to carefully match people and job
                opportunities. We'd rather take the time to get it right than
                just refer someone fast.
              </p>
            </Block>
            <Heading size={4} subtitle spaced>
              We won't refer anyone until we understand your business
            </Heading>
            <Block>
              <p>
                We begin every client engagement with a tour of your workplace.
                By taking the time to really evaluate your needs, we can ensure
                we reger the right people.
              </p>
            </Block>
            <Heading size={4} subtitle spaced>
              We don't think candidates are a commodity
            </Heading>
            <Block>
              <p>
                Why do some staffing firms treat people like inventory? We don't
                get it. You're a unique individual and you'll be most successful
                in a job that fits your skills and interests. Our job is to help
                you find it!
              </p>
            </Block>
            <Heading size={4} subtitle spaced>
              We are not some bureaucratic or gigantic firm bound to policy
            </Heading>
            <Block>
              <p>
                We work here. We live here. We're committed to providing great
                service to the clients we serve as well as the candidates and
                employees we partner with.
              </p>
            </Block>
            <Heading size={4} subtitle spaced>
              Our Goal
            </Heading>
            <Block>
              <p>To ensure businesses succeed so communitites can prosper.</p>
            </Block>
            <Heading size={4} subtitle spaced>
              Vision & Mission
            </Heading>
            <Block>
              <p>
                To provide superior service to our employees, clients and all
                people that we come into contact with. We will strive to make a
                positive difference in people's lives and help out in any way
                possible. By doing so, we believe we can build a stronger
                community, one employee at a time.
              </p>
            </Block>
            <Heading size={4} subtitle spaced>
              Core Values
            </Heading>
            <Block>
              <p>
                <ul>
                  <li>
                    <strong>Leadership</strong>
                  </li>
                  <li>
                    <strong>Integrity</strong>
                  </li>
                  <li>
                    <strong>Collaboration</strong>
                  </li>
                  <li>
                    <strong>Excellence</strong>
                  </li>
                </ul>
              </p>
            </Block>
            <Block>
              <p>
                For staffing management or HR consulting services in St. Cloud,
                Austin or Rochester, MN,{" "}
                <strong>call MEB Resources today!</strong>
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

export default AboutUs;
