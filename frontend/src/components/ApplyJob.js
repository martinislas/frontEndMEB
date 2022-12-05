import { Button, Content, Form, Modal } from "react-bulma-components";

function ApplyJob({ openModal, closeModal }) {
  const onCloseModalClicked = async () => {
    closeModal(false);
  };

  return (
    <Modal show={openModal} onClose={onCloseModalClicked}>
      <Modal.Card>
        <Modal.Card.Header>
          <Modal.Card.Title>Apply</Modal.Card.Title>
        </Modal.Card.Header>
        <Modal.Card.Body>
          <Content>Send us your details and we'll be in touch!</Content>
          <Form.Field>
            <Form.Label>Enter Your Name</Form.Label>
            <Form.Field kind="group">
              <Form.Control>
                <Form.Input
                  name="first_name"
                  type="text"
                  placeholder="First Name"
                  onChange={function noRefCheck() {}}
                />
              </Form.Control>
              <Form.Control>
                <Form.Input
                  name="last_name"
                  type="text"
                  placeholder="Last Name"
                  onChange={function noRefCheck() {}}
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
                  onChange={function noRefCheck() {}}
                />
              </Form.Control>
              <Form.Control>
                <Form.Input
                  name="phone"
                  type="phone"
                  placeholder="111-222-333"
                  onChange={function noRefCheck() {}}
                />
              </Form.Control>
            </Form.Field>
          </Form.Field>
        </Modal.Card.Body>
        <Modal.Card.Footer>
          <Form.Field>
            <Form.Control>
              <Button type="primary" onClick={function noRefCheck() {}}>
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
