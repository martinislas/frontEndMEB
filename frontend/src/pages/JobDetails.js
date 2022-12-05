import { useCallback, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "bulma/css/bulma.min.css";
import {
  Block,
  Box,
  Button,
  Container,
  Heading,
  Icon,
  Section,
} from "react-bulma-components";
import Nav from "../components/Nav";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import ApplyJob from "../components/ApplyJob";

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
  const [showModal, setShowModal] = useState(false);

  const onModalClose = useCallback(modalState => {
    setShowModal(modalState);
  }, []);

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

  const onApplyJobClicked = async () => {
    setShowModal(true);
  };

  if (currentJob.id === "") {
    return (
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
    );
  }
  return (
    <Section>
      <ApplyJob openModal={showModal} closeModal={onModalClose} />
      <Container>
        <Box>
          <Heading subtitle>{currentJob.name}</Heading>
          <Block>Salary: {currentJob.salary}</Block>
          <Block>Location: {currentJob.location}</Block>
          <Block>Industry: {currentJob.industry}</Block>
          <Block>{currentJob.description}</Block>
          <Block>
            <Button onClick={onApplyJobClicked}>Apply</Button>
          </Block>
        </Box>
      </Container>
    </Section>
  );
}

export default JobDetails;
