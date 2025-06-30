import React, { useState, useEffect } from 'react';
import './Skills.css';

function Skills() {
    // eslint-disable-next-line no-unused-vars
    const [skillProjects, setSkillProjects] = useState([]);
    // eslint-disable-next-line no-unused-vars
    const [loading, setLoading] = useState(true); // Add this line
    // eslint-disable-next-line no-unused-vars
    const [error, setError] = useState(null);   // Add this line
    const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

    useEffect(() => {
        const fetchSkillProjects = async () => {
            try {
                const response = await fetch(`${API_URL}/api/skills`); 

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setSkillProjects(data);
            } catch (err) {
                setError(err);
                console.error("Failed to fetch skill projects:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchSkillProjects();
    }, [API_URL]);

    if (loading) {
        return <div className="loading-message">Loading skills...</div>;
    }

    if (error) {
        return <div className="error-message">Error: {error.message}</div>;
    }

    return (
        <div className="Skills">
            <div className="skills-content">
                <h1>Skills & Certifications</h1>
                <p>Here are the technologies and certifications that power my development journey</p>

                <div className="skills-grid">
                    {skillProjects.map((skillGroup, index) => (
                        <div key={skillGroup._id || index} className="skill-category">
                            <div className="skill-image">
                                <img
                                    src={skillGroup.image ? skillGroup.image : "https://via.placeholder.com/400x250/322050/FFFFFF?text=Image+Pending"}
                                    alt={skillGroup.category}
                                />
                                <div className="skill-overlay">
                                    <div className="skill-project-info">
                                        <h4>{skillGroup.projectTitle}</h4>
                                        <p>{skillGroup.description}</p>
                                    </div>
                                    {}
                                    {skillGroup.certificationLink && (
                                        <div className="skill-links"> {}
                                            <a
                                                href={skillGroup.certificationLink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="skill-link certification-link" 
                                            >
                                                View Certification
                                            </a>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="skill-content">
                                <h3>{skillGroup.category}</h3>
                                <div className="skill-items">
                                    {skillGroup.achievements && skillGroup.achievements.map((achievement, skillIndex) => (
                                        achievement.link ? (
                                            <a
                                                key={skillIndex}
                                                href={achievement.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="skill-tag skill-tag-link" 
                                            >
                                                {achievement.name}
                                            </a>
                                        ) : (
                                            <span key={skillIndex} className="skill-tag">
                                                {achievement.name}
                                            </span>
                                        )
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Skills;