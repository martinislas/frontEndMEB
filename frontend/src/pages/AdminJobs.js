import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import 'bulma/css/bulma.min.css';
import { Button, Container, Form, Heading, Section, Table } from 'react-bulma-components';
import useToken from '../auth/UseToken';
import AdminNav from '../components/AdminNav';
import LocationPicker from '../components/LocationPicker';
import IndustryPicker from '../components/IndustryPicker';

function AdminJobs () {
  const [token, ] = useToken();
  let navigate = useNavigate();

  // Existing jobs
  const [jobList, setJobList] = useState({jobs: [] });

  useEffect(() => {
    async function getJobs() {
      try {
        const { data: jobs } = await axios.get('/api/jobs');
        if (jobs) {
          setJobList({ jobs })
        }
      } catch (e) {
        console.log(e)
      }
    }

    getJobs()
  }, []);

  // New Job
  const [newJobForm, setNewJobForm] = useState({ title: '', description: '', salary: '', locationKey: '', industryKey: '' });
  const updateNewJobForm = (({ target }) => setNewJobForm({ ...newJobForm, [target.name]: target.value }));

  const onCreateNewJobClicked = async () => {
    try {
      const response = await axios.post('/api/admin/job', {
        name: newJobForm.title,
        description: newJobForm.description,
        salary: newJobForm.salary,
        location_key: newJobForm.locationKey,
        industry_key: newJobForm.industryKey,
      }, {
      headers: {'Authorization': 'Bearer ' + token}
      });
      navigate(`/admin/jobs/${response.data.id}?status=success`);
      console.log(response)
    } catch (e) {
      if (e.response) {
        navigate('/admin/jobs?status=failed');
      } else {
        console.log(e)
      }
    }
  }

  return (
    <div>
      <AdminNav />
      <Container>
        <Section>
          <Heading>Jobs</Heading>
          <Container>
            <Heading subtitle>Create New Job Posting</Heading>
            <Form.Field>
              <Form.Label>Job Title</Form.Label>
              <Form.Control>
                <Form.Input name="title" type="text" value={newJobForm.title} onChange={updateNewJobForm} />
              </Form.Control>
            </Form.Field>
            <Form.Field>
              <Form.Label>Job Description</Form.Label>
              <Form.Control>
                <Form.Input name="description" type="text" value={newJobForm.description} onChange={updateNewJobForm} />
              </Form.Control>
            </Form.Field>
            <Form.Field>
              <Form.Label>Salary</Form.Label>
              <Form.Control>
                <Form.Input name="salary" type="text" value={newJobForm.salary} onChange={updateNewJobForm} />
              </Form.Control>
            </Form.Field>
            <Form.Field>
              <Form.Label>Location</Form.Label>
              <Form.Control>
                <Form.Select name="locationKey" onChange={updateNewJobForm}>
                  <LocationPicker />
                </Form.Select>
              </Form.Control>
            </Form.Field>
            <Form.Field>
              <Form.Label>Industry</Form.Label>
              <Form.Control>
                <Form.Select name="industryKey" onChange={updateNewJobForm}>
                  <IndustryPicker />
                </Form.Select>
              </Form.Control>
            </Form.Field>
            <Form.Field>
              <Form.Control>
                <Button type="primary" onClick={onCreateNewJobClicked}>Submit</Button>
              </Form.Control>
            </Form.Field>
          </Container>
        </Section>

        <Section>
          <Container>
            <Heading subtitle>Existing Jobs</Heading>
            <Table size='fullwidth'>
              <tbody>
                {jobList.jobs.map((job) => {
                  return (
                    <tr>
                      <td>{job.name}</td>
                      <td>{job.location}</td>
                      <td>{job.industry}</td>
                      <td>{job.applicant_count}</td>
                      <td>
                        <Button renderAs="a" href={'/admin/jobs/'+job.id}>View / Edit</Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </Container>
        </Section>
      </Container>
    </div>
  );
}

export default AdminJobs;