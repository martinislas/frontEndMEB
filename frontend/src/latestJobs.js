import { useState, useEffect } from 'react';
import 'bulma/css/bulma.min.css';
import { Card, Columns, Container, Heading, Hero, Image, Section } from 'react-bulma-components';

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