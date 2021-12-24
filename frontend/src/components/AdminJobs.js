import { useState } from 'react';
import { useHistory } from 'react-router';
import axios from 'axios';
import 'bulma/css/bulma.min.css';
import { Button, Container, Form, Level, Section } from 'react-bulma-components';
import useToken from '../auth/UseToken';

function AdminJobs () {
  const [token, ] = useToken();

  const [form, setForm] = useState({ username: '', password: '' });
  const update = (({ target }) => setForm({ ...form, [target.name]: target.value }));

  const history = useHistory();

  const onLoginClicked = async () => {
    try {
      const response = await axios.post('/api/jobs', {
        headers: {'Authorization': 'Bearer ' + token},
        name: form.title,
        description: form.description,
        salary: form.salary,
        location: form.location,
        industry: form.industry,
      });
      if (response.status !== 200) {
        history.push('/admin#jobs?status=failed');
      }
      history.push('/admin#jobs?status=success');
      console.log(response)
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <Section id="jobs">
      <Container>
        <Level>
          <Level.Item>
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
                  <Button type="primary" onClick={onLoginClicked}>Submit</Button>
                </Form.Control>
              </Form.Field>
            </div>
          </Level.Item>
        </Level>
      </Container>
      <Container>Update Job ID</Container>
      <Container>Delete Job ID</Container>
      </Section>
  );
}

export default AdminJobs;