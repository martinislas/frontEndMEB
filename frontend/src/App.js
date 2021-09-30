import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AdminAuthRoute from './auth/AdminAuth';
import AdminDash from './pages/AdminDash';
import Landing from './Landing';
import Jobs from './Jobs';
import JobDetails from './JobDetails';
import AdminLogin from './pages/AdminLogin';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/login/admin">
          <AdminLogin />
        </Route>
        <AdminAuthRoute path="/admin">
          <AdminDash />
        </AdminAuthRoute>
        <Route path="/jobs/:id">
          <JobDetails />
        </Route>
        <Route path="/jobs">
          <Jobs />
        </Route>
        <Route path="/">
          <Landing />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
