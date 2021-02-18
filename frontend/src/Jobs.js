import { useState, useEffect } from 'react';
import 'react-bulma-components/dist/react-bulma-components.min.css';
import { Button, Container, Section, Table } from 'react-bulma-components';
import Nav from './Nav';

function GetJobs () {
    const [data, setData] = useState(null)
    
    useEffect(() => {
      fetch(`api/jobs`)
      .then((response) => response.json())
      .then(setData);
    }, []);
  
    if(data) {
      return (
        <div>
            <Section>
                <Container>
                    A search box for filtering Jobs
                </Container>
            </Section>
            <Section>
                <Container>
                    <Table>
                        <thead>
                            <tr>
                                <th>Position</th>
                                <th>Salary</th>
                                <th>Location</th>
                                <th>Industry</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                        {data.map((job) => (
                            <tr>
                                <td>{job.name}</td>
                                <td>{job.salary}</td>
                                <td>{job.location}</td>
                                <td>{job.industry}</td>
                                <td>
                                    <Button.Group>
                                        <Button renderAs="a" href={'jobs/'+job.id}>Details</Button>
                                        <Button renderAs="a" href={'jobs/'+job.id}>Apply</Button>
                                    </Button.Group>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                </Container>
            </Section>
        </div>
    );
    }
  
    return (
      <div>Fetching jobs</div>
    );
}

function Jobs () {
    return (
      <div>
        <Nav />
        <GetJobs />
      </div>
    );
}

export default Jobs;