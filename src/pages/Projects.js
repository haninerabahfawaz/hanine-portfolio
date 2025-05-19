import axios from 'axios';
import { useEffect, useState } from 'react';
import { Card, Button, Col, Row, Container, Spinner, Alert } from 'react-bootstrap';

function Projects() {
  const [projects, setProjects] = useState([]);
  const [visibleCount, setVisibleCount] = useState(3); // Start with 3
  const [detailsVisible, setDetailsVisible] = useState({}); // Track read more/less
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);
  
  const toggleDetailsVisibility = (index) => {
    setDetailsVisible((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  const handleToggleShow = () => {
    if (visibleCount >= projects.length) {
      setVisibleCount(3); // Reset to 3
    } else {
      setVisibleCount((prev) => prev + 3); // Show 3 more
    }
  };

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await axios.get('https://data-json-api.onrender.com/projects');
        setProjects(res.data);
        setFetchError(null);
      } catch (err) {
        if (err.response) {
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.headers);
          setFetchError(`Server error: ${err.response.status}`);
        } else {
          console.log(`Error: ${err.message}`);
          setFetchError('Network error or server is unreachable');
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (isLoading) {
    return (
      <section className="py-5 text-center">
        <Spinner animation="border" role="status" variant="primary" />
        <p className="mt-3">Loading projects content...</p>
      </section>
    );
  }

  if (fetchError) {
    return (
      <section className="py-5">
        <Container>
          <Alert variant="danger">
            <Alert.Heading>Error loading projects section</Alert.Heading>
            <p>{fetchError}</p>
          </Alert>
        </Container>
      </section>
    );
  }

  if (!projects) return null;

  return (
    <div className="projects-section py-5">
      <Container>
        <h2 className="text-center mb-4">My Projects</h2>
        <Row xs={1} md={2} lg={3} className="g-4">
          {projects.slice(0, visibleCount).map((project, idx) => (
            <Col key={idx}>
              <Card className="project-card">
                <img
                  src={project.image}
                  alt={project.name}
                  className="project-image"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/HanineLogo.png';
                  }}
                />
                <Card.Body>
                  <Card.Title className="card-title">{project.name}</Card.Title>
                  <Card.Text className="card-text">
                    {project.description}{' '}
                    <Button
                      variant="link"
                      className="read-btn"
                      style={{ cursor: 'pointer', color: '#a9885d', padding: '0' }}
                      onClick={() => toggleDetailsVisibility(idx)}
                    >
                      {detailsVisible[idx] ? 'Read Less' : 'Read More'}
                    </Button>
                  </Card.Text>
                  {detailsVisible[idx] && (
                    <Card.Text className="card-details">{project.details}</Card.Text>
                  )}
                  <Card.Text>
                    <strong>Technologies:</strong> {project.techStack}
                  </Card.Text>
                  <Button
                    href={project.link}
                    className="project-btn"
                    target="_blank"
                  >
                    View Project
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}

          {/* Coming soon card */}
          <Col>
            <Card className="project-card" style={{ border: '1px solid #a9885d' }}>
              <img
                src="HanineLogo.png"
                alt="Coming Soon"
                className="project-image"
                style={{ height: '220px' }}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '/HanineLogo.png';
                }}
              />
              <Card.Body>
                <Card.Title className="card-title" style={{ textAlign: 'center' }}>
                  What's the next?
                </Card.Title>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Show More / Show Less Button */}
        {projects.length > 6 && (
          <div className="text-end mt-4">
            <Button className="show-more-projects" onClick={handleToggleShow}>
              {visibleCount >= projects.length ? 'Show Less' : 'Show More'}
            </Button>
          </div>
        )}
      </Container>
    </div>
  );
}

export default Projects;
