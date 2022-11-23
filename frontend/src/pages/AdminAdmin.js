import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "bulma/css/bulma.min.css";
import {
  Box,
  Button,
  Columns,
  Container,
  Form,
  Heading,
  Icon,
  Section,
  Table,
} from "react-bulma-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import useToken from "../auth/UseToken";
import AdminNav from "../components/AdminNav";
import RemoveToken from "../auth/RemoveToken";
import StatusNotification from "../components/StatusNotification";

function Admin() {
  const { id } = useParams();

  return (
    <div>
      <AdminNav />
      <StatusNotification />
      <Container>
        <Section>
          <Heading>Edit Existing Admin</Heading>
          <GetCurrentAdmin id={id} />
        </Section>
      </Container>
    </div>
  );
}

function GetCurrentAdmin({ id }) {
  const [token] = useToken();

  // Get the admin by ID
  const [currentAdmin, setCurrentAdmin] = useState({
    username: "",
    firstName: "",
    lastName: "",
    isActive: false,
    isCurrent: false,
  });

  useEffect(() => {
    async function getAdmin() {
      try {
        const response = await axios.get(`/api/admin/${id}`, {
          headers: { Authorization: "Bearer " + token },
        });
        if (response) {
          setCurrentAdmin({
            username: response.data.username,
            firstName: response.data.first_name,
            lastName: response.data.surname,
            isActive: response.data.is_active,
            isCurrent: response.data.is_current,
          });
        }
      } catch (e) {
        console.log(e); // Remove later
        if (e.response) {
          if (e.response.status === 401) {
            RemoveToken();
          }
        } else {
          console.log(e); // Send error to BE?
        }
      }
    }

    getAdmin();
  }, [id, token]);

  if (currentAdmin.username === "") {
    return <div>Loading...</div>;
  }
  return (
    <Container>
      <Box>
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
                  <td>
                    {currentAdmin.isActive ? (
                      <Icon align="center">
                        <FontAwesomeIcon icon={faCheck} />
                      </Icon>
                    ) : (
                      <Icon align="center">
                        <FontAwesomeIcon icon={faXmark} />
                      </Icon>
                    )}
                  </td>
                </tr>
                <tr>
                  <th>Current User</th>
                  <td>
                    {currentAdmin.isCurrent && (
                      <Icon align="center">
                        <FontAwesomeIcon icon={faCheck} />
                      </Icon>
                    )}
                  </td>
                </tr>
              </tbody>
            </Table>
          </Columns.Column>
          <Columns.Column>
            {currentAdmin.isActive ? (
              <DisableAdmin admin={currentAdmin} token={token} />
            ) : (
              <EnableAdmin admin={currentAdmin} token={token} />
            )}
          </Columns.Column>
          <Columns.Column>
            <ChangeAdminPassword admin={currentAdmin} token={token} />
          </Columns.Column>
        </Columns>
      </Box>
    </Container>
  );
}

function DisableAdmin({ admin, token }) {
  let navigate = useNavigate();

  const onDisableAdminClicked = async () => {
    try {
      await axios.put(
        "/api/admin",
        {
          username: admin.username,
          first_name: admin.firstName,
          surname: admin.lastName,
          is_active: false,
        },
        {
          headers: { Authorization: "Bearer " + token },
        }
      );
      navigate(`/admin/admins`, { state: { status: "success" } });
    } catch (e) {
      console.log(e); // Remove later
      if (e.response) {
        if (e.response.status === 401) {
          RemoveToken();
        } else {
          navigate(`/admin/admins/${admin.username}`, {
            state: { status: "failed" },
          });
        }
      } else {
        console.log(e); // Send error to BE?
      }
    }
  };

  return (
    <div>
      <Container>
        <Form.Field>
          <Form.Control>
            <Button type="primary" onClick={onDisableAdminClicked}>
              Disable Admin
            </Button>
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
      await axios.put(
        "/api/admin",
        {
          username: admin.username,
          first_name: admin.firstName,
          surname: admin.lastName,
          is_active: true,
        },
        {
          headers: { Authorization: "Bearer " + token },
        }
      );
      navigate(`/admin/admins`, {
        state: { status: "success" },
      });
    } catch (e) {
      console.log(e); // Remove later
      if (e.response) {
        if (e.response.status === 401) {
          RemoveToken();
        } else {
          navigate(`/admin/admins/${admin.username}`, {
            state: { status: "failed" },
          });
        }
      } else {
        console.log(e); // Send error to BE?
      }
    }
  };

  return (
    <div>
      <Container>
        <Form.Field>
          <Form.Control>
            <Button type="primary" onClick={onEnableAdminClicked}>
              Enable Admin
            </Button>
          </Form.Control>
        </Form.Field>
      </Container>
    </div>
  );
}

function ChangeAdminPassword({ admin, token }) {
  let navigate = useNavigate();

  const [changeAdminPasswordForm, setChangeAdminPasswordForm] = useState({
    password: "",
  });
  const updateChangeAdminPasswordForm = event =>
    setChangeAdminPasswordForm({ password: event.target.value });

  const onChangeAdminPasswordClicked = async () => {
    try {
      await axios.put(
        "/api/admin",
        {
          username: admin.username,
          first_name: admin.firstName,
          surname: admin.lastName,
          is_active: true,
          password: changeAdminPasswordForm.password,
        },
        {
          headers: { Authorization: "Bearer " + token },
        }
      );
      navigate(`/admin/admins`, { state: { status: "success" } });
    } catch (e) {
      console.log(e); // Remove later
      if (e.response) {
        if (e.response.status === 401) {
          RemoveToken();
        } else {
          navigate(`/admin/admins/${admin.username}`, {
            state: { status: "failed" },
          });
        }
      } else {
        console.log(e); // Send error to BE?
      }
    }
  };

  if (!admin.isActive) {
    return (
      <div>
        <Container>
          <Heading subtitle>Change Admin Password</Heading>
          <p>
            Admin is currently disabled. Enable to allow password to be changed.
          </p>
        </Container>
      </div>
    );
  }

  return (
    <div>
      <Container>
        <Heading subtitle>Change Admin Password</Heading>
        <Form.Field>
          <Form.Label>Enter A New Password</Form.Label>
          <Form.Control>
            <Form.Input
              name="password"
              type="password"
              value={changeAdminPasswordForm.password}
              onChange={updateChangeAdminPasswordForm}
            />
          </Form.Control>
        </Form.Field>
        <Form.Field>
          <Form.Control>
            <Button type="primary" onClick={onChangeAdminPasswordClicked}>
              Update Password
            </Button>
          </Form.Control>
        </Form.Field>
      </Container>
    </div>
  );
}

export default Admin;
