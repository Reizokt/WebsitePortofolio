import './Contact.css';
import github from './github.png'; 
import linkedin from './linkedin.png'; 
import gmail from './gmails.png'; 
import instagram from './instagram.png'; 
import wa from './whatsapp.png'; 

function Contact() {
  const contactInfo = [
    {
      type: "Phone",
      value: "082297476750",
      icon: <img src={wa} alt="Gmail" className="contact-icon" />,
      link: "https://wa.me/qr/WNVI6MQUYZT4K1"
    },
    {
      type: "Email",
      value: "joenath376@gmail.com",
      icon: <img src={gmail} alt="Gmail" className="contact-icon" />,
      link: "joenath376@gmail.com"
    },
    {
      type: "Instagram",
      value: "@joenathan_g",
      icon: <img src={instagram} alt="Gmail" className="contact-icon" />,
      link: "https://www.instagram.com/joenathan_g/"
    },
    {
      type: "LinkedIn",
      value: "linkedin.com/in/yourprofile",
      icon: <img src={linkedin} alt="Linkedin" className="contact-icon" />,
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
    <div className="Contact">
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
                  target={contact.type !== "Phone" && contact.type !== "Email" ? "_blank" : "_self"}
                  rel={contact.type !== "Phone" && contact.type !== "Email" ? "noopener noreferrer" : ""}
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