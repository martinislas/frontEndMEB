import 'bulma/css/bulma.min.css';
import { Hero } from 'react-bulma-components';
import AdminJobs from '../components/AdminJobs';
import AdminNav from '../components/AdminNav';

function AdminDash () {
    return (
      <div>
        <AdminNav />
        <Hero size="fullheight" hasNavbar>
          <Hero.Header />
          <Hero.Body>
            <AdminJobs />
          </Hero.Body>
          <Hero.Footer />
        </Hero>
      </div>
    );
  }
  
  export default AdminDash;