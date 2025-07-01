import './About.css';

function Aboutme() {
  return (
    <div className="Aboutme" id="about"> 
      <div className="about-content">
        <h1>About me</h1>
        <p>Hello There ... My name is Jonathan GS People called me Jogi for short this is my webpage containing my project & Skills. I am very passionate and dedicated about my work in the fields of Artificial Intellegence,Machine Learning,Web development & etc. This Website would showcases my crations and studies across various projects </p>
      </div>

      <div className="experience">
        <h2>Experience's</h2> 
        
        
        <div className="experience-grid">
          
          <div className="experience-item">
            <h3>Highschool </h3>
            <p className="experience-meta">SMA Nasinal Anglo | Jul 2020 - Jun 2023 (Student)</p>
            <ul className="experience-description">
              <li>An active student in School </li>
              <li>Part of the science class</li>
              <li>Acumulative Grade: 84.57</li>
            </ul>
          </div>

          
          <div className="experience-item">
            <h3>Collage</h3>
            <p className="experience-meta">President University | Agu 2023 - Today (Student)</p>
            <ul className="experience-description">
              <li>Active student in President University</li>
              <li>Part of Inforamtics study Program</li>
              <li>Concetration in: Artificial Intellegence</li>
              <li>Cumulative GPA: 3.9</li>
            </ul>
          </div>

          <div className="experience-item">
            <h3>Volunteer planting mangrove (MAGIC)</h3>
            <p className="experience-meta">President University | Agu 2023 - Today (Volunteer)</p>
            <ul className="experience-description">
              <li>Part of the Design Team</li>
              <li>Part of The main planting team</li>
            </ul>
          </div>

                    <div className="experience-item">
            <h3>Game tester</h3>
            <p className="experience-meta">Freelance | Jan 2025 - Jan 2025 (Tester)</p>
            <ul className="experience-description">
              <li>Game tester</li>
              <li>Bug Hunter</li>
            </ul>
          </div>


        </div>
      </div>
    </div>
  );
}

export default Aboutme;