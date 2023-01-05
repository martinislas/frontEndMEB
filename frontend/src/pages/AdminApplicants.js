import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "bulma/css/bulma.min.css";
import {
  Box,
  Button,
  Container,
  Form,
  Heading,
  Section,
  Table,
} from "react-bulma-components";
import useToken from "../auth/UseToken";
import AdminNav from "../components/AdminNav";

function AdminApplicants() {
  const [token] = useToken();
  let navigate = useNavigate();

  // Existing applicants
  const [applicantList, setApplicantList] = useState({ applicants: [] });

  useEffect(() => {
    async function getApplicants() {
      try {
        const { data: applicants } = await axios.get("/api/admins/applicants", {
          headers: { Authorization: "Bearer " + token },
        });
        if (applicants) {
          setApplicantList({ applicants });
        }
      } catch (e) {
        console.log(e);
      }
    }

    getApplicants();
  }, [token]);

  // New Applicant
  const [newApplicantForm, setNewApplicantForm] = useState({
    first_name: "",
    middle_name: "",
    last_name: "",
    email: "",
    phone: "",
    address_street: "",
    address_city: "",
    address_zip: "",
    address_state: "",
  });
  const updateNewApplicantForm = ({ target }) =>
    setNewApplicantForm({ ...newApplicantForm, [target.name]: target.value });

  const onCreateNewApplicantClicked = async () => {
    try {
      const response = await axios.post(
        "/api/applicant/new",
        {
          first_name: newApplicantForm.first_name,
          middle_name: newApplicantForm.middle_name,
          last_name: newApplicantForm.last_name,
          email: newApplicantForm.email,
          phone: newApplicantForm.phone,
          address_street: newApplicantForm.address_street,
          address_city: newApplicantForm.address_city,
          address_zip: newApplicantForm.address_zip,
          address_state: newApplicantForm.address_state,
          reset_password: true,
        },
        {
          headers: { Authorization: "Bearer " + token },
        }
      );
      navigate(`/admin/applicants/${response.data.id}?status=success`);
      console.log(response);
    } catch (e) {
      if (e.response) {
        navigate("/admin/applicants?status=failed");
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
          <Heading>Applicants</Heading>
          <Container>
            <Box>
              <Heading subtitle>Create New Applicant Posting</Heading>
              <Form.Field kind="group">
                <Form.Field>
                  <Form.Label>First Name</Form.Label>
                  <Form.Control>
                    <Form.Input
                      name="first_name"
                      type="text"
                      value={newApplicantForm.first_name}
                      onChange={updateNewApplicantForm}
                    />
                  </Form.Control>
                </Form.Field>
                <Form.Field>
                  <Form.Label>Middle Name</Form.Label>
                  <Form.Control>
                    <Form.Input
                      name="middle_name"
                      type="text"
                      value={newApplicantForm.middle_name}
                      onChange={updateNewApplicantForm}
                    />
                  </Form.Control>
                </Form.Field>
                <Form.Field>
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control>
                    <Form.Input
                      name="last_name"
                      type="text"
                      value={newApplicantForm.last_name}
                      onChange={updateNewApplicantForm}
                    />
                  </Form.Control>
                </Form.Field>
              </Form.Field>
              <Form.Field kind="group">
                <Form.Field>
                  <Form.Label>Email</Form.Label>
                  <Form.Control>
                    <Form.Input
                      name="email"
                      type="text"
                      value={newApplicantForm.email}
                      onChange={updateNewApplicantForm}
                    />
                  </Form.Control>
                </Form.Field>
                <Form.Field>
                  <Form.Label>Phone</Form.Label>
                  <Form.Control>
                    <Form.Input
                      name="phone"
                      type="text"
                      value={newApplicantForm.phone}
                      onChange={updateNewApplicantForm}
                    />
                  </Form.Control>
                </Form.Field>
              </Form.Field>
              <Form.Field>
                <Form.Label>Street</Form.Label>
                <Form.Control>
                  <Form.Input
                    name="address_street"
                    type="text"
                    value={newApplicantForm.address_street}
                    onChange={updateNewApplicantForm}
                  />
                </Form.Control>
              </Form.Field>
              <Form.Field>
                <Form.Label>City</Form.Label>
                <Form.Control>
                  <Form.Input
                    name="address_city"
                    type="text"
                    value={newApplicantForm.address_city}
                    onChange={updateNewApplicantForm}
                  />
                </Form.Control>
              </Form.Field>
              <Form.Field>
                <Form.Label>Zip Code</Form.Label>
                <Form.Control>
                  <Form.Input
                    name="address_zip"
                    type="text"
                    value={newApplicantForm.address_zip}
                    onChange={updateNewApplicantForm}
                  />
                </Form.Control>
              </Form.Field>
              <Form.Field>
                <Form.Label>State</Form.Label>
                <Form.Control>
                  <Form.Input
                    name="address_state"
                    type="text"
                    value={newApplicantForm.address_state}
                    onChange={updateNewApplicantForm}
                  />
                </Form.Control>
              </Form.Field>
              <Form.Field>
                <Form.Control>
                  <Button type="primary" onClick={onCreateNewApplicantClicked}>
                    Submit
                  </Button>
                </Form.Control>
              </Form.Field>
            </Box>
          </Container>
        </Section>

        <Section>
          <Container>
            <Box>
              <Heading subtitle>Existing Applicants</Heading>
              <Table size="fullwidth">
                <thead>
                  <tr>
                    <th>First Name</th>
                    <th>Middle Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Options</th>
                  </tr>
                </thead>
                <tbody>
                  {applicantList.applicants.map(applicant => {
                    return (
                      <tr>
                        <td>{applicant.first_name}</td>
                        <td>{applicant.middle_name}</td>
                        <td>{applicant.last_name}</td>
                        <td>{applicant.email}</td>
                        <td>{applicant.phone}</td>
                        <td>
                          <Button
                            renderAs="a"
                            href={"/admin/applicants/" + applicant.id}
                          >
                            View
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </Box>
          </Container>
        </Section>
      </Container>
    </div>
  );
}

export default AdminApplicants;
