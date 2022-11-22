import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "bulma/css/bulma.min.css";
import {
  Block,
  Box,
  Button,
  Container,
  Form,
  Heading,
  Icon,
  Level,
  Notification,
  Section,
  Table,
} from "react-bulma-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import useToken from "../auth/UseToken";
import AdminNav from "../components/AdminNav";
import LocationPicker from "../components/LocationPicker";
import IndustryPicker from "../components/IndustryPicker";
import RemoveToken from "../auth/RemoveToken";
import EnableJob from "../components/EnableJob";
import DisableJob from "../components/DisableJob";

function AdminJobs() {
  const [token] = useToken();
  let navigate = useNavigate();
  let location = useLocation();

  if (location.state !== null) {
    console.log(location.state.status);
  }

  // Existing jobs
  const [jobList, setJobList] = useState({ jobs: [] });
  // Filter state

  useEffect(() => {
    async function getJobs() {
      try {
        const { data: jobs } = await axios.get("/api/jobs?limit=10");
        if (jobs) {
          setJobList({ jobs });
        }
      } catch (e) {
        console.log(e); // Send error to BE?
      }
    }

    getJobs();
  }, []);

  // New Job
  const [newJobForm, setNewJobForm] = useState({
    title: "",
    description: "",
    salary: "",
    locationKey: "",
    industryKey: "",
  });
  const updateNewJobForm = ({ target }) =>
    setNewJobForm({ ...newJobForm, [target.name]: target.value });

  const onCreateNewJobClicked = async () => {
    try {
      await axios.post(
        "/api/admins/job",
        {
          name: newJobForm.title,
          description: newJobForm.description,
          salary: newJobForm.salary,
          location_key: newJobForm.locationKey,
          industry_key: newJobForm.industryKey,
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
          navigate("/admin/jobs", {
            state: { status: "failed" },
          });
        }
      } else {
        console.log(e); // Send error to BE?
      }
    }
  };

  return (
    <div>
      <AdminNav />
      {location.state !== null && location.state.status === "success" && (
        <Block>
          <Notification color="success">Success!</Notification>
        </Block>
      )}
      <Section>
        <Notification color="danger">
          Failed!
          <Button
            remove
            onClick={() => {
              navigate(`/admin/jobs`, { state: null });
            }}
          />
        </Notification>
      </Section>
      <Container>
        <Section>
          <Heading>Jobs</Heading>
          <Container>
            <Box>
              <Heading subtitle>Create New Job Posting</Heading>
              <Form.Field>
                <Form.Label>Job Title</Form.Label>
                <Form.Control>
                  <Form.Input
                    name="title"
                    type="text"
                    value={newJobForm.title}
                    onChange={updateNewJobForm}
                  />
                </Form.Control>
              </Form.Field>
              <Form.Field>
                <Form.Label>Job Description</Form.Label>
                <Form.Control>
                  <Form.Input
                    name="description"
                    type="text"
                    value={newJobForm.description}
                    onChange={updateNewJobForm}
                  />
                </Form.Control>
              </Form.Field>
              <Form.Field>
                <Form.Label>Salary</Form.Label>
                <Form.Control>
                  <Form.Input
                    name="salary"
                    type="text"
                    value={newJobForm.salary}
                    onChange={updateNewJobForm}
                  />
                </Form.Control>
              </Form.Field>
              <Form.Field>
                <Form.Label>Location</Form.Label>
                <Form.Control>
                  <Form.Select name="locationKey" onChange={updateNewJobForm}>
                    <LocationPicker />
                  </Form.Select>
                </Form.Control>
              </Form.Field>
              <Form.Field>
                <Form.Label>Industry</Form.Label>
                <Form.Control>
                  <Form.Select name="industryKey" onChange={updateNewJobForm}>
                    <IndustryPicker />
                  </Form.Select>
                </Form.Control>
              </Form.Field>
              <Form.Field>
                <Form.Control>
                  <Button type="primary" onClick={onCreateNewJobClicked}>
                    Submit
                  </Button>
                </Form.Control>
              </Form.Field>
            </Box>
          </Container>
        </Section>

        <Section>
          <Container>
            <Box>
              <Heading subtitle>Existing Jobs</Heading>
              <Block>
                <Container>Filters</Container>
              </Block>
              <Table size="fullwidth">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Location</th>
                    <th>Industry</th>
                    <th>Position Open</th>
                    <th>Current Applicant Count</th>
                    <th>Options</th>
                  </tr>
                </thead>
                <tbody>
                  {jobList.jobs.map(job => {
                    return (
                      <tr>
                        <td>{job.name}</td>
                        <td>{job.location}</td>
                        <td>{job.industry}</td>
                        <td>
                          {job.active ? (
                            <Icon align="center">
                              <FontAwesomeIcon icon={faCheck} />
                            </Icon>
                          ) : (
                            <Icon align="center">
                              <FontAwesomeIcon icon={faXmark} />
                            </Icon>
                          )}
                        </td>
                        <td>{job.applicant_count}</td>
                        <td>
                          <Level>
                            <Level.Item>
                              <Button
                                renderAs="a"
                                href={"/admin/jobs/" + job.id}
                              >
                                Manage
                              </Button>
                            </Level.Item>
                            <Level.Item>
                              {job.active ? (
                                <DisableJob job={job} />
                              ) : (
                                <EnableJob job={job} />
                              )}
                            </Level.Item>
                          </Level>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </Box>
          </Container>
        </Section>
      </Container>
    </div>
  );
}

export default AdminJobs;
