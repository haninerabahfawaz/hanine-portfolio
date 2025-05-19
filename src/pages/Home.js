import { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Image, Spinner, Alert } from 'react-bootstrap';
import { Typewriter } from 'react-simple-typewriter';
import Skills from './Skills';
import Projects from './Projects';
import Contact from './Contact';
import Quotes from './Quotes';

const AboutSection = () => {
  const [aboutInfo, setAboutInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const response = await axios.get('https://data-json-api.onrender.com/about');
        setAboutInfo(response.data);
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

    fetchAbout();
  }, []);

  if (isLoading) {
    return (
      <section className="py-5 text-center">
        <Spinner animation="border" role="status" variant="primary" />
        <p className="mt-3">Loading about content...</p>
      </section>
    );
  }

  if (fetchError) {
    return (
      <section className="py-5">
        <Container>
          <Alert variant="danger">
            <Alert.Heading>Error loading about section</Alert.Heading>
            <p>{fetchError}</p>
          </Alert>
        </Container>
      </section>
    );
  }

  if (!aboutInfo) return null;

  const {
    image,
    typewriter,
    headingPrefix,
    highlightColor,
    paragraphs
  } = aboutInfo;

  return (
    <section className="bg-light py-5">
      <Container>
        <Quotes/>
        <Row className="align-items-center">
          <Col md={6} className="text-center mb-4 mb-md-0">
            <Image
              src={image.src}
              fluid
              style={{
                maxWidth: image.style.maxWidth,
                borderRadius: image.style.borderRadius,
              }}
            />
          </Col>
          <Col md={6}>
            <h1 className="mb-3">
              {headingPrefix}{' '}
              <span style={{ color: highlightColor }}>
                <Typewriter
                  words={typewriter.words}
                  loop={typewriter.loop}
                  cursor={typewriter.cursor}
                  cursorStyle={typewriter.cursorStyle}
                  typeSpeed={typewriter.typeSpeed}
                  deleteSpeed={typewriter.deleteSpeed}
                  delaySpeed={typewriter.delaySpeed}
                />
              </span>
            </h1>
            {paragraphs.map((text, index) => (
              <p key={index} className={index === 0 ? 'lead' : 'bottomParagraph'}>
                {text}
              </p>
            ))}
          </Col>
        </Row>

        <Skills />
        <Projects />
        <Contact />
      </Container>
    </section>
  );
};

export default AboutSection;
