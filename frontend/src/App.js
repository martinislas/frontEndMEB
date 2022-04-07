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
import AdminJob from './pages/AdminJob';
import AdminApplicant from './pages/AdminApplicant';
import AdminApplicants from './pages/AdminApplicants';
import Admin from './pages/AdminAdmin';
import Admins from './pages/AdminAdmins';

function App() {
  return (
    <Router>
      <Routes>
        {/* Done */}
        <Route path="/login/admin" element={<AdminLogin />} />
        {/* What should go on the dash? */}
        <Route path="/admin" element={<AdminAuthRoute><AdminDash /></AdminAuthRoute>} />
        {/* Done apart from pagination */}
        <Route path="/admin/jobs" element={<AdminAuthRoute><AdminJobs /></AdminAuthRoute>} />
        {/* Needs testing + pagination for applicants -> is applicant info enough */}
        <Route path="/admin/jobs/:id" element={<AdminAuthRoute><AdminJob /></AdminAuthRoute>} />
        {/* Done apart from pagination + form tidy up */}
        <Route path="/admin/applicants" element={<AdminAuthRoute><AdminApplicants /></AdminAuthRoute>} />
        {/* todo */}
        <Route path="/admin/applicants/:id" element={<AdminAuthRoute><AdminApplicant /></AdminAuthRoute>} />
        {/* todo */}
        <Route path="/admin/admins" element={<AdminAuthRoute><Admins /></AdminAuthRoute>} />
        {/* todo */}
        <Route path="/admin/admins/:id" element={<AdminAuthRoute><Admin /></AdminAuthRoute>} />
        {/* Done - possibly add tags for applicants? */}
        <Route path="/admin/system" element={<AdminAuthRoute><AdminSystem /></AdminAuthRoute>} />
        {/* Done */}
        <Route path="/admin/system/industry/:id" element={<AdminAuthRoute><AdminIndustry /></AdminAuthRoute>} />
        {/* Done */}
        <Route path="/admin/system/location/:id" element={<AdminAuthRoute><AdminLocation /></AdminAuthRoute>} />
        <Route path="/jobs/:id" element={<JobDetails />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/" element={<Landing />} />
      </Routes>
    </Router>
  );
}

export default App;
