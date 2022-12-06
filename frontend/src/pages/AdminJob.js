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
  Icon,
  Section,
  Table,
} from "react-bulma-components";
import useToken from "../auth/UseToken";
import AdminNav from "../components/AdminNav";
import LocationPicker from "../components/LocationPicker";
import IndustryPicker from "../components/IndustryPicker";
import GetApplicantAsAdmin from "../components/GetApplicantAsAdmin";
import RemoveToken from "../auth/RemoveToken";
import EnableJob from "../components/EnableJob";
import DisableJob from "../components/DisableJob";
import StatusNotification from "../components/StatusNotification";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

function AdminJob() {
  const { id } = useParams();

  return (
    <div>
      <AdminNav />
      <StatusNotification />
      <Container>
        <Section>
          <Heading>Manage Job Listing</Heading>
          <GetCurrentJob id={id} />
        </Section>
      </Container>
    </div>
  );
}

function GetCurrentJob({ id }) {
  const [token] = useToken();

  // Get the job by ID
  const [currentJob, setCurrentJob] = useState({
    id: "",
    name: "",
    description: "",
    salary: "",
    location: "",
    location_key: "",
    industry: "",
    industry_key: "",
    applicantKeys: [],
    applicantCount: 0,
    postedBy: "",
    active: false,
  });

  useEffect(() => {
    async function getJob() {
      try {
        const response = await axios.get(`/api/admins/job/${id}`, {
          headers: { Authorization: "Bearer " + token },
        });
        if (response) {
          setCurrentJob({
            id: response.data.id,
            name: response.data.name,
            description: response.data.description,
            salary: response.data.salary,
            location: response.data.location,
            location_key: response.data.location_key,
            industry: response.data.industry,
            industry_key: response.data.industry_key,
            applicantKeys: response.data.applicant_keys,
            applicantCount: response.data.applicant_count,
            postedBy: response.data.posted_by,
            active: response.data.active,
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

    getJob();
  }, [id, token]);

  if (currentJob.id === "") {
    return (
      <div>
        <Section>
          <Container>
            <Box>
              <p>
                <Icon align="center">
                  <FontAwesomeIcon icon={faSpinner} className={"fa-spin"} />
                </Icon>
                Fetching job details...
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
        <EditCurrentJob job={currentJob} />
      </Section>
      <Section>
        <ManageCurrentJobStatus job={currentJob} />
      </Section>
      <Section>
        <GetCurrentJobApplicants job={currentJob} />
      </Section>
    </div>
  );
}

function EditCurrentJob({ job }) {
  const [token] = useToken();

  let navigate = useNavigate();

  // Edit Job Form
  const [updateJobForm, setUpdateJobForm] = useState({
    name: job.name,
    description: job.description,
    salary: job.salary,
    location_key: job.location_key,
    industry_key: job.industry_key,
  });
  const updateUpdateJobForm = ({ target }) =>
    setUpdateJobForm({ ...updateJobForm, [target.name]: target.value });

  const onUpdateJobClicked = async () => {
    try {
      await axios.put(
        "/api/admins/job",
        {
          id: job.id,
          name: updateJobForm.name,
          description: updateJobForm.description,
          salary: updateJobForm.salary,
          location_key: updateJobForm.location_key,
          industry_key: updateJobForm.industry_key,
          active: job.active,
        },
        {
          headers: { Authorization: "Bearer " + token },
        }
      );
      navigate(`/admin/jobs`, { state: { status: "success" } });
    } catch (e) {
      console.log(e); // Remove later
      if (e.response) {
        if (e.response.status === 401) {
          RemoveToken();
        } else {
          navigate(`/admin/jobs/${job.id}`, { state: { status: "failed" } });
        }
      } else {
        console.log(e); // Send error to BE?
      }
    }
  };

  return (
    <Container>
      <Box>
        <Heading subtitle>Edit Job Posting</Heading>
        <Form.Field>
          <Form.Label>Job Title</Form.Label>
          <Form.Control>
            <Form.Input
              name="name"
              type="text"
              value={updateJobForm.name}
              onChange={updateUpdateJobForm}
            />
          </Form.Control>
        </Form.Field>
        <Form.Field>
          <Form.Label>Job Description</Form.Label>
          <Form.Control>
            <Form.Input
              name="description"
              type="text"
              value={updateJobForm.description}
              onChange={updateUpdateJobForm}
            />
          </Form.Control>
        </Form.Field>
        <Form.Field>
          <Form.Label>Salary</Form.Label>
          <Form.Control>
            <Form.Input
              name="salary"
              type="text"
              value={updateJobForm.salary}
              onChange={updateUpdateJobForm}
            />
          </Form.Control>
        </Form.Field>
        <Form.Field>
          <Form.Label>Location</Form.Label>
          <Form.Control>
            <Form.Select name="location_key" onChange={updateUpdateJobForm}>
              <LocationPicker
                selectedLocationKey={job.location_key}
                selectedLocationDisplayName={job.location}
              />
            </Form.Select>
          </Form.Control>
        </Form.Field>
        <Form.Field>
          <Form.Label>Industry</Form.Label>
          <Form.Control>
            <Form.Select name="industry_key" onChange={updateUpdateJobForm}>
              <IndustryPicker
                selectedIndustryKey={job.industry_key}
                selectedIndustryDisplayName={job.industry}
              />
            </Form.Select>
          </Form.Control>
        </Form.Field>
        <Form.Field>
          <Form.Control>
            <Button type="primary" onClick={onUpdateJobClicked}>
              Update Job Posting
            </Button>
          </Form.Control>
        </Form.Field>
      </Box>
    </Container>
  );
}

function ManageCurrentJobStatus({ job }) {
  return (
    <div>
      <Container>
        <Box>
          <Heading subtitle>Manage Job Posting Status</Heading>
          {job.active ? <DisableJob job={job} /> : <EnableJob job={job} />}
        </Box>
      </Container>
    </div>
  );
}

function GetCurrentJobApplicants({ job }) {
  if (job.applicantCount === 0) {
    return (
      <Container>
        <Box>
          <Heading subtitle>Current Applicants</Heading>
          <p>Currently no applicants</p>
        </Box>
      </Container>
    );
  }
  return (
    <Container>
      <Box>
        <Heading subtitle>Current Applicants</Heading>
        <Table>
          <tbody>
            {job.applicant_keys.map(applicant => {
              return <GetApplicantAsAdmin applicantID={applicant} />;
            })}
          </tbody>
        </Table>
      </Box>
    </Container>
  );
}

export default AdminJob;
