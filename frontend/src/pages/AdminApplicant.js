import { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';
import 'bulma/css/bulma.min.css';
import { Button, Container, Form, Heading, Section, Table } from 'react-bulma-components';
import useToken from '../auth/UseToken';
import AdminNav from '../components/AdminNav';
import LocationPicker from '../components/LocationPicker';
import IndustryPicker from '../components/IndustryPicker';

function AdminApplicant () {
  const [token, ] = useToken();
  const {id} = useParams();
  let navigate = useNavigate();

  // New Job
  const [updateJobForm, setUpdateJobForm] = useState({ title: '', description: '', salary: '', locationKey: '', industryKey: '' });
  const updateUpdateJobForm = (({ target }) => setUpdateJobForm({ ...updateJobForm, [target.name]: target.value }));

  // Existing applicants
  const [applicantList, setApplicantList] = useState({ applicants: [] });

  // Populate update form
  useEffect(() => {
    async function getJob() {
      try {
        const { data: job } = await axios.get('/api/admin/job', {
          id: id,
        }, {
          headers: {'Authorization': 'Bearer ' + token}
        });
        if (job) {
          setUpdateJobForm({ job })
          getApplicants()
        }
      } catch (e) {
        console.log(e)
      }
    }

    async function getApplicants() {
      setApplicantList([...applicantList, updateJobForm.applicant_keys.map((applicantID) => {
      try {
        const { data: applicant } = axios.get('/api/admin/applicant', {
          id: applicantID,
        }, {
          headers: {'Authorization': 'Bearer ' + token}
        });
        if (applicant) {
          return applicant
        }
      } catch (e) {
        console.log(e)
      }
      return applicantID
    })])
  }

  getJob()
}, [id, token, applicantList, updateJobForm.applicant_keys]);

  const onUpdateJobClicked = async () => {
    try {
      const response = await axios.put('/api/admin/job', {
        id: updateJobForm.id,
        name: updateJobForm.title,
        description: updateJobForm.description,
        salary: updateJobForm.salary,
        location_key: updateJobForm.locationKey,
        industry_key: updateJobForm.industryKey,
      }, {
      headers: {'Authorization': 'Bearer ' + token}
      });
      navigate(`/admin/jobs/${response.data.id}?status=success`);
      console.log(response)
    } catch (e) {
      if (e.response) {
        navigate(`/admin/jobs/${id}?status=failed`);
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
            <Heading subtitle>Update Job Posting</Heading>
            <Form.Field>
            <Form.Field hidden>
              <Form.Control>
                <Form.Input name="id" type="text" value={updateJobForm.id} />
              </Form.Control>
            </Form.Field>
              <Form.Label>Job Title</Form.Label>
              <Form.Control>
                <Form.Input name="title" type="text" value={updateJobForm.title} onChange={updateUpdateJobForm} />
              </Form.Control>
            </Form.Field>
            <Form.Field>
              <Form.Label>Job Description</Form.Label>
              <Form.Control>
                <Form.Input name="description" type="text" value={updateJobForm.description} onChange={updateUpdateJobForm} />
              </Form.Control>
            </Form.Field>
            <Form.Field>
              <Form.Label>Salary</Form.Label>
              <Form.Control>
                <Form.Input name="salary" type="text" value={updateJobForm.salary} onChange={updateUpdateJobForm} />
              </Form.Control>
            </Form.Field>
            <Form.Field>
              <Form.Label>Location</Form.Label>
              <Form.Control>
                <Form.Select name="locationKey" onChange={updateUpdateJobForm}>
                  <LocationPicker />
                </Form.Select>
              </Form.Control>
            </Form.Field>
            <Form.Field>
              <Form.Label>Industry</Form.Label>
              <Form.Control>
                <Form.Select name="industryKey" onChange={updateUpdateJobForm}>
                  <IndustryPicker />
                </Form.Select>
              </Form.Control>
            </Form.Field>
            <Form.Field>
              <Form.Control>
                <Button type="primary" onClick={onUpdateJobClicked}>Update Job Posting</Button>
              </Form.Control>
            </Form.Field>
          </Container>
        </Section>

        <Section>
          <Container>
            <Heading subtitle>Applicants</Heading>
            <Table>
              <tbody>
                {applicantList.applicants.map((applicant) => {
                  return (
                    <tr>
                      <td>{applicant.first_name}</td>
                      <td>{applicant.middle_name}</td>
                      <td>{applicant.last_name}</td>
                      <td>{applicant.phone}</td>
                      <td>
                        <Button renderAs="a" href={'admin/applicant/'+applicant.id}>View Applicant</Button>
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

export default AdminApplicant;