import { Navbar, Nav, Container } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import HanineLogo from '../assets/HanineLogo.png';

const NavBarSection = () => {
  return (
    <Navbar style={{ backgroundColor: '#7d6648' }} variant="dark" expand="lg" sticky="top">
      <Container>
      <Navbar.Brand as={NavLink} to="/" className="nav-portfolio d-flex align-items-center" style={{ marginLeft: '0px' }}>
        <img
          src={HanineLogo}
          alt="Logo"
          width="50"
          height="50"
          className="d-inline-block align-top me-2"
        />
      Hanine Fawaz
    </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto nav-font">
            <Nav.Link as={NavLink} to="/" end>Home</Nav.Link>
            <Nav.Link as={NavLink} to="/skills">Skills</Nav.Link>
            <Nav.Link as={NavLink} to="/projects">Projects</Nav.Link>
            <Nav.Link as={NavLink} to="/contact">Contact</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBarSection;
