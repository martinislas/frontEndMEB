import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "bulma/css/bulma.min.css";
import {
  Button,
  Container,
  Form,
  Heading,
  Section,
  Table,
} from "react-bulma-components";
import useToken from "../auth/UseToken";
import AdminNav from "../components/AdminNav";
import LocationPicker from "../components/LocationPicker";
import IndustryPicker from "../components/IndustryPicker";
import GetApplicantAsAdmin from "../components/GetApplicantAsAdmin";
import RemoveToken from "../auth/RemoveToken";

function AdminJob() {
  const { id } = useParams();

  return (
    <div>
      <AdminNav />
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
    locationKey: "",
    industry: "",
    industryKey: "",
    applicantKeys: [],
    applicantCount: 0,
    postedBy: "",
    active: false,
  });

  useEffect(() => {
    async function getJob() {
      try {
        const response = await axios.get(`/api/job/${id}`, {
          headers: { Authorization: "Bearer " + token },
        });
        if (response) {
          setCurrentJob({
            id: response.data.id,
            name: response.data.name,
            description: response.data.description,
            salary: response.data.salary,
            location: response.data.location,
            locationKey: response.data.location_key,
            industry: response.data.industry,
            industryKey: response.data.industry_key,
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
    return <div>Loading...</div>;
  }
  return (
    <div>
      <Section>
        <EditCurrentJob job={currentJob} />
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
    locationKey: job.locationKey,
    industryKey: job.industryKey,
    active: job.active,
  });
  const updateUpdateJobForm = ({ target }) =>
    setUpdateJobForm({ ...updateJobForm, [target.name]: target.value });

  const onUpdateJobClicked = async () => {
    try {
      await axios.put(
        "/api/admin/job",
        {
          id: updateJobForm.id,
          name: updateJobForm.name,
          description: updateJobForm.description,
          salary: updateJobForm.salary,
          location_key: updateJobForm.locationKey,
          industry_key: updateJobForm.industryKey,
          active: updateJobForm.active,
        },
        {
          headers: { Authorization: "Bearer " + token },
        }
      );
      navigate(`/admin/jobs?status=success`);
    } catch (e) {
      console.log(e); // Remove later
      if (e.response) {
        if (e.response.status === 401) {
          RemoveToken();
        } else {
          navigate(`/admin/jobs/${job.id}?status=failed`);
        }
      } else {
        console.log(e); // Send error to BE?
      }
    }
  };

  return (
    <Container>
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
          <Form.Select
            name="locationKey"
            value={job.location}
            onChange={updateUpdateJobForm}
          >
            <LocationPicker />
          </Form.Select>
        </Form.Control>
      </Form.Field>
      <Form.Field>
        <Form.Label>Industry</Form.Label>
        <Form.Control>
          <Form.Select
            name="industryKey"
            value={job.industry}
            onChange={updateUpdateJobForm}
          >
            <IndustryPicker />
          </Form.Select>
        </Form.Control>
      </Form.Field>
      <Form.Field>
        <Form.Label>Active Job Listing</Form.Label>
        <Form.Control>
          <Form.Checkbox
            name="active"
            checked={updateJobForm.active}
            onChange={updateUpdateJobForm}
          />
        </Form.Control>
      </Form.Field>
      <Form.Field>
        <Form.Control>
          <Button type="primary" onClick={onUpdateJobClicked}>
            Update Job Posting
          </Button>
        </Form.Control>
      </Form.Field>
    </Container>
  );
}

function GetCurrentJobApplicants({ job }) {
  console.log(job.applicantCount);
  console.log(job.applicantKeys);
  if (job.applicantCount === 0) {
    return (
      <Container>
        <Heading subtitle>Current Applicants</Heading>
        <p> Currently no apllicants</p>
      </Container>
    );
  }
  return (
    <Container>
      <Heading subtitle>Current Applicants</Heading>
      <Table>
        <tbody>
          {job.applicant_keys.map(applicant => {
            return <GetApplicantAsAdmin applicantID={applicant.id} />;
          })}
        </tbody>
      </Table>
    </Container>
  );
}

export default AdminJob;
