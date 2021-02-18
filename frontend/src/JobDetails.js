import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import 'react-bulma-components/dist/react-bulma-components.min.css';
import { Container, Heading, Section } from 'react-bulma-components';
import Nav from './Nav';

function GetJobDetails () {
    const [data, setData] = useState(null)
    const {id} = useParams();
    
    useEffect(() => {
      fetch(`api/jobs/${id}`)
      .then((response) => {
        console.log(response)
          response.json()
      })
      .then(setData);
      
    }, [id]);
  
    if(data) {
      return (
        <div>
          <Section size="medium">
            <Container>
                <Heading>{data.name}</Heading>
                <Heading subtitle>{data.location}</Heading>
                <Heading subtitle>{data.salary}</Heading>
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