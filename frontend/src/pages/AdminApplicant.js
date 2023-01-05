import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "bulma/css/bulma.min.css";
import {
  Box,
  Button,
  Container,
  Form,
  Heading,
  Icon,
  Section,
} from "react-bulma-components";
import useToken from "../auth/UseToken";
import AdminNav from "../components/AdminNav";
import RemoveToken from "../auth/RemoveToken";
import GetJobsAsAdmin from "../components/GetJobAsAdmin";
import StatusNotification from "../components/StatusNotification";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

function AdminApplicant() {
  const { id } = useParams();

  return (
    <div>
      <AdminNav />
      <StatusNotification />
      <Container>
        <Section>
          <Heading>Manage Applicant</Heading>
          <GetCurrentApplicant id={id} />
        </Section>
      </Container>
    </div>
  );
}

function GetCurrentApplicant({ id }) {
  const [token] = useToken();

  // Get the applicant by ID
  const [currentApplicant, setCurrentApplicant] = useState({
    id: "",
    first_name: "",
    middle_name: "",
    last_name: "",
    email: "",
    phone: "",
    address_street: "",
    address_city: "",
    address_zip: "",
    address_state: "",
    job_keys: [],
    job_count: 0,
  });

  useEffect(() => {
    async function getApplicant() {
      try {
        const response = await axios.get(`/api/admins/applicant/${id}`, {
          headers: { Authorization: "Bearer " + token },
        });
        if (response) {
          setCurrentApplicant({
            id: response.data.id,
            first_name: response.data.first_name,
            middle_name: response.data.middle_name,
            last_name: response.data.last_name,
            email: response.data.email,
            phone: response.data.phone,
            address_street: response.data.address_street,
            address_city: response.data.address_city,
            address_zip: response.data.address_zip,
            address_state: response.data.address_state,
            job_keys: response.data.job_keys,
            job_count: response.data.job_count,
          });
        }
      } catch (e) {
        console.log(e); // Remove later
        if (e.response) {
          if (e.response.status === 401) {
            RemoveToken();
          }
        } else {
          console.log(e); // Send error to BE?
        }
      }
    }

    getApplicant();
  }, [id, token]);

  if (currentApplicant.id === "") {
    return (
      <div>
        <Section>
          <Container>
            <Box>
              <p>
                <Icon align="center">
                  <FontAwesomeIcon icon={faSpinner} className={"fa-spin"} />
                </Icon>
                Fetching applicant details...
              </p>
            </Box>
          </Container>
        </Section>
      </div>
    );
  }
  return (
    <div>
      <Section>
        <EditCurrentApplicant job={currentApplicant} />
      </Section>
      <Section>
        <GetCurrentApplicantJobs job={currentApplicant} />
      </Section>
    </div>
  );
}

function EditCurrentApplicant({ applicant }) {
  const [token] = useToken();

  let navigate = useNavigate();

  // Edit Applicant Form
  const [updateApplicantForm, setUpdateApplicantForm] = useState({
    first_name: applicant.first_name,
    middle_name: applicant.middle_name,
    last_name: applicant.last_name,
    email: applicant.email,
    phone: applicant.phone,
    address_street: applicant.address_street,
    address_city: applicant.address_city,
    address_zip: applicant.address_zip,
    address_state: applicant.address_state,
  });
  const updateUpdateApplicantForm = ({ target }) =>
    setUpdateApplicantForm({
      ...updateApplicantForm,
      [target.name]: target.value,
    });

  const onUpdateApplicantClicked = async () => {
    try {
      await axios.put(
        "/api/admins/applicant",
        {
          id: applicant.id,
        },
        {
          headers: { Authorization: "Bearer " + token },
        }
      );
      navigate(`/admin/applicants`, { state: { status: "success" } });
    } catch (e) {
      console.log(e); // Remove later
      if (e.response) {
        if (e.response.status === 401) {
          RemoveToken();
        } else {
          navigate(`/admin/applicants/${applicant.id}`, {
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
        <Heading subtitle>Update Applicant</Heading>
        <Form.Field>
          <Form.Label>First Name</Form.Label>
          <Form.Control>
            <Form.Input
              name="first_name"
              type="text"
              value={updateApplicantForm.first_name}
              onChange={updateUpdateApplicantForm}
            />
          </Form.Control>
        </Form.Field>
        <Form.Field>
          <Form.Label>Middle Name</Form.Label>
          <Form.Control>
            <Form.Input
              name="middle_name"
              type="text"
              value={updateApplicantForm.middle_name}
              onChange={updateUpdateApplicantForm}
            />
          </Form.Control>
        </Form.Field>
        <Form.Field>
          <Form.Label>Last Name</Form.Label>
          <Form.Control>
            <Form.Input
              name="last_name"
              type="text"
              value={updateApplicantForm.last_name}
              onChange={updateUpdateApplicantForm}
            />
          </Form.Control>
        </Form.Field>
        <Form.Field>
          <Form.Label>Email</Form.Label>
          <Form.Control>
            <Form.Input
              name="email"
              type="email"
              value={updateApplicantForm.email}
              onChange={updateUpdateApplicantForm}
            />
          </Form.Control>
        </Form.Field>
        <Form.Field>
          <Form.Label>Phone</Form.Label>
          <Form.Control>
            <Form.Input
              name="phone"
              type="text"
              value={updateApplicantForm.phone}
              onChange={updateUpdateApplicantForm}
            />
          </Form.Control>
        </Form.Field>
        <Form.Field>
          <Form.Label>Street</Form.Label>
          <Form.Control>
            <Form.Input
              name="address_street"
              type="text"
              value={updateApplicantForm.address_street}
              onChange={updateUpdateApplicantForm}
            />
          </Form.Control>
        </Form.Field>
        <Form.Field>
          <Form.Label>City</Form.Label>
          <Form.Control>
            <Form.Input
              name="address_city"
              type="text"
              value={updateApplicantForm.address_city}
              onChange={updateUpdateApplicantForm}
            />
          </Form.Control>
        </Form.Field>
        <Form.Field>
          <Form.Label>Zip Code</Form.Label>
          <Form.Control>
            <Form.Input
              name="address_zip"
              type="text"
              value={updateApplicantForm.address_zip}
              onChange={updateUpdateApplicantForm}
            />
          </Form.Control>
        </Form.Field>
        <Form.Field>
          <Form.Label>State</Form.Label>
          <Form.Control>
            <Form.Input
              name="address_state"
              type="text"
              value={updateApplicantForm.address_state}
              onChange={updateUpdateApplicantForm}
            />
          </Form.Control>
        </Form.Field>
        <Form.Field>
          <Form.Control>
            <Button type="primary" onClick={onUpdateApplicantClicked}>
              Update Applicant
            </Button>
          </Form.Control>
        </Form.Field>
      </Box>
    </Container>
  );
}

function GetCurrentApplicantJobs({ applicant }) {
  if (applicant.job_count === 0) {
    return (
      <Container>
        <Box>
          <Heading subtitle>Current Job Applications</Heading>
          <p>Currently no applications</p>
        </Box>
      </Container>
    );
  }
  return (
    <Container>
      <Box>
        <Heading subtitle>Current Job Applications</Heading>
        <GetJobsAsAdmin jobKeys={applicant.job_keys} />
      </Box>
    </Container>
  );
}

export default AdminApplicant;
