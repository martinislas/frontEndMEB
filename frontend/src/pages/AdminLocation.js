import { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';
import 'bulma/css/bulma.min.css';
import { Button, Container, Form, Heading, Section } from 'react-bulma-components';
import useToken from '../auth/UseToken';
import AdminNav from '../components/AdminNav';

function AdminLocation () {
  const [token, ] = useToken();
  const {id} = useParams();
  let navigate = useNavigate();

  // Existing location
  const [updateLocationForm, setUpdateLocationForm] = useState({ name: id, displayName: '' });
  const updateLocationFormDisplayNameField = ((event) => setUpdateLocationForm({ name: id, displayName: event.target.value }));

  // Update Location
  const onUpdateLocationClicked = async () => {
    try {
      const response = await axios.put('/api/location', {
        display_name: updateLocationForm.displayName,
        name: updateLocationForm.name,
      }, {
      headers: {'Authorization': 'Bearer ' + token}
      });
      navigate(`/admin/system/location/${response.data.name}?status=success`);
    } catch (e) {
      if (e.response) {
        navigate(`/admin/system/location/${id}?status=failed`);
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
          <Heading>Edit Existing Location</Heading>
          <Container>
            <Form.Field>
              <GetCurrentLocation id={id} />
              <Form.Label>Updated Location Name</Form.Label>
              <Form.Control>
                <Form.Input name="displayName" type="text" value={updateLocationForm.displayName} onChange={updateLocationFormDisplayNameField} />
              </Form.Control>
            </Form.Field>
            <Form.Field hidden>
              <Form.Control>
                <Form.Input name="name" type="text" value={updateLocationForm.name} />
              </Form.Control>
            </Form.Field>
            <Form.Field>
              <Form.Control>
                <Button type="primary" onClick={onUpdateLocationClicked}>Update Location</Button>
              </Form.Control>
            </Form.Field>
          </Container>
        </Section>
      </Container>
    </div>
  );
}

function GetCurrentLocation({ id }) {
  const [currentLocation, setCurrentLocation] = useState({displayName: ''})

  useEffect(() => {
    async function getLocation() {
      try {
        const response = await axios.get(`/api/location/${id}`);
        if (response) {
          setCurrentLocation({ displayName: response.data.display_name })
        }
      } catch (e) {
        console.log(e)
      }
    }

    getLocation()
  }, [id]);

  if (currentLocation.displayName === '') {
    return (<Form.Label>Current Location Name: Loading...</Form.Label>);
  } 
  return (<Form.Label>Current Location Name: {currentLocation.displayName}</Form.Label>);
}

export default AdminLocation;