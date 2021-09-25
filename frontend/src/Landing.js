import { useState, useEffect } from 'react';
import 'react-bulma-components/dist/react-bulma-components.min.css';
import { Card, Columns, Container, Heading, Hero, Section } from 'react-bulma-components';
import Nav from './Nav';

function LatestJobs () {
    const [data, setData] = useState(null)
    
    useEffect(() => {
      fetch(`/api/jobs?limit=3`)
      .then((response) => response.json())
      .then(setData);
    }, []);
  
    if(data) {
      return (
        <div>
          <Section size="small">
            <Container>
              <Heading size={3}>Latest Jobs</Heading>
              <Columns>
                {data.map((job) => (
                  <Columns.Column size="one-third">
                    <Card>
                      <Card.Content>
                        <Heading>{job.name}</Heading>
                        <Heading subtitle>{job.location}</Heading>
                        <Heading subtitle>{job.salary}</Heading>
                      </Card.Content>
                      <Card.Footer>
                        <Card.Footer.Item renderAs="a" href={'jobs/'+job.id}>Apply</Card.Footer.Item>
                      </Card.Footer>
                    </Card>
                  </Columns.Column>
                ))}
              </Columns>
            </Container>
          </Section>
        </div>
    );
    }
  
    return (
      <div>Fetching jobs</div>
    );
}

function Welcome () {
    return (
      <div>
        <Hero size="medium">
          <Hero.Body>
            <Container>
              <Heading spaced>MEB Resources</Heading>
              <Heading size={2} subtitle spaced>
                We provide staffing management and HR consulting in Rochester, Austin and St. Cloud MN.
              </Heading>
              <Heading size={4} subtitle spaced>
                We work here. We live here. We're committed to providing great service to the clients we serve as well as the candidates and employees we partner with.
              </Heading>
            </Container>
          </Hero.Body>
        </Hero>
      </div>
    );
}

function Landing () {
    return (
      <div>
        <Nav />
        <Welcome />
        <LatestJobs />
      </div>
    );
}

export default Landing;