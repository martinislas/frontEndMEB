import { useEffect, useState } from "react";
import axios from "axios";
import "bulma/css/bulma.min.css";
import { Button, Table } from "react-bulma-components";
import useToken from "../auth/UseToken";
import RemoveToken from "../auth/RemoveToken";

function GetApplicantsAsAdmin({ applicantKeys }) {
  return (
    <Table>
      <thead>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Phone</th>
          <th>Email</th>
          <th>Options</th>
        </tr>
      </thead>
      <tbody>
        {applicantKeys.map(applicantKey => {
          return <GetApplicantAsAdmin applicantID={applicantKey} />;
        })}
      </tbody>
    </Table>
  );
}

function GetApplicantAsAdmin({ applicantID }) {
  const [token] = useToken();
  const [applicant, setApplicant] = useState({
    id: "",
    first_name: "",
    last_name: "",
    phone: "",
    email: "",
  });

  useEffect(() => {
    async function getApplicant() {
      try {
        const response = axios.get(`/api/admins/applicant/${applicantID}`, {
          headers: { Authorization: "Bearer " + token },
        });
        if (response) {
          setApplicant({
            id: response.data.id,
            first_name: response.data.first_name,
            last_name: response.data.last_name,
            phone: response.data.phone,
            email: response.data.email,
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
  }, [applicantID, token]);

  if (applicant.id === "") {
    return (
      <tr>
        <td>Loading...</td>
      </tr>
    );
  }
  return (
    <tr>
      <td>{applicant.first_name}</td>
      <td>{applicant.last_name}</td>
      <td>{applicant.phone}</td>
      <td>{applicant.email}</td>
      <td>
        <Button renderAs="a" href={"/admin/applicant/" + applicant.id}>
          View Applicant
        </Button>
      </td>
    </tr>
  );
}

export default GetApplicantsAsAdmin;
