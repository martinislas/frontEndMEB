import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import 'bulma/css/bulma.min.css';
import { Button, Container, Form, Heading, Section, Table } from 'react-bulma-components';
import useToken from '../auth/UseToken';
import AdminNav from '../components/AdminNav';

function Admins () {
  const [token, ] = useToken();
  let navigate = useNavigate();

  // Existing admins
  const [adminList, setAdminList] = useState({admins: [] });

  useEffect(() => {
    async function getAdmins() {
      try {
        const { data: admins } = await axios.get('/api/admins', {
          headers: {'Authorization': 'Bearer ' + token}
        });
        if (admins) {
          setAdminList({ admins })
        }
      } catch (e) {
        console.log(e)
      }
    }

    getAdmins()
  }, [token]);

  // New Admin
  const [newAdminForm, setNewAdminForm] = useState({ first_name: '', surname: '', username: '', password: '',  });
  const updateNewAdminForm = (({ target }) => setNewAdminForm({ ...newAdminForm, [target.name]: target.value }));

  const onCreateNewAdminClicked = async () => {
    try {
      const response = await axios.post('/api/admin', {
        first_name: newAdminForm.first_name,
        surname: newAdminForm.surname,
        username: newAdminForm.username,
        password: newAdminForm.password,
      }, {
      headers: {'Authorization': 'Bearer ' + token}
      });
      navigate(`/admin/admins/${response.data.name}?status=success`);
      console.log(response)
    } catch (e) {
      if (e.response) {
        navigate('/admin/admins?status=failed');
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
          <Heading>Applicants</Heading>
          <Container>
            <Heading subtitle>Create New Admin User</Heading>
            <Form.Field>
              <Form.Label>First Name</Form.Label>
              <Form.Control>
                <Form.Input name="first_name" type="text" value={newAdminForm.first_name} onChange={updateNewAdminForm} />
              </Form.Control>
            </Form.Field>
            <Form.Field>
              <Form.Label>Surname</Form.Label>
              <Form.Control>
                <Form.Input name="surname" type="text" value={newAdminForm.surname} onChange={updateNewAdminForm} />
              </Form.Control>
            </Form.Field>
            <Form.Field>
              <Form.Label>Username</Form.Label>
              <Form.Control>
                <Form.Input name="username" type="text" value={newAdminForm.username} onChange={updateNewAdminForm} />
              </Form.Control>
            </Form.Field>                            
            <Form.Field>
              <Form.Label>Password</Form.Label>
              <Form.Control>
                <Form.Input name="password" type="text" value={newAdminForm.password} onChange={updateNewAdminForm} />
              </Form.Control>
            </Form.Field>
            <Form.Field>
              <Form.Control>
                <Button type="primary" onClick={onCreateNewAdminClicked}>Submit</Button>
              </Form.Control>
            </Form.Field>
          </Container>
        </Section>

        <Section>
          <Container>
            <Heading subtitle>Existing Admins</Heading>
            <Table size='fullwidth'>
              <tbody>
                {adminList.admins.map((admin) => {
                  return (
                    <tr>
                      <td>{admin.first_name}</td>
                      <td>{admin.surname}</td>
                      <td>{admin.username}</td>
                      <td>
                        <Button renderAs="a" href={'admin/admins#'}>Reset Password</Button>
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

export default Admins;