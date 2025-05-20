import { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FiSend } from 'react-icons/fi';
import emailjs from 'emailjs-com';

const Contact = () => {

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [messageBody, setMessageBody] = useState('');

  const handleSubmit = (e) =>{
    e.preventDefault();

    const serviceID = 'service_1h0munk';
    const templateID = 'template_cisk586';
    const userID = 'x7mZCKYP4hIcsw37W';

    const templateParams = {
      fullName,
      email,
      message: messageBody
    };

    emailjs.send(serviceID, templateID, templateParams, userID)
      .then((response) => {
        alert("Message sent successfully!");
        setFullName('');
        setEmail('');
        setMessageBody('');
      }, (error) => {
        console.error("FAILED...", error);
        alert("Failed to send message.");
      });
  }

  return (
    <div className="py-5">
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
                    value={messageBody}
                    onChange={(e) => setMessageBody(e.target.value)}
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
