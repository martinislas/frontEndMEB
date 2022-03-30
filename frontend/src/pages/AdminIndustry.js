import { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';
import 'bulma/css/bulma.min.css';
import { Button, Container, Form, Heading, Section } from 'react-bulma-components';
import useToken from '../auth/UseToken';
import AdminNav from '../components/AdminNav';

function AdminIndustry () {
  const [token, ] = useToken();
  const {id} = useParams();
  let navigate = useNavigate();

  // Edit industry form
  const [updateIndustryForm, setUpdateIndustryForm] = useState({name: id, displayName: ''});
  const updateIndustryFormDisplayNameField = ((event) => setUpdateIndustryForm({ name: id, displayName: event.target.value }));

  // Update Industry
  const onUpdateIndustryClicked = async () => {
    try {
      const response = await axios.put('/api/industry', {
        display_name: updateIndustryForm.displayName,
        name: updateIndustryForm.name,
      }, {
      headers: {'Authorization': 'Bearer ' + token}
      });
      navigate(`/admin/system/industry/${response.data.name}?status=success`);
    } catch (e) {
      if (e.response) {
        navigate(`/admin/system/industry/${id}?status=failed`);
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
          <Heading>Edit Existing Industry</Heading>
          <Container>
            <Form.Field>
              <GetCurrentIndustry id={id} />
              <Form.Label>Updated Industry Name</Form.Label>
              <Form.Control>
                <Form.Input name="displayName" type="text" value={updateIndustryForm.displayName} onChange={updateIndustryFormDisplayNameField} />
              </Form.Control>
            </Form.Field>
            <Form.Field>
              <Form.Control>
                <Form.Input name="name" type="text" value={updateIndustryForm.name} />
              </Form.Control>
            </Form.Field>
            <Form.Field>
              <Form.Control>
                <Button type="primary" onClick={onUpdateIndustryClicked}>Update Industry</Button>
              </Form.Control>
            </Form.Field>
          </Container>
        </Section>
      </Container>
    </div>
  );
}

function GetCurrentIndustry({ id }) {
  const [currentIndustry, setCurrentIndustry] = useState({displayName: ''})

  // Populate initial form
  useEffect(() => {
    function getIndustry(id) {
      try {
        console.log(id)
        const response = axios.get(`/api/industry/${id}`);
        if (response) {
          setCurrentIndustry({ displayName: response.data.displayName })
        }
      } catch (e) {
        console.log(e)
      }
    }

    getIndustry(id)
  }, [id]);

  if (currentIndustry.displayName === '') {
    return (<Form.Label>Current Industry Name: Loading...</Form.Label>)
  } 
  return (<Form.Label>Current Industry Name: {currentIndustry.displayName}</Form.Label>)
}

export default AdminIndustry;