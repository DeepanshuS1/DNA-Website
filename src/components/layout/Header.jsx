import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiMenu, FiX } from 'react-icons/fi';
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
      className={`header ${isScrolledPastHome ? 'header-light' : ''}`}
      initial="hidden"
      animate="visible"
      variants={navVariants}
      role="banner"
    >
      <div className="container">
        <nav className="nav" role="navigation" aria-label="Main navigation">
          <motion.a 
            href="#home" 
            className="logo" 
            onClick={() => scrollToSection('home')}
            aria-label="DNA Community - Home"
          >
            <img src={isScrolledPastHome ? logoLight : logoDark} alt="DNA Community Logo" />
          </motion.a>
          <ul className={`nav-links ${isMenuOpen ? 'nav-links-mobile' : ''}`}>
            {['Home', 'About', 'Team', 'Resources', 'Events', 'Contact'].map((item, index) => (
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
                  className={activeSection === item.toLowerCase() ? 'active' : ''}
                >
                  {item}
                </a>
              </motion.li>
            ))}
          </ul>
          <motion.button 
            className="mobile-menu-btn" 
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
