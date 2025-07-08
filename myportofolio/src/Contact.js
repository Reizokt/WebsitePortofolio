import './Contact.css';
import github from './github.png';
import linkedin from './linkedin.png';
import gmail from './gmails.png'; 
function Contact() {
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
    {
      type: "Email",
      value: "joenath376@gmail.com", 
      icon: <img src={gmail} alt="Gmail" className="contact-icon" />,
      link: `mailto:joenath376@gmail.com?${new URLSearchParams({
        subject: "Inquiry from your Portfolio Website",
        body: "Hello Jonathan,\n\nI found your portfolio website and would like to connect about..."
      }).toString()}`
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
                  target={contact.type !== "Email" ? "_blank" : "_self"}
                  rel={contact.type !== "Email" ? "noopener noreferrer" : ""}
                >
                  {contact.value}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Contact;