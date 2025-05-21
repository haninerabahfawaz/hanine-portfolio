import { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FiSend } from 'react-icons/fi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Contact = () => {

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const payload = {
      fullName,
      email,
      message
    };
  
    try {
      const res = await fetch('https://backendemail-w61m.onrender.com/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
  
      const data = await res.json();
  
      if (res.ok) {
        toast.success(data.message);
      } else {
        toast.error(data.message || "Failed to send message.");
      }
  
      setFullName('');
      setEmail('');
      setMessage('');
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong.");
    }
  };
  
  return (
    <div className="py-5">
      <ToastContainer position="top-center" />
      <Container>
        <h2 className="text-center mb-0 contact-header">
            Contact Me
          </h2>
          <div className="flex justify-center text-center mb-3">
            <svg
              viewBox="0 0 150 10"
              width="150"
              height="10"
            >
              <path
                d="M0,5 Q37.5,0 75,5 T150,5"
                stroke="#d5bf9f"
                strokeWidth="2"
                fill="transparent"
              />
            </svg>
          </div>
        <section className="contact-form py-5">

          <form method='post' onSubmit={handleSubmit}>
            <Row>
              <Col md={6} className="mb-4 mb-md-0">
                  <label>Full Name *</label>
                  <input type="text" name="fullName"
                   value={fullName}
                   onChange={(e) => setFullName(e.target.value)}
                  required/>
              </Col>

              <Col md={6} className="mb-4 mb-md-0">
                  <label>Email *</label>
                  <input type="text" name="email" placeholder="example@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required/>
              </Col>
            </Row>

            <Row>
              <Col md={12} className="mb-4 mb-md-0">
                  <label>Message *</label>
                  <textarea
                    name="message"
                    placeholder="Your Message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                  />
              </Col>
            </Row>

            <div className="submit-container">
              <button type="submit" className="submit-button">
                Send Message <FiSend style={{ marginLeft: '5px' }} />
              </button>
            </div>

          </form>
        </section>   
      </Container>
    </div>
  )
}

export default Contact;
