import { useNavigate } from "react-router-dom";

function RemoveToken() {
  localStorage.removeItem("token");

  let navigate = useNavigate();
  navigate(`/login/admin`);
}

export default RemoveToken;
