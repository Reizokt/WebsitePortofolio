import './Home.css';
import Profile_Picture from './Profile_Picture.png'; 

function Home() {
  return (
    <div className="Home">
      <div className="home-content">
        <div className="home-text">
          <h1>Jonathan Giono Suparmo</h1>
          <h2>Developer</h2>
          <button className="go-there-btn">
            <a href ="#about" style={{ textDecoration: 'none' }}>Go There →</a>
          </button>
        </div>
        <div className="home-visual">
          <img src={Profile_Picture} alt="Profile" /> 
        </div>
      </div>
    </div>
  );
}

export default Home;