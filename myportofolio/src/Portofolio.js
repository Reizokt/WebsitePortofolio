import React, { useState, useEffect } from 'react';
import './Porto.css';

function Portfolio() {
    // eslint-disable-next-line no-unused-vars
    const [projects, setProjects] = useState([]);
    // eslint-disable-next-line no-unused-vars
    const [loading, setLoading] = useState(true); // Add this line
    // eslint-disable-next-line no-unused-vars
    const [error, setError] = useState(null);   // Add this line
    const API_URL = process.env.REACT_APP_API_URL || 'https://website-portofolio-jogi.vercel.app/';


    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await fetch(`${API_URL}/api/projects`); // dynamic API_URL

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setProjects(data);
            } catch (err) {
                setError(err);
                console.error("Failed to fetch projects:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, [API_URL]);

    // ... rest of your Portfolio component rendering logic (as previously provided) ...

    return (
        <section id="portfolio" className="Portfolio"> {}
            <div className="portfolio-content"> {}
                <h1>My Projects</h1> {}
                <p>Explore a collection of my recent development projects, showcasing a diverse range of technologies and design principles.</p> {/* Use p to match CSS selector .Portfolio p */}

                <div className="portfolio-grid"> {}
                    {projects.map((project) => (
                        <div key={project._id} className="project-card"> {}
                            <div className="project-image"> {}
                                <img
                                    
                                    src={project.image ? project.image : "https://via.placeholder.com/400x250/ccc/000?text=Image+Pending"}
                                    alt={project.title}
                                />
                                <div className="project-overlay"> {}
                                    <div className="project-links"> {}
                                        <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="project-link github-link"> {/* Apply project-link and github-link classes */}
                                            GitHub
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="project-content"> {}
                                <h3>{project.title}</h3> {}
                                <p>{project.description}</p> {}
                                <div className="project-technologies"> {}
                                    {project.technologies.map((tech, index) => (
                                        <span key={index} className="tech-tag"> {}
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Portfolio;