import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminAuthRoute from './auth/AdminAuth';
import AdminDash from './pages/AdminDash';
import Landing from './pages/Landing';
import Jobs from './Jobs';
import JobDetails from './JobDetails';
import AdminLogin from './pages/AdminLogin';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login/admin" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminAuthRoute><AdminDash /></AdminAuthRoute>} />
        <Route path="/jobs/:id" element={<JobDetails />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/" element={<Landing />} />
      </Routes>
    </Router>
  );
}

export default App;
