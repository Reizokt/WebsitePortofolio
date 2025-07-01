import './Contact.css';
import github from './github.png';
import linkedin from './linkedin.png';
// You can remove gmail.png, instagram.png, whatsapp.png if you're not using them elsewhere

function Contact() {
  // Update your contactInfo array to ONLY include LinkedIn and GitHub
  // and modify the 'Email' type if you want to keep it as a direct mailto link
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
    },
    // NEW: Add a mailto link for direct email
    {
      type: "Email",
      value: "joenath376@gmail.com", // This is your email address where they send messages
      icon: <img src={require('./gmails.png')} alt="Gmail" className="contact-icon" />, // You'll need gmail.png back if you removed it
      link: "mailto:joenath376@gmail.com?subject=Inquiry from your Portfolio Website&body=Hello Jonathan,%0A%0AI found your portfolio website and would like to connect about..."
    }
  ];

  // The state and handleSubmit for the form are no longer needed for direct email sending
  // But if you still want a *form* that sends emails (which is what we were building before),
  // then you'd keep the form and the serverless function.
  // Given your last question, it sounds like you want to abandon the form entirely for direct email.

  // If you are removing the form entirely, you can remove these state and handleSubmit parts:
  // const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  // const [statusMessage, setStatusMessage] = useState('');
  // const [isError, setIsError] = useState(false);
  // const handleChange = (e) => { ... };
  // const handleSubmit = async (e) => { ... };

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
                  // For mailto links, target="_blank" is generally fine, but not strictly necessary.
                  // For email links, rel="noopener noreferrer" isn't strictly needed as it's not a web page.
                  target={contact.type !== "Email" ? "_blank" : "_self"} // Open non-email links in new tab
                  rel={contact.type !== "Email" ? "noopener noreferrer" : ""}
                >
                  {contact.value}
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* If you want to remove the contact form and just have the mailto link,
            you would DELETE the entire <div className="contact-form-section"> here. */}
        {/* For now, I'll keep it commented out, assuming you might still want a form later. */}
        {/*
        <div className="contact-form-section">
          <h2>Send Me a Message</h2>
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name" className="form-label">Name:</label>
              <input type="text" id="name" name="name" className="form-input" placeholder="Your Name" value={formData.name} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="email" className="form-label">Email:</label>
              <input type="email" id="email" name="email" className="form-input" placeholder="your.email@example.com" value={formData.email} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="message" className="form-label">Message:</label>
              <textarea id="message" name="message" className="form-textarea" placeholder="Your message..." value={formData.message} onChange={handleChange} required></textarea>
            </div>
            <button type="submit" className="submit-button">Send Message</button>
            {statusMessage && (<p className={`status-message ${isError ? 'error' : 'success'}`}>{statusMessage}</p>)}
          </form>
        </div>
        */}
      </div>
    </div>
  );
}

export default Contact;