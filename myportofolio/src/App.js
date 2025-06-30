import React, { useState } from 'react';
import './App.css';
import Aboutme from './Aboutme';
import Nav from './Nav';
import Contact from './Contact';
import Portfolio from './Portofolio';
import Skills from './Skills';
import Home from './Home';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="app">
      <Nav />
      <section id = "Home">
        <Home/>
      </section>
      <section id="about">
        <Aboutme />
      </section>
      <section id="skills">
        <Skills />
      </section>
      <section id="portfolio">
        <Portfolio />
      </section>
      <section id="contact">
        <Contact />
      </section>
    </div>
  );
}

export default App;
