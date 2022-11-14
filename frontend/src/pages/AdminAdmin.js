import { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';
import 'bulma/css/bulma.min.css';
import { Button, Columns, Container, Form, Heading, Icon, Section, Table } from 'react-bulma-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';
import useToken from '../auth/UseToken';
import AdminNav from '../components/AdminNav';

function Admin () {
  const [token, ] = useToken();
  const {id} = useParams();

  // Get the admin by ID
  const [currentAdmin, setCurrentAdmin] = useState({username: '', firstName: '', lastName: '', isActive: false, isCurrent: false})

  useEffect(() => {
    async function getAdmin() {
      try {
        const response = await axios.get(`/api/admin/${id}`, {
          headers: {'Authorization': 'Bearer ' + token}
          });
        if (response) {
          setCurrentAdmin({ 
            username: response.data.username,
            firstName: response.data.first_name,
            lastName: response.data.last_name,
            isActive: response.data.is_active,
            isCurrent: response.data.is_current
          })
        }
      } catch (e) {
        console.log(e)
      }
    }

    getAdmin()
  }, [id, token]);

  return (
    <div>
      <AdminNav />
      <Container>
        <Section>
          <Heading>Edit Existing Admin</Heading>
          <Columns>
            <Columns.Column>
              <Table>
                <tbody>
                  <tr>
                    <th>Username</th>
                    <td>{currentAdmin.username}</td>
                  </tr>
                  <tr>
                    <th>First Name</th>
                    <td>{currentAdmin.firstName}</td>
                  </tr>
                  <tr>
                    <th>Last Name</th>
                    <td>{currentAdmin.lastName}</td>
                  </tr>
                  <tr>
                    <th>User Status</th>
                    <td>{currentAdmin.isActive ? <Icon align="center"><FontAwesomeIcon icon={faCheck} /></Icon> : <Icon align="center"><FontAwesomeIcon icon={faXmark} /></Icon>}</td>
                  </tr>
                  <tr>
                    <th>Current User</th>
                    <td>{currentAdmin.isCurrent && <Icon align="center"><FontAwesomeIcon icon={faCheck} /></Icon>}</td>
                  </tr>
                </tbody>
              </Table>
            </Columns.Column>
            <Columns.Column>
              {/* {currentAdmin.isActive ? <DisableAdmin admin={currentAdmin} token={token} /> : <EnableAdmin admin={currentAdmin} token={token} />} */}
            </Columns.Column>
            <Columns.Column>
              {/* <ChangeAdminPassword admin={currentAdmin} /> */}
            </Columns.Column>
          </Columns>
        </Section>
      </Container>
    </div>
  );
}

function DisableAdmin({ admin, token }) {
  let navigate = useNavigate();

  const onDisableAdminClicked = async () => {
    try {
      const response = await axios.put('/api/admin', {
        username: admin.username,
        first_name: admin.firstName,
        surname: admin.lastName,
        is_active: false
      }, {
      headers: {'Authorization': 'Bearer ' + token}
      });
      navigate(`/admin/admins/${response.data.username}?status=success`);
    } catch (e) {
      if (e.response) {
        navigate(`/admin/admins/${admin.username}?status=failed`);
      } else {
        console.log(e)
      }
    }
  }

  return (
    <div>
      <Container>
        <Form.Field>
          <Form.Control>
            <Button type="primary" onClick={onDisableAdminClicked}>Disable Admin</Button>
          </Form.Control>
        </Form.Field>
      </Container>
    </div>
  );
}

function EnableAdmin({ admin, token }) {
  let navigate = useNavigate();

  const onEnableAdminClicked = async () => {
    try {
      const response = await axios.put('/api/admin', {
        username: admin.username,
        first_name: admin.firstName,
        surname: admin.lastName,
        is_active: true
      }, {
      headers: {'Authorization': 'Bearer ' + token}
      });
      navigate(`/admin/admins/${response.data.username}?status=success`);
    } catch (e) {
      if (e.response) {
        navigate(`/admin/admins/${admin.username}?status=failed`);
      } else {
        console.log(e)
      }
    }
  }

  return (
    <div>
      <Container>
        <Form.Field>
          <Form.Control>
            <Button type="primary" onClick={onEnableAdminClicked}>Enable Admin</Button>
          </Form.Control>
        </Form.Field>
      </Container>
    </div>
  );
}

function ChangeAdminPassword({ admin }) {

  return (
    <div>
      Soon
    </div>
  );
}

export default Admin;