import 'bulma/css/bulma.min.css';
import AdminJobs from '../components/AdminJobs';
import AdminNav from '../components/AdminNav';
import AdminSystem from '../components/AdminSystem';

function AdminDash () {
    return (
      <div>
        <AdminNav />
        <AdminJobs />
        <AdminSystem />
      </div>
    );
  }
  
  export default AdminDash;