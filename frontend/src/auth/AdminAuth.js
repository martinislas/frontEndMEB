import { Redirect, Route } from 'react-router-dom';
import useToken from './UseToken';

function AdminAuthRoute (props) {
    const [token] = useToken();

    if (!token) return <Redirect to="/login/admin" />

    return <Route {...props} />
}

export default AdminAuthRoute;