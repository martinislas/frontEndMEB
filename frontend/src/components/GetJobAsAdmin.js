import { useEffect, useState } from 'react';
import axios from 'axios';
import 'bulma/css/bulma.min.css';
import { Button } from 'react-bulma-components';
import useToken from '../auth/UseToken';

function GetJobAsAdmin({ jobID }) {
  const [token, ] = useToken();
    const [job, setJob] = useState(null)
  
    useEffect(() => {
      async function getJob() {
        try {
          const response = axios.get(`/api/admin/job/${jobID}`, {
            headers: {'Authorization': 'Bearer ' + token}
          });
          if (response) {
            setJob({job: response.data})
          }
        } catch (e) {
          console.log(e)
        }  
      }
  
      getJob()
    }, [jobID, token]);
  
    if (job === null) {
      return (
        <tr>
          <td>Loading...</td>
        </tr>
      )
    }
    return (
      <tr>
        <td>{job.name}</td>
        <td>{job.location}</td>
        <td>{job.industry}</td>
        <td>{job.applicant_count}</td>
        <td>
          <Button renderAs="a" href={'/admin/jobs/'+job.id}>View Job</Button>
        </td>
      </tr>
    );
}

export default GetJobAsAdmin;