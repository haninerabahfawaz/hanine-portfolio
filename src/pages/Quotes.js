import { useState, useEffect } from 'react';
import { Container, Spinner, Alert } from 'react-bootstrap';
import axios from 'axios';
import '../Quotes.css';

const Quotes = () => {
  const [quotes, setQuotes] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const res = await axios.get('https://data-json-api.onrender.com/quotes');
        setQuotes(res.data); 
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
    fetchQuotes();
  }, []);

  useEffect(() => {
    if (quotes.length === 0) return;

    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrentIndex(prev => (prev + 1) % quotes.length);
        setFade(true);
      }, 500); 
    }, 3000); // change quote every 3 seconds

    return () => clearInterval(interval);
  }, [quotes]);

  if (isLoading) {
    return (
      <section className="py-5 text-center">
        <Spinner animation="border" role="status" variant="primary" />
        <p className="mt-3">Loading quotes content...</p>
      </section>
    );
  }

  if (fetchError) {
    return (
      <section className="py-5">
        <Container>
          <Alert variant="danger">
            <Alert.Heading>Error loading quotes section</Alert.Heading>
            <p>{fetchError}</p>
          </Alert>
        </Container>
      </section>
    );
  }

  if (!quotes) return null;

  return (
    <div className="quotes-container">
       {quotes.length > 0 && (
        <div className={`quote-text ${fade ? "fade-in" : "fade-out"}`}>
          <p>{quotes[currentIndex].text}</p>
        </div>
      )}
    </div>
  );
};

export default Quotes;
