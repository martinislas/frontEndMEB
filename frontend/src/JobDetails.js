import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import 'react-bulma-components/dist/react-bulma-components.min.css';
import { Columns, Container, Content, Heading, Section } from 'react-bulma-components';
import Nav from './Nav';

function GetJobDetails () {
    const [data, setData] = useState(null)
    const {id} = useParams();
    
    useEffect(() => {
      fetch(`/api/jobs/${id}`)
      .then((response) => response.json())
      .then(setData);
    }, [id]);
  
    if(data) {
      return (
        <div>
          <Section size="medium">
            <Container>
              <Columns centered>
                <Columns.Column size="two-thirds">
                  <Heading>{data.name}</Heading>
                  <Heading subtitle>Location: {data.location}</Heading>
                  <Heading subtitle>Salary: {data.salary}</Heading>
                  <Content>
                    <p>Industry: {data.industry}</p>
                    <p>{data.description}</p>
                  </Content>
                </Columns.Column>
              </Columns>
            </Container>
          </Section>
        </div>
    );
    }
  
    return (
      <div>Fetching job {id}</div>
    );
}

function JobDetails () {
    return (
      <div>
        <Nav />
        <GetJobDetails />
      </div>
    );
}

export default JobDetails;