import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import 'bulma/css/bulma.min.css';
import { Button, Container, Form, Section } from 'react-bulma-components';
import useToken from '../auth/UseToken';

function AdminJobs () {
  const [token, ] = useToken();

  const [form, setForm] = useState({ username: '', password: '' });
  const update = (({ target }) => setForm({ ...form, [target.name]: target.value }));

  let navigate = useNavigate();

  const onNewJobClicked = async () => {
    try {
      const response = await axios.post('/api/admin/job', {
        name: form.title,
        description: form.description,
        salary: form.salary,
        location: form.location,
        industry: form.industry,
      }, {
      headers: {'Authorization': 'Bearer ' + token}
      });
      navigate('/admin#jobs?status=success');
      console.log(response)
    } catch (e) {
      if (e.response) {
        navigate('/admin#jobs?status=failed');
      } else {
        console.log(e)
      }
    }
  }

  return (
    <Section id="jobs">
      <Container>
        <div>
          <Form.Field>
            <Form.Label>Job Title</Form.Label>
            <Form.Control>
              <Form.Input name="title" type="text" value={form.title} onChange={update} />
            </Form.Control>
          </Form.Field>
          <Form.Field>
            <Form.Label>Job Description</Form.Label>
            <Form.Control>
              <Form.Input name="description" type="text" value={form.description} onChange={update} />
            </Form.Control>
          </Form.Field>
          <Form.Field>
            <Form.Label>Salary</Form.Label>
            <Form.Control>
              <Form.Input name="salary" type="text" value={form.salary} onChange={update} />
            </Form.Control>
          </Form.Field>
          <Form.Field>
            <Form.Label>Location</Form.Label>
            <Form.Control>
              <Form.Input name="location" type="text" value={form.location} onChange={update} />
            </Form.Control>
          </Form.Field>
          <Form.Field>
            <Form.Label>Industry</Form.Label>
            <Form.Control>
              <Form.Input name="industry" type="text" value={form.industry} onChange={update} />
            </Form.Control>
          </Form.Field>
          <Form.Field>
            <Form.Control>
              <Button type="primary" onClick={onNewJobClicked}>Submit</Button>
            </Form.Control>
          </Form.Field>
        </div>
      </Container>
      <Container>Update Job ID</Container>
      <Container>Delete Job ID</Container>
      </Section>
  );
}

export default AdminJobs;