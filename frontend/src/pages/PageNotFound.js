import { Container, Heading, Section } from "react-bulma-components";
import Nav from "../components/Nav";

function PageNotFound() {
  return (
    <div>
      <Nav />
      <Container>
        <Section>
          <Heading>404 Page Not Found</Heading>
        </Section>
      </Container>
    </div>
  );
}

export default PageNotFound;
