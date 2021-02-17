import { useState, useEffect } from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import 'react-bulma-components/dist/react-bulma-components.min.css';
import { Card, Columns, Container, Heading, Navbar, Section } from 'react-bulma-components';

function Nav() {
  return (
    <Navbar color="primary">
      <Navbar.Brand>
        <Navbar.Item href="/">
          MEB Resources
        </Navbar.Item>
      </Navbar.Brand>
      <Navbar.Menu>
        <Navbar.Container position="end">
          <Navbar.Item href="/">Home</Navbar.Item>
          <Navbar.Item href="/jobs">Jobs</Navbar.Item>
          <Navbar.Item href="/jobs">Job Seeker Advice</Navbar.Item>
          <Navbar.Item href="/jobs">For Employers</Navbar.Item>
          <Navbar.Item>Applicants</Navbar.Item>
        </Navbar.Container>
      </Navbar.Menu>
    </Navbar>
  );
}

function LatestJobs () {
  const [data, setData] = useState(null)
  
  useEffect(() => {
    fetch(`api/jobs`)
    .then((response) => response.json())
    .then(setData);
  }, []);

  if(data) {
    return (
      <div>
        <Section size="medium">
          <Container>
            <Heading size={2}>Latest Jobs</Heading>
            <Columns>
              {data.map((job) => (
                <Columns.Column size="one-third">
                  <Card>
                    <Card.Content>
                      <Heading>{job.name}</Heading>
                      <Heading subtitle>{job.location}</Heading>
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
      </div>)
  }

  return (
    <div>Fetching jobs</div>
  );
}

function Landing () {
  return (
    <div>
      <Nav />
      <LatestJobs />
    </div>
  );
}

function Jobs () {
  return (
    <div>
      <Nav />
      <h1>Jobs</h1>
    </div>
  );
}

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Landing />}/> 
        <Route path="/jobs" element={<Jobs />}/>
      </Routes>
    </div>
  );
}

export default App;
