import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "bulma/css/bulma.min.css";
import {
  Button,
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

function Admins() {
  const [token] = useToken();
  let navigate = useNavigate();

  // Existing admins
  const [adminList, setAdminList] = useState({ admins: [] });

  useEffect(() => {
    async function getAdmins() {
      try {
        const { data: admins } = await axios.get("/api/admins", {
          headers: { Authorization: "Bearer " + token },
        });
        if (admins) {
          setAdminList({ admins });
        }
      } catch (e) {
        console.log(e);
        if (e.response.status === 401) {
          RemoveToken();
        }
      }
    }

    getAdmins();
  }, [token]);

  // New Admin
  const [newAdminForm, setNewAdminForm] = useState({
    first_name: "",
    surname: "",
    username: "",
    password: "",
  });
  const updateNewAdminForm = ({ target }) =>
    setNewAdminForm({ ...newAdminForm, [target.name]: target.value });

  const onCreateNewAdminClicked = async () => {
    try {
      const response = await axios.post(
        "/api/admin",
        {
          first_name: newAdminForm.first_name,
          surname: newAdminForm.surname,
          username: newAdminForm.username,
          password: newAdminForm.password,
        },
        {
          headers: { Authorization: "Bearer " + token },
        }
      );
      navigate(`/admin/admins?status=success`);
      console.log(response);
    } catch (e) {
      if (e.response.status === 401) {
        RemoveToken();
      } else if (e.response) {
        navigate("/admin/admins?status=failed");
      } else {
        console.log(e);
      }
    }
  };

  return (
    <div>
      <AdminNav />
      <Container>
        <Section>
          <Heading>Admins</Heading>
          <Container>
            <Heading subtitle>Create New Admin User</Heading>
            <Form.Field>
              <Form.Label>First Name</Form.Label>
              <Form.Control>
                <Form.Input
                  name="first_name"
                  type="text"
                  value={newAdminForm.first_name}
                  onChange={updateNewAdminForm}
                />
              </Form.Control>
            </Form.Field>
            <Form.Field>
              <Form.Label>Last Name</Form.Label>
              <Form.Control>
                <Form.Input
                  name="surname"
                  type="text"
                  value={newAdminForm.surname}
                  onChange={updateNewAdminForm}
                />
              </Form.Control>
            </Form.Field>
            <Form.Field>
              <Form.Label>Username</Form.Label>
              <Form.Control>
                <Form.Input
                  name="username"
                  type="text"
                  value={newAdminForm.username}
                  onChange={updateNewAdminForm}
                />
              </Form.Control>
            </Form.Field>
            <Form.Field>
              <Form.Label>Password</Form.Label>
              <Form.Control>
                <Form.Input
                  name="password"
                  type="password"
                  value={newAdminForm.password}
                  onChange={updateNewAdminForm}
                />
              </Form.Control>
            </Form.Field>
            <Form.Field>
              <Form.Control>
                <Button type="primary" onClick={onCreateNewAdminClicked}>
                  Submit
                </Button>
              </Form.Control>
            </Form.Field>
          </Container>
        </Section>

        <Section>
          <Container>
            <Heading subtitle>Existing Admins</Heading>
            <Table size="fullwidth">
              <thead>
                <tr>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Username</th>
                  <th>User Status</th>
                  <th>Current User</th>
                  <th>Options</th>
                </tr>
              </thead>
              <tbody>
                {adminList.admins.map(admin => {
                  return (
                    <tr>
                      <td>{admin.first_name}</td>
                      <td>{admin.surname}</td>
                      <td>{admin.username}</td>
                      <td>
                        {admin.is_active ? (
                          <Icon align="center">
                            <FontAwesomeIcon icon={faCheck} />
                          </Icon>
                        ) : (
                          <Icon align="center">
                            <FontAwesomeIcon icon={faXmark} />
                          </Icon>
                        )}
                      </td>
                      <td>
                        {admin.is_current && (
                          <Icon align="center">
                            <FontAwesomeIcon icon={faCheck} />
                          </Icon>
                        )}
                      </td>
                      <td>
                        <Button
                          renderAs="a"
                          href={"/admin/admins/" + admin.username}
                        >
                          Manage
                        </Button>
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
