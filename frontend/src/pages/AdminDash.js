import 'bulma/css/bulma.min.css';
import AdminJobs from './AdminJobs';
import AdminNav from '../components/AdminNav';

function AdminDash () {
    return (
      <div>
        <AdminNav />
        <AdminJobs />
      </div>
    );
  }
  
  export default AdminDash;