import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "bulma/css/bulma.min.css";
import {
  Box,
  Button,
  Columns,
  Container,
  Form,
  Heading,
  Section,
  Table,
} from "react-bulma-components";
import useToken from "../auth/UseToken";
import AdminNav from "../components/AdminNav";
import RemoveToken from "../auth/RemoveToken";
import StatusNotification from "../components/StatusNotification";

function AdminSystem() {
  const [token] = useToken();
  let navigate = useNavigate();

  // Existing industries & locations
  const [industryList, setIndustryList] = useState({ industries: [] });
  const [locationList, setLocationList] = useState({ locations: [] });

  useEffect(() => {
    async function getIndustries() {
      try {
        const { data: industries } = await axios.get("/api/industries");
        if (industries) {
          setIndustryList({ industries });
        }
      } catch (e) {
        console.log(e); // Send error to BE?
      }
    }

    async function getLocations() {
      try {
        const { data: locations } = await axios.get("/api/locations");
        if (locations) {
          setLocationList({ locations });
        }
      } catch (e) {
        console.log(e); // Send error to BE?
      }
    }

    getLocations();
    getIndustries();
  }, []);

  // New Industry
  const [newIndustryForm, setNewIndustryForm] = useState({ displayName: "" });
  const updateNewIndustryForm = ({ target }) =>
    setNewIndustryForm({ ...newIndustryForm, [target.name]: target.value });

  const onCreateNewIndustryClicked = async () => {
    try {
      const response = await axios.post(
        "/api/industry",
        {
          display_name: newIndustryForm.displayName,
        },
        {
          headers: { Authorization: "Bearer " + token },
        }
      );
      navigate(`/admin/system/industry/${response.data.name}`, {
        state: { status: "success" },
      });
    } catch (e) {
      console.log(e); // Remove later
      if (e.response) {
        if (e.response.status === 401) {
          RemoveToken();
        } else {
          navigate("/admin/system", { state: { status: "failed" } });
        }
      } else {
        console.log(e); // Send error to BE?
      }
    }
  };

  // New Location
  const [newLocationForm, setNewLocationForm] = useState({ displayName: "" });
  const updateNewLocationForm = ({ target }) =>
    setNewLocationForm({ ...newLocationForm, [target.name]: target.value });

  const onCreateNewLocationClicked = async () => {
    try {
      const response = await axios.post(
        "/api/location",
        {
          display_name: newLocationForm.displayName,
        },
        {
          headers: { Authorization: "Bearer " + token },
        }
      );
      navigate(`/admin/system/location/${response.data.name}`, {
        state: { status: "success" },
      });
    } catch (e) {
      console.log(e); // Remove later
      if (e.response) {
        if (e.response.status === 401) {
          RemoveToken();
        } else {
          navigate("/admin/system", { state: { status: "failed" } });
        }
      } else {
        console.log(e); // Send error to BE?
      }
    }
  };

  return (
    <div>
      <AdminNav />
      <StatusNotification />
      <Section>
        <Columns>
          <Columns.Column>
            <Section>
              <Heading>Industries</Heading>
              <Container>
                <Box>
                  <Heading subtitle>Create New Industry</Heading>
                  <Form.Field>
                    <Form.Label>Industry Name</Form.Label>
                    <Form.Control>
                      <Form.Input
                        name="displayName"
                        type="text"
                        value={newIndustryForm.displayName}
                        onChange={updateNewIndustryForm}
                      />
                    </Form.Control>
                  </Form.Field>
                  <Form.Field>
                    <Form.Control>
                      <Button
                        type="primary"
                        onClick={onCreateNewIndustryClicked}
                      >
                        Create New Industry
                      </Button>
                    </Form.Control>
                  </Form.Field>
                </Box>
              </Container>
            </Section>

            <Section>
              <Container>
                <Box>
                  <Heading subtitle>Existing Industries</Heading>
                  <Table>
                    <tbody>
                      {industryList.industries.map(industry => {
                        return (
                          <tr>
                            <td>{industry.display_name}</td>
                            <td>
                              <Button
                                renderAs="a"
                                href={"/admin/system/industry/" + industry.name}
                              >
                                Edit
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
          </Columns.Column>

          <Columns.Column>
            <Section>
              <Heading>Locations</Heading>
              <Container>
                <Box>
                  <Heading subtitle>Create New Location</Heading>
                  <Form.Field>
                    <Form.Label>Location Name</Form.Label>
                    <Form.Control>
                      <Form.Input
                        name="displayName"
                        type="text"
                        value={newLocationForm.displayName}
                        onChange={updateNewLocationForm}
                      />
                    </Form.Control>
                  </Form.Field>
                  <Form.Field>
                    <Form.Control>
                      <Button
                        type="primary"
                        onClick={onCreateNewLocationClicked}
                      >
                        Create New Location
                      </Button>
                    </Form.Control>
                  </Form.Field>
                </Box>
              </Container>
            </Section>

            <Section>
              <Container>
                <Box>
                  <Heading subtitle>Existing Locations</Heading>
                  <Table>
                    <tbody>
                      {locationList.locations.map(location => {
                        return (
                          <tr>
                            <td>{location.display_name}</td>
                            <td>
                              <Button
                                renderAs="a"
                                href={"/admin/system/location/" + location.name}
                              >
                                Edit
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
          </Columns.Column>
        </Columns>
      </Section>
    </div>
  );
}

export default AdminSystem;
