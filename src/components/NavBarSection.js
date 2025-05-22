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
    <Container className="d-flex align-items-center justify-content-between">
      {/* Brand */}
      <Navbar.Brand
        as={NavLink}
        to="/"
        className="nav-portfolio d-flex align-items-center"
      >
        <img
          src={HanineLogo}
          alt="Logo"
          className="nav-img-logo d-inline-block align-top me-1"
        />
        Hanine Fawaz
      </Navbar.Brand>
  
      {/* Collapse Toggle + Theme Toggle on small screens */}
      <div className="d-flex align-items-center d-lg-none">
        {/* Theme Toggle - Small Screens Only */}
        <div onClick={toggleTheme} className="me-2">
          <div className={`dual-icon-toggle ${darkMode ? 'dark' : 'light'}`}>
            <FaSun size={14} className="sun-icon" />
            <FaMoon size={14} className="moon-icon" />
            <div className="toggle-thumb"></div>
          </div>
        </div>
  
        {/* Navbar Toggle */}
        <Navbar.Toggle aria-controls="navbar-nav" />
      </div>
  
      {/* Collapsible Menu */}
      <Navbar.Collapse id="navbar-nav">
        <Nav className="ms-auto nav-font align-items-center">
          <Nav.Link as={NavLink} to="/" end className="nav-link">Home</Nav.Link>
          <Nav.Link as={NavLink} to="/skills" className="nav-link">Skills</Nav.Link>
          <Nav.Link as={NavLink} to="/projects" className="nav-link">Projects</Nav.Link>
          <Nav.Link as={NavLink} to="/contact" className="nav-link">Contact</Nav.Link>
  
          {/* Theme Toggle - Large Screens Only */}
          <Nav.Link
            onClick={toggleTheme}
            className="theme-toggle-link ms-lg-5 d-none d-lg-flex align-items-center"
          >
            <div className="toggle-wrapper d-flex align-items-center">
              <div className={`dual-icon-toggle ${darkMode ? 'dark' : 'light'}`}>
                <FaSun size={14} className="sun-icon" />
                <FaMoon size={14} className="moon-icon" />
                <div className="toggle-thumb"></div>
              </div>
            </div>
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
  
  );
};

export default NavBarSection;
