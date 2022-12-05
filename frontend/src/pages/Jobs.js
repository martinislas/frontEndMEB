import { useCallback, useState, useEffect } from "react";
import axios from "axios";
import "bulma/css/bulma.min.css";
import {
  Block,
  Box,
  Button,
  Container,
  Heading,
  Icon,
  Level,
  Section,
  Table,
} from "react-bulma-components";
import Nav from "../components/Nav";
import ApplyJob from "../components/ApplyJob";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

function Jobs() {
  // Existing jobs
  const [jobList, setJobList] = useState({ jobs: [] });
  const [showModal, setShowModal] = useState(false);

  const onModalClose = useCallback(modalState => {
    setShowModal(modalState);
  }, []);

  useEffect(() => {
    async function getJobs() {
      try {
        const { data: jobs } = await axios.get("/api/jobs");
        if (jobs) {
          setJobList({ jobs });
        }
      } catch (e) {
        console.log(e); // Send error to BE?
      }
    }

    getJobs();
  }, []);

  const onApplyJobClicked = async () => {
    setShowModal(true);
  };

  if (jobList.jobs.length === 0) {
    return (
      <div>
        <Nav />
        <Container>
          <Section>
            <Container>
              <Box>
                <p>
                  <Icon align="center">
                    <FontAwesomeIcon icon={faSpinner} className={"fa-spin"} />
                  </Icon>
                  Fetching current job openings...
                </p>
              </Box>
            </Container>
          </Section>
        </Container>
      </div>
    );
  }

  return (
    <div>
      <ApplyJob openModal={showModal} closeModal={onModalClose} />
      <Nav />
      <Container>
        <Section>
          <Heading>Jobs</Heading>
          <Container>
            <Box>
              <Heading subtitle>Current Openings</Heading>
              <Block>
                <Container>Filters</Container>
              </Block>
              <Table size="fullwidth">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Location</th>
                    <th>Industry</th>
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
                          <Level>
                            <Level.Item>
                              <Button onClick={onApplyJobClicked}>Apply</Button>
                            </Level.Item>
                            <Level.Item>
                              <Button renderAs="a" href={"/jobs/" + job.id}>
                                Details
                              </Button>
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

export default Jobs;
