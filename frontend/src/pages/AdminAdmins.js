import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import 'bulma/css/bulma.min.css';
import { Button, Columns, Container, Form, Heading, Section, Table } from 'react-bulma-components';
import useToken from '../auth/UseToken';
import AdminNav from '../components/AdminNav';

function Admins () {
  const [token, ] = useToken();
  let navigate = useNavigate();

  // Existing industries & locations
  const [industryList, setIndustryList] = useState({industries: [] });
  const [locationList, setLocationList] = useState({locations: [] });

  useEffect(() => {
    async function getIndustries() {
      try {
        const { data: industries } = await axios.get('/api/industries');
        if (industries) {
          setIndustryList({ industries })
        }
      } catch (e) {
        console.log(e)
      }
    }

    async function getLocations() {
      try {
        const { data: locations } = await axios.get('/api/locations');
        if (locations) {
          setLocationList({ locations })
        }
      } catch (e) {
        console.log(e)
      }
    }

    getLocations()
    getIndustries()
  }, []);

  // New Industry
  const [newIndustryForm, setNewIndustryForm] = useState({ displayName: '' });
  const updateNewIndustryForm = (({ target }) => setNewIndustryForm({ ...newIndustryForm, [target.name]: target.value }));

  const onCreateNewIndustryClicked = async () => {
    try {
      const response = await axios.post('/api/industry', {
        display_name: newIndustryForm.displayName,
      }, {
      headers: {'Authorization': 'Bearer ' + token}
      });
      navigate(`/admin/system/industry/${response.data.name}?status=success`);
      console.log(response)
    } catch (e) {
      if (e.response) {
        navigate('/admin/system?status=failed');
      } else {
        console.log(e)
      }
    }
  }

  // New Location
  const [newLocationForm, setNewLocationForm] = useState({ displayName: '' });
  const updateNewLocationForm = (({ target }) => setNewLocationForm({ ...newLocationForm, [target.name]: target.value }));

  const onCreateNewLocationClicked = async () => {
    try {
      const response = await axios.post('/api/location', {
        display_name: newLocationForm.displayName,
      }, {
      headers: {'Authorization': 'Bearer ' + token}
      });
      navigate(`/admin/system/location/${response.data.name}?status=success`);
      console.log(response)
    } catch (e) {
      if (e.response) {
        navigate('/admin/system?status=failed');
      } else {
        console.log(e)
      }
    }
  }

  return (
    <div>
      <AdminNav />
      <Section>
        <Columns>
          <Columns.Column>
            <Section>
              <Heading>Industries</Heading>
              <Container>
                <Heading subtitle>Create New Industry</Heading>
                <Form.Field>
                  <Form.Label>Industry Name (As displayed)</Form.Label>
                  <Form.Control>
                    <Form.Input name="displayName" type="text" value={newIndustryForm.displayName} onChange={updateNewIndustryForm} />
                  </Form.Control>
                </Form.Field>
                <Form.Field>
                  <Form.Control>
                    <Button type="primary" onClick={onCreateNewIndustryClicked}>Create New Industry</Button>
                  </Form.Control>
                </Form.Field>
              </Container>
            </Section>

            <Section>
              <Container>
              <Heading subtitle>Existing Industries</Heading>
                <Table>
                  <tbody>
                    {industryList.industries.map((industry) => {
                      return (
                        <tr>
                          <td>{industry.display_name}</td>
                          <td>
                            <Button renderAs="a" href={'admin/system/industry/'+industry.name}>Edit</Button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </Container>
            </Section>
          </Columns.Column>


          <Columns.Column>
            <Section>
              <Heading>Locations</Heading>
              <Container>
                <Heading subtitle>Create New Location</Heading>
                <Form.Field>
                  <Form.Label>Location Name (As displayed)</Form.Label>
                  <Form.Control>
                    <Form.Input name="displayName" type="text" value={newLocationForm.displayName} onChange={updateNewLocationForm} />
                  </Form.Control>
                </Form.Field>
                <Form.Field>
                  <Form.Control>
                    <Button type="primary" onClick={onCreateNewLocationClicked}>Create New Location</Button>
                  </Form.Control>
                </Form.Field>
              </Container>
            </Section>

            <Section>
              <Container>
              <Heading subtitle>Existing Locations</Heading>
                <Table>
                  <tbody>
                    {locationList.locations.map((location) => {
                      return (
                        <tr>
                          <td>{location.display_name}</td>
                          <td>
                            <Button renderAs="a" href={'admin/system/location/'+location.name}>Edit</Button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </Container>
            </Section>
          </Columns.Column>
        </Columns>
      </Section>
    </div>
  );
}

export default Admins;