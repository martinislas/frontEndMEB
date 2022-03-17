import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminAuthRoute from './auth/AdminAuth';
import AdminDash from './pages/AdminDash';
import Landing from './pages/Landing';
import Jobs from './Jobs';
import JobDetails from './JobDetails';
import AdminLogin from './pages/AdminLogin';
import AdminSystem from './pages/AdminSystem';
import AdminIndustry from './pages/AdminIndustry';
import AdminLocation from './pages/AdminLocation';
import AdminJobs from './pages/AdminJobs';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login/admin" element={<AdminLogin />} />
        {/* <Route path="/admin" element={<AdminAuthRoute><AdminDash /></AdminAuthRoute>} /> */}
        <Route path="/admin" element={<AdminDash />} />
        <Route path="/admin/jobs" element={<AdminJobs />} />
        <Route path="/admin/system" element={<AdminSystem />} />
        <Route path="/admin/system/industry/:id" element={<AdminIndustry />} />
        <Route path="/admin/system/location/:id" element={<AdminLocation />} />
        <Route path="/jobs/:id" element={<JobDetails />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/" element={<Landing />} />
      </Routes>
    </Router>
  );
}

export default App;
