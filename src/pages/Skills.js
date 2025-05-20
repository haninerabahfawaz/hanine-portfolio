import { useState, useEffect } from 'react';
import { Container, Row, Col, ProgressBar, Button, Spinner, Alert } from 'react-bootstrap';
import { FaHtml5, FaCss3Alt, FaJs, FaReact, FaPhp, FaNodeJs, FaGitAlt, FaJava, FaLinux, FaDatabase, FaCogs } from 'react-icons/fa';
import { SiMysql, SiDocker } from 'react-icons/si';
import axios from 'axios';

function Skills() {
  const [skills, setSkills] = useState(null);
  const [visibleCount, setVisibleCount] = useState(6);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);

  useEffect(() => {
    const iconMapping = {
      FaHtml5: <FaHtml5 />,
      FaCss3Alt: <FaCss3Alt />,
      FaJs: <FaJs />,
      FaReact: <FaReact />,
      FaPhp: <FaPhp />,
      FaNodeJs: <FaNodeJs />,
      FaGitAlt: <FaGitAlt />,
      FaJava: <FaJava />,
      FaLinux: <FaLinux />,
      SiMysql: <SiMysql />,
      SiDocker: <SiDocker />,
      FaDatabase: <FaDatabase />,
      FaCogs: <FaCogs />,
    };
  
    const fetchSkills = async () => {
      try {
        const res = await axios.get('https://data-json-api.onrender.com/skills');
        const skillsWithIcons = res.data.map(skill => ({
          ...skill,
          icon: iconMapping[skill.icon] || null,
        }));
        setSkills(skillsWithIcons);
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
  
    fetchSkills();
  }, []);
  

  if (isLoading) {
    return (
      <section className="py-5 text-center">
        <Spinner animation="border" role="status" variant="primary" />
        <p className="mt-3">Loading skills content...</p>
      </section>
    );
  }

  if (fetchError) {
    return (
      <section className="py-5">
        <Container>
          <Alert variant="danger">
            <Alert.Heading>Error loading skills section</Alert.Heading>
            <p>{fetchError}</p>
          </Alert>
        </Container>
      </section>
    );
  }

  const handleShowMore = () => setVisibleCount(prev => prev + 6);
  const handleShowLess = () => setVisibleCount(6);

  if (!skills) return null; // Or render a loader

  const isAllVisible = visibleCount >= skills.length;

  return (
    <section className="skills-section py-5">
      <Container>
      
      <h2 className="text-center mb-0" style={{ fontSize: '28px' }}>
        My Skills
      </h2>
      <div className="flex justify-center text-center mb-3">
        <svg
          viewBox="0 0 150 20"
          width="150"
          height="20"
        >
          <path
            d="M0,5 Q37.5,0 75,5 T150,5"
            stroke="#d5bf9f"
            strokeWidth="2"
            fill="transparent"
          />
        </svg>
      </div>

        <Row>
          {skills.slice(0, visibleCount).map((skill, index) => (
            <Col md={6} className="mb-4" key={index}>
              <div className="d-flex align-items-center mb-2">
                <div className="me-3 skill-icon" style={{ fontSize: '30px' }}>
                  {skill.icon}
                </div>
                <strong>{skill.name}</strong>
              </div>
              <ProgressBar
                now={parseInt(skill.level)}
                label={`${skill.level}%`}
                className="custom-progress"
              />
            </Col>
          ))}
        </Row>

        {skills.length > 6 && (
          <div className="text-end mt-4">
            <Button className='show-more-skills' onClick={isAllVisible ? handleShowLess : handleShowMore}>
              {isAllVisible ? 'Show Less' : 'Show More'}
            </Button>
          </div>
        )}
      </Container>
    </section>
  );
}

export default Skills;
