import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Landing from './Landing';
import Jobs from './Jobs';
import JobDetails from './JobDetails';
import AdminLogin from './AdminLogin';

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/admin">
            <AdminLogin />
          </Route>
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
    </div>
  );
}

export default App;
