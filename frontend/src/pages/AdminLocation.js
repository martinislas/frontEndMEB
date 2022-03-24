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
  const [updateLocationForm, setUpdateLocationForm] = useState({ displayName: '', name: '' });
  const updateUpdateLocationForm = (({ target }) => setUpdateLocationForm({ ...updateLocationForm, [target.name]: target.value }));

  // Populate initial form
  useEffect(() => {
    async function getLocation() {
      try {
        const { data: location } = await axios.get(`/api/location/${id}`);
        if (location) {
          setUpdateLocationForm(updateLocationForm => ({...updateLocationForm, [location.fieldName] : location.value }))
        }
      } catch (e) {
        console.log(e)
      }
    }

    getLocation()
  }, [id]);

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
      console.log(response)
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
              <Form.Label>Location Name (As displayed)</Form.Label>
              <Form.Control>
                <Form.Input name="displayName" type="text" value={updateLocationForm.displayName} onChange={updateUpdateLocationForm} />
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

export default AdminLocation;