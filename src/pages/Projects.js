import axios from 'axios';
import { useEffect, useState } from 'react';
import { Card, Button, Col, Row, Container, Spinner, Alert, Modal, Tabs, Tab } from 'react-bootstrap';
import { FaRocket } from 'react-icons/fa';

function Projects() {
  const [projects, setProjects] = useState([]);
  const [visibleCount, setVisibleCount] = useState(3);
  const [detailsVisible, setDetailsVisible] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [modalDetailsProject, setModalDetailsProject] = useState(null);
  const [activeModalTab, setActiveModalTab] = useState('resources');

  const sortedProjects = [...projects].sort(
    (a, b) => new Date(b.created_at) - new Date(a.created_at)
  );


  const handleShowResources = (project) => {
    const screenWidth = window.innerWidth;
    if (screenWidth >= 768) {
      // Medium and large screens
      setModalDetailsProject(project);
      setActiveModalTab('resources');
    } else {
      // Small screens
      setSelectedProject(project);
    }
  };

  const handleCloseDetailsModal = () => {
    setModalDetailsProject(null);
    setActiveModalTab('resources');
  };

  const handleCloseResources = () => {
    setSelectedProject(null);
  };

  const handleDetailsClick = (project, index) => {
    const screenWidth = window.innerWidth;
    if (screenWidth >= 768) {
      // Medium and large screens
      setModalDetailsProject(project);
      setActiveModalTab('details');
    } else {
      // Small screens
      toggleDetailsVisibility(index);
    }
  };


  const toggleDetailsVisibility = (index) => {
    setDetailsVisible((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  const handleToggleShow = () => {
    if (visibleCount >= projects.length) {
      setVisibleCount(3);
    } else {
      setVisibleCount((prev) => prev + 3);
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
                  <Card.Text className="card-text card-text-bg">
                    {project.description}{' '}
                    <Button
                      variant="link"
                      className="read-btn"
                      style={{ cursor: 'pointer', color: '#a9885d', padding: 0 }}
                      onClick={() => handleDetailsClick(project, idx)}
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
            <Card className="project-card-coming-soon">
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
              <Card.Text className="project-next text-center">
                <FaRocket className="animated-icon" />
                What's the next?
              </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {projects.length > 3 && (
          <div className="text-end mt-4">
            <Button className="show-more-projects" onClick={handleToggleShow}>
              {visibleCount >= projects.length ? 'Show Less' : 'Show More'}
            </Button>
          </div>
        )}

        {/* Resources Modal */}
        {selectedProject && selectedProject.resources?.length > 0 && (
          <Modal show onHide={handleCloseResources} size="lg" centered>
            <Modal.Header closeButton className='modal-project'>
              <Modal.Title style={{ fontSize: '20px' }}>
                Resources – {selectedProject.name}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Row>
                {selectedProject.resources.map((res, i) => (
                  <Col md={6} key={i} className="mb-3">
                    <Card className='h-100 project-modal'>
                      <Card.Img variant="top" src={res.src} />
                      <div className='mt-auto'>
                        <Card.Body>
                          <div className="mt-4">
                            <Card.Text className="text-center" style={{ fontSize: '16px' }}>
                              {res.title}
                            </Card.Text>
                          </div>
                        </Card.Body>
                      </div>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Modal.Body>
          </Modal>
        )}

        {/* Details Modal for medium/large screens */}
        {modalDetailsProject && (
          <Modal
            show={true}
            onHide={handleCloseDetailsModal}
            size="lg"
            centered
          >
            <Modal.Header closeButton className="modal-project">
              <Modal.Title style={{ fontSize: '20px' }}>
                {modalDetailsProject.name}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Tabs
              activeKey={activeModalTab}
              onSelect={(k) => setActiveModalTab(k)}
              id="project-modal-tabs"
              className="mb-3"
            >

           <Tab eventKey="details" title="Details">
              <div
                  className="d-flex align-items-center"
                  style={{ minHeight: '140px' }}
                >
                  <p
                    style={{ whiteSpace: 'pre-wrap', fontSize: '16px' }}
                    className="details-style m-0"
                  >
                    {modalDetailsProject.details || 'No additional details available.'}
                  </p>
                </div>
            </Tab>

              <Tab eventKey="resources" title="Resources">
                {modalDetailsProject.resources && modalDetailsProject.resources.length > 0 ? (
                  <Row>
                    {modalDetailsProject.resources.map((res, i) => (
                      <Col md={6} key={i} className="mb-3">
                        <Card className="h-100 d-flex flex-column project-modal">
                          <Card.Img
                              variant="top"
                              src={res.src}
                              onError={(e) => {
                                e.target.onerror = null; // Prevent infinite loop
                                e.target.src = '/HanineLogo.png'; // Fallback image
                              }}
                            />
                          <Card.Body className="d-flex flex-column justify-content-end">
                            <Card.Text className="text-center mt-auto" style={{ fontSize: '16px' }}>
                              {res.title}
                            </Card.Text>
                          </Card.Body>
                        </Card>
                      </Col>
                    ))}
                  </Row>
                ) : modalDetailsProject.link ? (
                  <div
                  className="d-flex align-items-center justify-content-center text-center"
                  style={{ minHeight: '140px', fontSize: '16px' }}
                >
                  <div>
                    No resources available. You can check the project here:{' '}
                    <a
                      href={modalDetailsProject.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="modal-link"
                    >
                      View Project
                    </a>
                  </div>
                </div>
                
                ) : (
                  <div
                    className="d-flex justify-content-center align-items-center text-muted"
                    style={{ height: '100%', minHeight: '300px' }}
                  >
                    No resources or project link available.
                  </div>
                )}
              </Tab>
            </Tabs>
          </Modal.Body>
          </Modal>
        )}
      </Container>
    </div>
  );
}

export default Projects;
