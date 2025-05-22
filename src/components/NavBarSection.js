import { useState, useEffect } from 'react';
import { Navbar, Nav, Container} from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import HanineLogo from '../assets/HanineLogo.png';
import { FaMoon, FaSun } from 'react-icons/fa'; // Icons for theme toggle

const NavBarSection = () => {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });

  useEffect(() => {
    document.body.setAttribute('data-theme', darkMode ? 'dark' : 'light');
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  const toggleTheme = () => {
    setDarkMode(prevMode => !prevMode);
  };

  return (
    <Navbar
      style={{ backgroundColor: darkMode ? '#333' : '#7d6648' }}
      variant="dark"
      expand="lg"
      sticky="top"
    >
      <Container>
        <Navbar.Brand
          as={NavLink}
          to="/"
          className="nav-portfolio d-flex align-items-center"
          style={{ marginLeft: '0px' }}
        >
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
          <Nav className="ms-auto nav-font align-items-center">
            <Nav.Link as={NavLink} to="/" end className='nav-link'>Home</Nav.Link>
            <Nav.Link as={NavLink} to="/skills" className='nav-link'>Skills</Nav.Link>
            <Nav.Link as={NavLink} to="/projects" className='nav-link'>Projects</Nav.Link>
            <Nav.Link as={NavLink} to="/contact" className='nav-link'>Contact</Nav.Link>
            
            {/* Theme Toggle Icon */}
            <Nav.Link
              onClick={toggleTheme}
              className="theme-toggle-link ms-lg-5 d-flex align-items-center"
            >
              {darkMode ? (
                <>
                  <div className='toggle-text'>
                      <span className="d-inline d-sm-none me-2"
                        style={{}}>
                        Light Mode 
                      </span>
                      <FaSun size={16} className="me-1" />
                  </div>
                </>
              ) : (
                <>
                  <div  className='toggle-text'>
                    <span className="d-inline d-sm-none me-2"> Dark Mode </span>
                    <FaMoon size={16} className="me-1" />
                  </div>
                </>
              )}
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBarSection;
