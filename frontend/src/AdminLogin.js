import { useState } from 'react';
import 'bulma/css/bulma.min.css';
import { Button, Container, Form, Heading, Icon, Level, Section } from 'react-bulma-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';

function AdminLogin () {
  const [form, setForm] = useState({ username: '', password: '' });
  const update = (({ target }) => setForm({ ...form, [target.name]: target.value }))
  return (
    <div>
      <Section>
        <Container>
          <Level>
            <Level.Item>
              <Heading>MEB Resources Admin Login</Heading>
            </Level.Item>
          </Level>
        </Container>
      </Section>
      <Section>
        <Container>
          <Level>
            <Level.Item>
              <div>
                <Form.Field>
                  <Form.Label>Username</Form.Label>
                  <Form.Control iconLeft>
                    <Form.Input name="username" type="text" value={form.username} onChange={update} />
                    <Icon align="left">
                      <FontAwesomeIcon icon={faUser} />
                    </Icon>
                  </Form.Control>
                </Form.Field>
                <Form.Field>
                  <Form.Label>Password</Form.Label>
                  <Form.Control iconLeft>
                    <Form.Input name="password" type="password" value={form.password} onChange={update} />
                    <Icon align="left">
                      <FontAwesomeIcon icon={faLock} />
                    </Icon>
                  </Form.Control>
                </Form.Field>
                <Form.Field>
                  <Form.Control>
                    <Button type="primary" onClick={() => console.log(form)}>Submit</Button>
                  </Form.Control>
                </Form.Field>
              </div>
            </Level.Item>
          </Level>
        </Container>
      </Section>
    </div>
  );
}

export default AdminLogin;