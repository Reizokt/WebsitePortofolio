import './Contact.css';
import github from './github.png';
import linkedin from './linkedin.png';
import gmail from './gmails.png'; // Make sure you still have this image if you want to use it for the email icon

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
    // Add the direct mailto link for Email
    {
      type: "Email",
      value: "joenath376@gmail.com", // This is your email address
      icon: <img src={gmail} alt="Gmail" className="contact-icon" />,
      link: "mailto:joenath376@gmail.com?subject=Inquiry from your Portfolio Website&body=Hello Jonathan,%0A%0AI found your portfolio website and would like to connect about..."
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
                  // Open non-email links in new tab, mailto opens client
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