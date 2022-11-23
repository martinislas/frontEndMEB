import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "bulma/css/bulma.min.css";
import {
  Block,
  Box,
  Button,
  Container,
  Heading,
  Section,
} from "react-bulma-components";
import Nav from "../components/Nav";

function JobDetails() {
  const { id } = useParams();

  return (
    <div>
      <Nav />
      <Container>
        <GetCurrentJob id={id} />
      </Container>
    </div>
  );
}

function GetCurrentJob({ id }) {
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
    postedBy: "",
  });

  useEffect(() => {
    async function getJob() {
      try {
        const response = await axios.get(`/api/job/${id}`);
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
            postedBy: response.data.posted_by,
          });
        }
      } catch (e) {
        console.log(e); // Send error to BE?
      }
    }

    getJob();
  }, [id]);

  if (currentJob.id === "") {
    return (
      <Section>
        <Container>
          <Box>
            <p>Fetching job details...</p>
          </Box>
        </Container>
      </Section>
    );
  }
  return (
    <Section>
      <Container>
        <Box>
          <Heading subtitle>{currentJob.name}</Heading>
          <Block>Salary: {currentJob.salary}</Block>
          <Block>Location: {currentJob.location}</Block>
          <Block>Industry: {currentJob.industry}</Block>
          <Block>{currentJob.description}</Block>
          <Block>
            <Button renderAs="a" href={"/jobs/" + currentJob.id}>
              Apply
            </Button>
          </Block>
        </Box>
      </Container>
    </Section>
  );
}

export default JobDetails;
