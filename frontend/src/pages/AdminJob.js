import { useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';
import 'bulma/css/bulma.min.css';
import { Button, Container, Form, Heading, Section, Table } from 'react-bulma-components';
import useToken from '../auth/UseToken';
import AdminNav from '../components/AdminNav';
import LocationPicker from '../components/LocationPicker';
import IndustryPicker from '../components/IndustryPicker';
import GetApplicantAsAdmin from '../components/GetApplicantAsAdmin';

function AdminJob () {
  const [token, ] = useToken();
  const {id} = useParams();
  let navigate = useNavigate();

  // Update Job Form
  const [updateJobForm, setUpdateJobForm] = useState({ id: id, title: '', description: '', salary: '', location_key: '', industry_key: '', applicant_keys: [], posted_by: '', active: true });
  const updateUpdateJobForm = (({ target }) => setUpdateJobForm({ ...updateJobForm, [target.name]: target.value }));

  // Populate update form
  // async function getJob() {
  //   try {
  //     const { data: job } = await axios.get(`/api/admin/job/${id}`, {
  //       headers: {'Authorization': 'Bearer ' + token}
  //     });
  //     if (job) {
  //       setUpdateJobForm(updateJobForm => ({...updateJobForm, [job.fieldName] : job.value }))
  //     }
  //   } catch (e) {
  //     console.log(e)
  //   }
  // }

  const onUpdateJobClicked = async () => {
    try {
      const response = await axios.put('/api/admin/job', {
        id: updateJobForm.id,
        name: updateJobForm.title,
        description: updateJobForm.description,
        salary: updateJobForm.salary,
        location_key: updateJobForm.location_key,
        industry_key: updateJobForm.industry_key,
        applicant_keys: updateJobForm.applicant_keys,
        posted_by: updateJobForm.posted_by,
        active: updateJobForm.active,
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
            <Heading subtitle>Where should the current details go?</Heading>
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
                {updateJobForm.applicant_keys.map((applicant) => {
                  return (<GetApplicantAsAdmin applicantID={applicant.id} />);
                })}
              </tbody>
            </Table>
          </Container>
        </Section>
      </Container>
    </div>
  );
}

export default AdminJob;