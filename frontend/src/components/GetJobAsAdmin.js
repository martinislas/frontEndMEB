import { useEffect, useState } from "react";
import axios from "axios";
import "bulma/css/bulma.min.css";
import { Button, Icon, Table } from "react-bulma-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import useToken from "../auth/UseToken";
import RemoveToken from "../auth/RemoveToken";

function GetJobsAsAdmin({ jobKeys }) {
  return (
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
        {jobKeys.map(jobKey => {
          return <GetJobAsAdmin jobID={jobKey} />;
        })}
      </tbody>
    </Table>
  );
}

function GetJobAsAdmin({ jobID }) {
  const [token] = useToken();
  const [job, setJob] = useState({
    id: "",
    name: "",
    location: "",
    industry: "",
    active: false,
    applicant_count: 0,
  });

  useEffect(() => {
    async function getJob() {
      try {
        const response = await axios.get(`/api/admins/job/${jobID}`, {
          headers: { Authorization: "Bearer " + token },
        });
        if (response) {
          setJob({
            id: response.data.id,
            name: response.data.name,
            location: response.data.location,
            industry: response.data.industry,
            active: response.data.active,
            applicant_count: response.data.applicant_count,
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
  }, [jobID, token]);

  if (job.id === "") {
    return (
      <tr>
        <td>Loading...</td>
      </tr>
    );
  }
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
        <Button renderAs="a" href={"/admin/jobs/" + job.id}>
          View Job
        </Button>
      </td>
    </tr>
  );
}

export default GetJobsAsAdmin;
