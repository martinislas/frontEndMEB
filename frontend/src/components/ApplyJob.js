import { useState } from "react";
import axios from "axios";
import { Button, Content, Form, Modal } from "react-bulma-components";

function ApplyJob({ openModal, closeModal }) {
  const onCloseModalClicked = async () => {
    closeModal(false);
  };

  const [applyJobForm, setApplyJobForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
  });
  const updateApplyJobForm = ({ target }) =>
    setApplyJobForm({ ...applyJobForm, [target.name]: target.value });

  const onApplyJobClicked = async () => {
    try {
      await axios.post("/api/apply", {
        job_id: openModal.jobID,
        first_name: applyJobForm.first_name,
        last_name: applyJobForm.last_name,
        email: applyJobForm.email,
        phone: applyJobForm.phone,
      });
      onCloseModalClicked();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Modal show={openModal.modalState} onClose={onCloseModalClicked}>
      <Modal.Card>
        <Modal.Card.Header>
          <Modal.Card.Title>Apply</Modal.Card.Title>
        </Modal.Card.Header>
        <Modal.Card.Body>
          <Content>
            Send us your details and we'll be in touch! {openModal.jobID}
          </Content>
          <Form.Field>
            <Form.Label>Enter Your Name</Form.Label>
            <Form.Field kind="group">
              <Form.Control>
                <Form.Input
                  name="first_name"
                  type="text"
                  placeholder="First Name"
                  required
                  onChange={updateApplyJobForm}
                />
              </Form.Control>
              <Form.Control>
                <Form.Input
                  name="last_name"
                  type="text"
                  placeholder="Last Name"
                  required
                  onChange={updateApplyJobForm}
                />
              </Form.Control>
            </Form.Field>
          </Form.Field>
          <Form.Field>
            <Form.Label>Enter Your Contact Details</Form.Label>
            <Form.Field kind="group">
              <Form.Control>
                <Form.Input
                  name="email"
                  type="email"
                  placeholder="Email Address"
                  onChange={updateApplyJobForm}
                />
              </Form.Control>
              <Form.Control>
                <Form.Input
                  name="phone"
                  type="phone"
                  placeholder="111-222-333"
                  onChange={updateApplyJobForm}
                />
              </Form.Control>
            </Form.Field>
          </Form.Field>
        </Modal.Card.Body>
        <Modal.Card.Footer>
          <Form.Field>
            <Form.Control>
              <Button type="primary" onClick={onApplyJobClicked}>
                Apply
              </Button>
            </Form.Control>
          </Form.Field>
        </Modal.Card.Footer>
      </Modal.Card>
    </Modal>
  );
}

export default ApplyJob;
