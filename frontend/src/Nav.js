import 'react-bulma-components/dist/react-bulma-components.min.css';
import { Navbar } from 'react-bulma-components';
import Logo from './mainLogo.jpg';

function Nav() {
    return (
      <Navbar color="primary">
        <Navbar.Brand>
          <Navbar.Item href="/">
            <img src={Logo} alt="MEB Resources Logo" />
          </Navbar.Item>
        </Navbar.Brand>
        <Navbar.Menu>
          <Navbar.Container position="end">
            <Navbar.Item href="/">Home</Navbar.Item>
            <Navbar.Item href="/jobs">Jobs</Navbar.Item>
            <Navbar.Item href="/jobs">Job Seeker Advice</Navbar.Item>
            <Navbar.Item href="/jobs">For Employers</Navbar.Item>
            <Navbar.Item>Applicants</Navbar.Item>
          </Navbar.Container>
        </Navbar.Menu>
      </Navbar>
    );
}

export default Nav