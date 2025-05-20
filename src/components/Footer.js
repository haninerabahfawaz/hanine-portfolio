import { Container } from 'react-bootstrap';
import { FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="text-white py-3 footerSection">
        <Container>
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-center rights-reserved text-center text-md-start">
            <div className="mb-2 mb-md-0">
              &copy; {new Date().getFullYear()} Hanine's Portfolio. All rights reserved.
            </div>
            <div className="social-media-div">
              <a
                href="https://www.linkedin.com/in/hanine-fawaz-609361245?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white mx-2 social-media"
                style={{ textDecoration: 'none' }}
              >
                <FaLinkedin style={{ fontSize: '20px' }} />
              </a>
            </div>
          </div>
        </Container>
      </footer>
  );
};

export default Footer;
