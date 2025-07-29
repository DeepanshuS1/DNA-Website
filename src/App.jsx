import React from 'react';
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

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
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
              <Newsletter />
              <Contact />
            </main>
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
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;