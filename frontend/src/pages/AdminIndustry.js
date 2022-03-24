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

  // Existing industry
  const [updateIndustryForm, setUpdateIndustryForm] = useState({ displayName: '', name: '' });
  const updateUpdateIndustryForm = (({ target }) => setUpdateIndustryForm({ ...updateIndustryForm, [target.name]: target.value }));

  // Populate initial form
  useEffect(() => {
    async function getIndustry() {
      try {
        const { data: industry } = await axios.get(`/api/industry/${id}`);
        if (industry) {
          setUpdateIndustryForm({ industry })
        }
      } catch (e) {
        console.log(e)
      }
    }

    getIndustry()
  }, [id]);

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
      console.log(response)
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
              <Form.Label>Industry Name (As displayed)</Form.Label>
              <Form.Control>
                <Form.Input name="displayName" type="text" value={updateIndustryForm.displayName} onChange={updateUpdateIndustryForm} />
              </Form.Control>
            </Form.Field>
            <Form.Field hidden>
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

export default AdminIndustry;