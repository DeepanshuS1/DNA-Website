import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import ThemeToggle from '../ui/ThemeToggle';
import logoDark from '../../assets/images/logos/DNA-LOGO-DARK.jpeg';
import logoLight from '../../assets/images/logos/DNA-LOGO.jpeg';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolledPastHome, setIsScrolledPastHome] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  // Function to check which section is currently in view and scroll position
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'team', 'resources', 'events', 'contact'];
      const scrollPosition = window.scrollY + 150; // Offset for header height
      const homeSection = document.getElementById('home');
      
      // Check if scrolled past home section
      if (homeSection) {
        const homeBottom = homeSection.offsetTop + homeSection.offsetHeight;
        setIsScrolledPastHome(window.scrollY > homeBottom - 100);
      }

      let currentSection = 'home'; // Default to home
      
      // Find the section that's currently most visible in the viewport
      for (let i = 0; i < sections.length; i++) {
        const section = document.getElementById(sections[i]);
        if (section) {
          const sectionTop = section.offsetTop;
          const sectionBottom = sectionTop + section.offsetHeight;
          
          // Check if the section is in view (considering header offset)
          if (scrollPosition >= sectionTop - 100 && scrollPosition < sectionBottom - 100) {
            currentSection = sections[i];
            break;
          }
          // If we're past this section but haven't found the next one, use this one
          else if (scrollPosition >= sectionTop - 100) {
            currentSection = sections[i];
          }
        }
      }
      
      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Call once to set initial active section

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const linkVariants = {
    hover: { 
      scale: 1.05,
      transition: { type: "spring", stiffness: 300 }
    }
  };

  return (
    <motion.header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolledPastHome 
          ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-lg' 
          : 'bg-transparent'
      }`}
      initial="hidden"
      animate="visible"
      variants={navVariants}
      role="banner"
    >
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between h-16" role="navigation" aria-label="Main navigation">
          <motion.a 
            href="#home" 
            className="flex items-center space-x-2" 
            onClick={() => scrollToSection('home')}
            aria-label="DNA Community - Home"
          >
            <div className="w-10 h-10 rounded-lg overflow-hidden">
              <motion.img 
                key={isScrolledPastHome ? 'light' : 'dark'}
                src={isScrolledPastHome ? logoDark : logoLight} 
                alt="DNA Community Logo"
                className="w-full h-full object-cover"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ 
                  duration: 0.3, 
                  ease: "easeInOut" 
                }}
              />
            </div>
            <span className="text-xl font-bold text-gray-900 dark:text-white">DNA</span>
          </motion.a>
          
          <ul className={`hidden md:flex items-center space-x-8 ${isMenuOpen ? 'flex' : ''}`}>
            {['Home', 'About', 'Team', 'Projects', 'Resources', 'Events', 'Blog', 'Contact'].map((item, index) => (
              <motion.li 
                key={item}
                variants={linkVariants}
                whileHover="hover"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <a 
                  href={`#${item.toLowerCase()}`} 
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className={`text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 ${activeSection === item.toLowerCase() ? 'text-blue-600 dark:text-blue-400 font-semibold' : ''}`}
                >
                  {item}
                </a>
              </motion.li>
            ))}
          </ul>
          
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <motion.button 
              className="md:hidden p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300" 
              onClick={toggleMenu}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </motion.button>
          </div>
        </nav>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            className="md:hidden absolute top-16 left-0 right-0 bg-white dark:bg-gray-900 shadow-lg border-t border-gray-200 dark:border-gray-700"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            <div className="px-4 py-6 space-y-4">
              {['Home', 'About', 'Team', 'Projects', 'Resources', 'Events', 'Blog', 'Contact'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  onClick={() => {
                    scrollToSection(item.toLowerCase());
                    setIsMenuOpen(false);
                  }}
                  className={`block text-lg text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 ${
                    activeSection === item.toLowerCase() ? 'text-blue-600 dark:text-blue-400 font-semibold' : ''
                  }`}
                >
                  {item}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </motion.header>
  );
};

export default Header;
            onClick={toggleMenu}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <FiX /> : <FiMenu />}
          </motion.button>
        </nav>
      </div>
    </motion.header>
  );
};

export default Header;
