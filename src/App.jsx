import React from 'react';
import { Header, Footer } from './components/layout';
import { 
  Hero, 
  Goals, 
  About, 
  Team, 
  Resources, 
  Events, 
  Contact 
} from './components/sections';

const App = () => {
  return (
    <div className="App">
      <Header />
      <main id="main-content">
        <Hero />
        <Goals />
        <About />
        <Team />
        <Resources />
        <Events />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default App;
