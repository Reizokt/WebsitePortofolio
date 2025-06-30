import React, { useState, useEffect } from 'react';
import './Porto.css';

function Portfolio() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Define API_URL based on environment variable (for Docker/production)
    // Fallback to localhost for direct local npm start development
    const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await fetch(`${API_URL}/api/projects`); // Use the dynamic API_URL

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
    }, []);

    // ... rest of your Portfolio component rendering logic (as previously provided) ...

    return (
        <section id="portfolio" className="Portfolio"> {/* Apply the main Portfolio class from Porto.css */}
            <div className="portfolio-content"> {/* Apply the portfolio-content class from Porto.css */}
                <h1>My Projects</h1> {/* Use h1 to match CSS selector .Portfolio h1 */}
                <p>Explore a collection of my recent development projects, showcasing a diverse range of technologies and design principles.</p> {/* Use p to match CSS selector .Portfolio p */}

                <div className="portfolio-grid"> {/* Apply the portfolio-grid class from Porto.css */}
                    {projects.map((project) => (
                        <div key={project._id} className="project-card"> {/* Apply the project-card class from Porto.css */}
                            <div className="project-image"> {/* Apply the project-image class from Porto.css */}
                                <img
                                    // Conditional src: use project.image if valid, else use a fallback placeholder
                                    src={project.image ? project.image : "https://via.placeholder.com/400x250/ccc/000?text=Image+Pending"}
                                    alt={project.title}
                                />
                                <div className="project-overlay"> {/* Apply the project-overlay class from Porto.css */}
                                    <div className="project-links"> {/* Apply the project-links class from Porto.css */}
                                        <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="project-link github-link"> {/* Apply project-link and github-link classes */}
                                            GitHub
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="project-content"> {/* Apply the project-content class from Porto.css */}
                                <h3>{project.title}</h3> {/* Matches .project-content h3 */}
                                <p>{project.description}</p> {/* Matches .project-content p */}
                                <div className="project-technologies"> {/* Apply the project-technologies class from Porto.css */}
                                    {project.technologies.map((tech, index) => (
                                        <span key={index} className="tech-tag"> {/* Apply the tech-tag class from Porto.css */}
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