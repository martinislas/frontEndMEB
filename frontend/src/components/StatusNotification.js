import { useNavigate, useLocation } from "react-router-dom";
import "bulma/css/bulma.min.css";
import { Button, Notification, Section } from "react-bulma-components";

function StatusNotification() {
  let navigate = useNavigate();
  let location = useLocation();

  if (location.state !== null) {
    if (location.state.status === "success") {
      return (
        <Section>
          <Notification color="success">
            Success!
            <Button
              remove
              onClick={() => {
                navigate(location.pathname, { state: null });
              }}
            />
          </Notification>
        </Section>
      );
    }

    if (location.state.status === "failed") {
      return (
        <Section>
          <Notification color="danger">
            Failed!
            <Button
              remove
              onClick={() => {
                navigate(location.pathname, { state: null });
              }}
            />
          </Notification>
        </Section>
      );
    }
  }

  return;
}

export default StatusNotification;
