import './Contact.css';
import github from './github.png';
import linkedin from './linkedin.png';

import React, { useState } from 'react'; // Removed useRef and ReCAPTCHA import

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [statusMessage, setStatusMessage] = useState('');
  const [isError, setIsError] = useState(false);

  // No RECAPTCHA_SITE_KEY needed anymore

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatusMessage('Sending...');
    setIsError(false);

    // No reCAPTCHA token check needed

    try {
      // Endpoint remains '/api/send-email' for Vercel serverless function
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          // No recaptchaToken sent anymore
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatusMessage(data.message || 'Message sent successfully!');
        setIsError(false);
        setFormData({ name: '', email: '', message: '' }); // Clear form
        // No recaptchaRef.current.reset() needed
      } else {
        setStatusMessage(data.message || 'Failed to send message. Please try again.');
        setIsError(true);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setStatusMessage('An error occurred. Please try again later.');
      setIsError(true);
    }
  };

  const contactInfo = [
    {
      type: "LinkedIn",
      value: "linkedin.com/in/jonathan-giono-suparmo",
      icon: <img src={linkedin} alt="LinkedIn" className="contact-icon" />,
      link: "https://www.linkedin.com/in/jonathan-giono-suparmo-071406281/"
    },
    {
      type: "GitHub",
      value: "ReizoKT",
      icon: <img src={github} alt="GitHub" className="contact-icon" />,
      link: "https://github.com/Reizokt"
    }
  ];

  return (
    <div className="Contact" id="contact">
      <div className="contact-content">
        <h1>Contact Info</h1>
        <p className="contact-subtitle">Let's connect and collaborate on amazing projects</p>

        <div className="contact-grid">
          {contactInfo.map((contact, index) => (
            <div key={index} className="contact-item">
              <div className="contact-icon">
                {contact.icon}
              </div>
              <div className="contact-details">
                <h3>{contact.type}</h3>
                <a
                  href={contact.link}
                  className="contact-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {contact.value}
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Contact Form Section */}
        <div className="contact-form-section">
          <h2>Send Me a Message</h2>
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name" className="form-label">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                className="form-input"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email" className="form-label">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                className="form-input"
                placeholder="your.email@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="message" className="form-label">Message:</label>
              <textarea
                id="message"
                name="message"
                className="form-textarea"
                placeholder="Your message..."
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>

            {/* Removed reCAPTCHA component */}

            <button type="submit" className="submit-button">
              Send Message
            </button>
            {statusMessage && (
              <p className={`status-message ${isError ? 'error' : 'success'}`}>
                {statusMessage}
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default Contact;