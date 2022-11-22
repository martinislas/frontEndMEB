import { useNavigate } from "react-router-dom";
import axios from "axios";
import "bulma/css/bulma.min.css";
import { Button, Form } from "react-bulma-components";
import useToken from "../auth/UseToken";
import RemoveToken from "../auth/RemoveToken";

function EnableJob({ job }) {
  const [token] = useToken();
  let navigate = useNavigate();

  const onEnableAdminClicked = async () => {
    try {
      await axios.put(
        "/api/admins/job",
        {
          id: job.id,
          name: job.name,
          description: job.description,
          salary: job.salary,
          location_key: job.locationKey,
          industry_key: job.industryKey,
          active: true,
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
    <Form.Field>
      <Form.Control>
        <Button type="primary" onClick={onEnableAdminClicked}>
          Enable Job Posting
        </Button>
      </Form.Control>
    </Form.Field>
  );
}

export default EnableJob;
