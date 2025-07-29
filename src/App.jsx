import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
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
  Contact,
  Newsletter 
} from './components/sections';
import AuthModal from './components/auth/AuthModal';
import ParticleBackground from './components/ui/ParticleBackground';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const HomePage = () => (
  <main id="main-content" className="relative min-h-screen">
    <ParticleBackground />
    <div className="relative z-10">
      <Hero />
      <Goals />
      <About />
      <Team />
      <Projects />
      <Resources />
      <Events />
      <Blog />
      <Newsletter />
      <Contact />
    </div>
  </main>
);

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <Router>
            <div className="App bg-white dark:bg-gray-900 transition-colors duration-300 min-h-screen">
              <Header />
              
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<HomePage />} />
                <Route path="/team" element={<HomePage />} />
                <Route path="/projects" element={<HomePage />} />
                <Route path="/events" element={<HomePage />} />
                <Route path="/blog" element={<HomePage />} />
                <Route path="/contact" element={<HomePage />} />
              </Routes>
              
              <Footer />
              <AuthModal />
              
              {/* Toast notifications */}
              <Toaster
                position="top-right"
                toastOptions={{
                  duration: 4000,
                  style: {
                    background: 'var(--toast-bg)',
                    color: 'var(--toast-color)',
                    border: '1px solid var(--toast-border)',
                  },
                  success: {
                    iconTheme: {
                      primary: '#10b981',
                      secondary: '#fff',
                    },
                  },
                  error: {
                    iconTheme: {
                      primary: '#ef4444',
                      secondary: '#fff',
                    },
                  },
                }}
              />
            </div>
          </Router>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;