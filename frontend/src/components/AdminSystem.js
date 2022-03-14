import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import 'bulma/css/bulma.min.css';
import { Button, Columns, Container, Form, Heading, Section } from 'react-bulma-components';
import useToken from '../auth/UseToken';

function AdminSystem () {
  const [token, ] = useToken();
  let navigate = useNavigate();

  const [locationForm, setLocationForm] = useState({ displayName: '', name: '' });
  const updateLocationForm = (({ target }) => setLocationForm({ ...locationForm, [target.name]: target.value }));

  const onNewLocationClicked = async () => {
    try {
      const response = await axios.post('/api/location', {
        display_name: locationForm.displayName,
        name: locationForm.name,
      }, {
      headers: {'Authorization': 'Bearer ' + token}
      });
      navigate('/admin#location?status=success');
      console.log(response)
    } catch (e) {
      if (e.response) {
        navigate('/admin#location?status=failed');
      } else {
        console.log(e)
      }
    }
  }

  const onUpdateLocationClicked = async () => {
    try {
      const response = await axios.put('/api/location', {
        display_name: locationForm.displayName,
        name: locationForm.name,
      }, {
      headers: {'Authorization': 'Bearer ' + token}
      });
      navigate('/admin#system?status=success');
      console.log(response)
    } catch (e) {
      if (e.response) {
        navigate('/admin#system?status=failed');
      } else {
        console.log(e)
      }
    }
  }



  const [industryForm, setIndustryForm] = useState({ displayName: '', name: '' });
  const updateIndustryForm = (({ target }) => setIndustryForm({ ...industryForm, [target.name]: target.value }));

  const [industryList, setIndustryList] = useState({ industries: [] });
    
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

    getIndustries()
  }, []);

  const onNewIndustryClicked = async () => {
    try {
      const response = await axios.post('/api/industry', {
        display_name: industryForm.displayName,
        name: industryForm.name,
      }, {
      headers: {'Authorization': 'Bearer ' + token}
      });
      navigate('/admin#industry?status=success');
      console.log(response)
    } catch (e) {
      if (e.response) {
        navigate('/admin#industry?status=failed');
      } else {
        console.log(e)
      }
    }
  }

  const onUpdateIndustryClicked = async () => {
    try {
      const response = await axios.put('/api/industry', {
        display_name: industryForm.displayName,
        name: industryForm.name,
      }, {
      headers: {'Authorization': 'Bearer ' + token}
      });
      navigate('/admin#industry?status=success');
      console.log(response)
    } catch (e) {
      if (e.response) {
        navigate('/admin#industry?status=failed');
      } else {
        console.log(e)
      }
    }
  }

  return (
    <Section id="system">
      <Section id="locations">
        <Container>
        <Heading>Locations</Heading>
          <div>
            <Form.Field>
              <Form.Label>Location Name (As displayed)</Form.Label>
              <Form.Control>
                <Form.Input name="displayName" type="text" value={locationForm.displayName} onChange={updateLocationForm} />
              </Form.Control>
            </Form.Field>
            <Form.Field>
              <Form.Label>Database Key</Form.Label>
              <Form.Control>
                <Form.Input name="name" type="text" value={locationForm.name} onChange={updateLocationForm} />
              </Form.Control>
            </Form.Field>


            <Form.Field>
              <Form.Control>
                <Button type="primary" onClick={onNewLocationClicked}>Create New Location</Button>
              </Form.Control>
            </Form.Field>
            <Form.Field>
              <Form.Control>
                <Button type="primary" onClick={onUpdateLocationClicked}>Update Location</Button>
              </Form.Control>
            </Form.Field>
          </div>
        </Container>
      </Section>
      <Section id="industry">
        <Container>
          <Heading>Industries</Heading>
          <Columns>
            <Columns.Column>
              <div>
                <Form.Field>
                <Form.Label>Create New Industry</Form.Label>
                  <Form.Label>Industry Name (As displayed)</Form.Label>
                  <Form.Control>
                    <Form.Input name="displayName" type="text" value={industryForm.displayName} onChange={updateIndustryForm} />
                  </Form.Control>
                </Form.Field>
                <Form.Field>
                  <Form.Label>Database Key</Form.Label>
                  <Form.Control>
                    <Form.Input name="name" type="text" value={industryForm.name} onChange={updateIndustryForm} />
                  </Form.Control>
                </Form.Field>

                <Form.Field>
                  <Form.Control>
                    <Button type="primary" onClick={onNewIndustryClicked}>Create New Industry</Button>
                  </Form.Control>
                </Form.Field>
              </div>
            </Columns.Column>
            <Columns.Column>
              <div>
              <Form.Field>
                  <Form.Label>Edit Existing Industry</Form.Label>
                  <Form.Control>
                    <Form.Select name="displayName" onChange={updateIndustryForm}>
                      {industryList.industries.map((industry) => (
                        <Form.Option value={industry.name}>
                          {industry.displayName}
                        </Form.Option>
                      ))}
                    </Form.Select>
                  </Form.Control>
                </Form.Field>
                <Form.Field>
                  <Form.Label>Industry Name (As displayed)</Form.Label>
                  <Form.Control>
                    <Form.Input name="displayName" type="text" value={industryForm.displayName} onChange={updateIndustryForm} />
                  </Form.Control>
                </Form.Field>
                <Form.Field>
                  <Form.Label>Database Key</Form.Label>
                  <Form.Control>
                    <Form.Input name="name" type="text" value={industryForm.name} disabled />
                  </Form.Control>
                </Form.Field>

                <Form.Field>
                  <Form.Control>
                    <Button type="primary" onClick={onUpdateIndustryClicked}>Update Industry</Button>
                  </Form.Control>
                </Form.Field>
              </div>
            </Columns.Column>
          </Columns>
        </Container>
      </Section>
    </Section>
  );
}

export default AdminSystem;