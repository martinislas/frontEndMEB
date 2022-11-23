import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "bulma/css/bulma.min.css";
import {
  Box,
  Button,
  Container,
  Form,
  Heading,
  Section,
} from "react-bulma-components";
import useToken from "../auth/UseToken";
import AdminNav from "../components/AdminNav";
import RemoveToken from "../auth/RemoveToken";
import StatusNotification from "../components/StatusNotification";

function AdminLocation() {
  const { id } = useParams();

  return (
    <div>
      <AdminNav />
      <StatusNotification />
      <Container>
        <Section>
          <Heading>Edit Existing Location</Heading>
          <GetCurrentLocation id={id} />
        </Section>
      </Container>
    </div>
  );
}

function GetCurrentLocation({ id }) {
  const [currentLocation, setCurrentLocation] = useState({
    name: "",
    displayName: "",
  });

  useEffect(() => {
    async function getLocation() {
      try {
        const response = await axios.get(`/api/location/${id}`);
        if (response) {
          setCurrentLocation({
            name: response.data.name,
            displayName: response.data.display_name,
          });
        }
      } catch (e) {
        console.log(e); // Send error to BE?
      }
    }

    getLocation();
  }, [id]);

  if (currentLocation.name === "") {
    return <div>Loading...</div>;
  }
  return <UpdateCurrentLocation location={currentLocation} />;
}

function UpdateCurrentLocation({ location }) {
  const [token] = useToken();

  let navigate = useNavigate();

  // Existing location
  const [updateLocationForm, setUpdateLocationForm] = useState({
    displayName: location.displayName,
  });
  const updateLocationFormDisplayNameField = event =>
    setUpdateLocationForm({ displayName: event.target.value });

  // Update Location
  const onUpdateLocationClicked = async () => {
    try {
      await axios.put(
        "/api/location",
        {
          display_name: updateLocationForm.displayName,
          name: location.name,
        },
        {
          headers: { Authorization: "Bearer " + token },
        }
      );
      navigate(`/admin/system`, { state: { status: "success" } });
    } catch (e) {
      console.log(e); // Remove later
      if (e.response) {
        if (e.response.status === 401) {
          RemoveToken();
        } else {
          navigate(`/admin/system/location/${location.name}`, {
            state: { status: "failed" },
          });
        }
      } else {
        console.log(e); // Send error to BE?
      }
    }
  };

  return (
    <Container>
      <Box>
        <Form.Field>
          <Form.Label>Update Location Name</Form.Label>
          <Form.Control>
            <Form.Input
              name="displayName"
              type="text"
              value={updateLocationForm.displayName}
              onChange={updateLocationFormDisplayNameField}
            />
          </Form.Control>
        </Form.Field>
        <Form.Field>
          <Form.Control>
            <Button type="primary" onClick={onUpdateLocationClicked}>
              Update Location
            </Button>
          </Form.Control>
        </Form.Field>
      </Box>
    </Container>
  );
}

export default AdminLocation;
