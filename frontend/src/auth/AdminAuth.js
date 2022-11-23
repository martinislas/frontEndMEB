import { Navigate } from "react-router-dom";
import useToken from "./UseToken";

function AdminAuthRoute({ children }) {
  const [token] = useToken();

  if (!token) return <Navigate to="/login/admin" />;

  return children;
}

export default AdminAuthRoute;
