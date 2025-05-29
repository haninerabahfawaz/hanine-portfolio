import axios from 'axios';
import { useEffect, useState } from 'react';
import { Card, Button, Col, Row, Container, Spinner, Alert, Modal } from 'react-bootstrap';

function Projects() {
  const [projects, setProjects] = useState([]);
  const [visibleCount, setVisibleCount] = useState(3); 
  const [detailsVisible, setDetailsVisible] = useState({}); 
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);

  // Sort projects by created_at DESC
  const sortedProjects = [...projects].sort(
    (a, b) => new Date(b.created_at) - new Date(a.created_at)
  );

  const handleShowResources = (project) => {
    setSelectedProject(project);
  };

  const handleCloseResources = () => {
    setSelectedProject(null);
  };

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
        <h2 className="text-center mb-0" style={{ fontSize: '28px' }}>
          My Projects
        </h2>
        <div className="flex justify-center text-center mb-3">
          <svg viewBox="0 0 150 10" width="150" height="10">
            <path
              d="M0,5 Q37.5,0 75,5 T150,5"
              stroke="#d5bf9f"
              strokeWidth="2"
              fill="transparent"
            />
          </svg>
        </div>

        <Row xs={1} md={2} lg={3} className="g-4">
        {sortedProjects.slice(0, visibleCount).map((project, idx) => (
          <Col key={project.id} className="d-flex">
            <Card className={`project-card d-flex flex-column ${detailsVisible[idx] ? 'expanded' : ''}`}>
              <img
                src={project.image}
                alt={project.name}
                className="project-image"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '/HanineLogo.png';
                }}
              />
              <Card.Body className="d-flex flex-column">
                <Card.Title className="card-title">{project.name}</Card.Title>
                <Card.Subtitle className="mb-2" style={{ fontSize: '0.8rem', color: '#d5bf9f' }}>
                  {new Date(project.created_at).toLocaleDateString(undefined, {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}
                </Card.Subtitle>
                <Card.Text className="card-text card-text-bg" style={{ flexGrow: 1 }}>
                  {project.description}{' '}
                  <Button
                    variant="link"
                    className="read-btn"
                    style={{ cursor: 'pointer', color: '#a9885d', padding: 0 }}
                    onClick={() => toggleDetailsVisibility(idx)}
                  >
                    {detailsVisible[idx] ? 'Read Less' : 'Read More'}
                  </Button>
                </Card.Text>

                {detailsVisible[idx] && (
                  <Card.Text className="card-details">{project.details}</Card.Text>
                )}

                <div className="mt-auto">
                  <Card.Text className="tech-div">
                    <strong className="tech-style">Technologies:</strong> {project.techStack}
                  </Card.Text>
                  {project.link ? (
                    <Button variant="light" href={project.link} className="project-btn w-100" target="_blank">
                      View Project
                    </Button>
                  ) : project.resources?.length > 0 ? (
                    <Button variant="light" className="project-resources w-100" onClick={() => handleShowResources(project)}>
                      Show Resources
                    </Button>
                  ) : null}
                </div>
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
                style={{ height: '180px' }}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '/HanineLogo.png';
                }}
              />
              <Card.Body>
                <Card.Text className="project-next" style={{ textAlign: 'center' }}>
                  What's the next?
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Show More / Show Less Button */}
        {projects.length > 3 && (
          <div className="text-end mt-4">
            <Button className="show-more-projects" onClick={handleToggleShow}>
              {visibleCount >= projects.length ? 'Show Less' : 'Show More'}
            </Button>
          </div>
        )}

        {/* Resources Modal */}
        {selectedProject && selectedProject.resources?.length > 0 && (
          <Modal
            show={true}
            onHide={handleCloseResources}
            size="lg"
            centered
          >
            <Modal.Header closeButton className='modal-project'>
              <Modal.Title style={{fontSize:'20px'}}>Resources – {selectedProject.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Row>
                {selectedProject.resources.map((res, i) => (
                  <Col md={6} key={i} className="mb-3">
                    <Card className='h-100 project-modal'>
                      <Card.Img variant="top" src={res.src} />
                      <div className='mt-auto'>
                        <Card.Body>
                          <Card.Text className="text-center" style={{fontSize:'16px'}}>{res.title}</Card.Text>
                        </Card.Body>
                      </div>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Modal.Body>
          </Modal>
        )}
      </Container>
    </div>
  
  );
}

export default Projects;
