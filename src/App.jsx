import React from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { Header, Footer } from './components/layout';
import { 
  Hero, 
  Goals, 
  About, 
  Team, 
  Projects,
  Resources, 
  Events, 
  Blog,
  Contact 
} from './components/sections';

const App = () => {
  return (
    <ThemeProvider>
      <div className="App bg-white dark:bg-gray-900 transition-colors duration-300">
        <Header />
        <main id="main-content" className="pt-16">
          <Hero />
          <Goals />
          <About />
          <Team />
          <Projects />
          <Resources />
          <Events />
          <Blog />
          <Contact />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default App;
