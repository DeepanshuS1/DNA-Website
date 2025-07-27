import React, { useState, useEffect, Suspense } from 'react';
import { motion } from 'framer-motion';
import { FiArrowDown, FiUsers, FiCode, FiDatabase, FiGlobe, FiCpu, FiTerminal } from 'react-icons/fi';
import { SiJavascript, SiPython, SiReact, SiNodedotjs, SiGit, SiDocker, SiTypescript, SiMongodb } from 'react-icons/si';

const Hero = () => {
  const [symbolPositions, setSymbolPositions] = useState([]);

  // Generate random positions for symbols and update them periodically
  useEffect(() => {
    const generateRandomPositions = () => {
      const positions = [];
      
      // Define zones with bias towards sides/edges (center zones have lower probability)
      const sideZones = [
        { topMin: 5, topMax: 35, leftMin: 0, leftMax: 15 },      // Far left top
        { topMin: 5, topMax: 35, leftMin: 85, leftMax: 100 },    // Far right top
        { topMin: 30, topMax: 70, leftMin: 0, leftMax: 12 },     // Far left middle
        { topMin: 30, topMax: 70, leftMin: 88, leftMax: 100 },   // Far right middle
        { topMin: 65, topMax: 90, leftMin: 0, leftMax: 15 },     // Far left bottom
        { topMin: 65, topMax: 90, leftMin: 85, leftMax: 100 },   // Far right bottom
        { topMin: 5, topMax: 25, leftMin: 15, leftMax: 35 },     // Left-side top
        { topMin: 5, topMax: 25, leftMin: 65, leftMax: 85 },     // Right-side top
        { topMin: 75, topMax: 95, leftMin: 15, leftMax: 35 },    // Left-side bottom
        { topMin: 75, topMax: 95, leftMin: 65, leftMax: 85 },    // Right-side bottom
      ];
      
      // Center zones (rare appearance)
      const centerZones = [
        { topMin: 20, topMax: 40, leftMin: 40, leftMax: 60 },    // Top center
        { topMin: 60, topMax: 80, leftMin: 40, leftMax: 60 },    // Bottom center
      ];
      
      // Combine zones with weighted selection (80% sides, 20% center)
      const allZones = [...sideZones, ...sideZones, ...centerZones]; // Duplicate side zones for higher probability
      
      // Shuffle and select 8 zones
      const shuffledZones = allZones.sort(() => Math.random() - 0.5).slice(0, 8);
      
      shuffledZones.forEach(zone => {
        const top = Math.floor(Math.random() * (zone.topMax - zone.topMin)) + zone.topMin;
        const left = Math.floor(Math.random() * (zone.leftMax - zone.leftMin)) + zone.leftMin;
        positions.push({ top: `${top}%`, left: `${left}%` });
      });
      
      return positions;
    };

    // Set initial positions
    setSymbolPositions(generateRandomPositions());

    // Update positions every 3.5 seconds (slower for smoother feel)
    const interval = setInterval(() => {
      setSymbolPositions(generateRandomPositions());
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const buttonVariants = {
    hover: { 
      scale: 1.05,
      boxShadow: "0 20px 40px rgba(255, 255, 255, 0.3)",
      transition: { type: "spring", stiffness: 300 }
    },
    tap: { scale: 0.95 }
  };

  const floatingVariants = {
    animate: {
      y: [0, -15, 0],
      rotate: [0, 3, -3, 0],
      transition: {
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const positionChangeVariants = {
    animate: {
      transition: {
        duration: 1.2,
        ease: "easeInOut"
      }
    }
  };

  return (
    <section id="home" className="hero" role="banner" aria-labelledby="hero-title">
      <div className="container">
        <motion.div 
          className="hero-content hero-3d-content"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div className="hero-floating-icons" aria-hidden="true">
            {symbolPositions.length > 0 && (
              <>
                <motion.div 
                  variants={floatingVariants} 
                  animate={{
                    ...floatingVariants.animate,
                    top: symbolPositions[0]?.top,
                    left: symbolPositions[0]?.left,
                  }}
                  style={{ 
                    position: 'absolute'
                  }}
                  transition={{ 
                    y: floatingVariants.animate.transition,
                    rotate: floatingVariants.animate.transition,
                    top: { duration: 2, ease: "easeInOut" },
                    left: { duration: 2, ease: "easeInOut" }
                  }}
                >
                  <SiJavascript size={40} />
                </motion.div>
                <motion.div 
                  variants={floatingVariants} 
                  animate={{
                    ...floatingVariants.animate,
                    top: symbolPositions[1]?.top,
                    left: symbolPositions[1]?.left,
                  }}
                  style={{ 
                    animationDelay: '1.5s',
                    position: 'absolute'
                  }}
                  transition={{ 
                    y: floatingVariants.animate.transition,
                    rotate: floatingVariants.animate.transition,
                    top: { duration: 2, ease: "easeInOut", delay: 0.3 },
                    left: { duration: 2, ease: "easeInOut", delay: 0.3 }
                  }}
                >
                  <SiPython size={38} />
                </motion.div>
                <motion.div 
                  variants={floatingVariants} 
                  animate={{
                    ...floatingVariants.animate,
                    top: symbolPositions[2]?.top,
                    left: symbolPositions[2]?.left,
                  }}
                  style={{ 
                    animationDelay: '3s',
                    position: 'absolute'
                  }}
                  transition={{ 
                    y: floatingVariants.animate.transition,
                    rotate: floatingVariants.animate.transition,
                    top: { duration: 2, ease: "easeInOut", delay: 0.6 },
                    left: { duration: 2, ease: "easeInOut", delay: 0.6 }
                  }}
                >
                  <SiReact size={36} />
                </motion.div>
                <motion.div 
                  variants={floatingVariants} 
                  animate={{
                    ...floatingVariants.animate,
                    top: symbolPositions[3]?.top,
                    left: symbolPositions[3]?.left,
                  }}
                  style={{ 
                    animationDelay: '4.5s',
                    position: 'absolute'
                  }}
                  transition={{ 
                    y: floatingVariants.animate.transition,
                    rotate: floatingVariants.animate.transition,
                    top: { duration: 2, ease: "easeInOut", delay: 0.9 },
                    left: { duration: 2, ease: "easeInOut", delay: 0.9 }
                  }}
                >
                  <SiNodedotjs size={35} />
                </motion.div>
                <motion.div 
                  variants={floatingVariants} 
                  animate={{
                    ...floatingVariants.animate,
                    top: symbolPositions[4]?.top,
                    left: symbolPositions[4]?.left,
                  }}
                  style={{ 
                    animationDelay: '6s',
                    position: 'absolute'
                  }}
                  transition={{ 
                    y: floatingVariants.animate.transition,
                    rotate: floatingVariants.animate.transition,
                    top: { duration: 2, ease: "easeInOut", delay: 1.2 },
                    left: { duration: 2, ease: "easeInOut", delay: 1.2 }
                  }}
                >
                  <SiGit size={34} />
                </motion.div>
                <motion.div 
                  variants={floatingVariants} 
                  animate={{
                    ...floatingVariants.animate,
                    top: symbolPositions[5]?.top,
                    left: symbolPositions[5]?.left,
                  }}
                  style={{ 
                    animationDelay: '7.5s',
                    position: 'absolute'
                  }}
                  transition={{ 
                    y: floatingVariants.animate.transition,
                    rotate: floatingVariants.animate.transition,
                    top: { duration: 2, ease: "easeInOut", delay: 1.5 },
                    left: { duration: 2, ease: "easeInOut", delay: 1.5 }
                  }}
                >
                  <SiDocker size={33} />
                </motion.div>
                {symbolPositions[6] && (
                  <motion.div 
                    variants={floatingVariants} 
                    animate={{
                      ...floatingVariants.animate,
                      top: symbolPositions[6]?.top,
                      left: symbolPositions[6]?.left,
                    }}
                    style={{ 
                      animationDelay: '9s',
                      position: 'absolute'
                    }}
                    transition={{ 
                      y: floatingVariants.animate.transition,
                      rotate: floatingVariants.animate.transition,
                      top: { duration: 2, ease: "easeInOut", delay: 1.8 },
                      left: { duration: 2, ease: "easeInOut", delay: 1.8 }
                    }}
                  >
                    <SiTypescript size={32} />
                  </motion.div>
                )}
                {symbolPositions[7] && (
                  <motion.div 
                    variants={floatingVariants} 
                    animate={{
                      ...floatingVariants.animate,
                      top: symbolPositions[7]?.top,
                      left: symbolPositions[7]?.left,
                    }}
                    style={{ 
                      animationDelay: '10.5s',
                      position: 'absolute'
                    }}
                    transition={{ 
                      y: floatingVariants.animate.transition,
                      rotate: floatingVariants.animate.transition,
                      top: { duration: 2, ease: "easeInOut", delay: 2.1 },
                      left: { duration: 2, ease: "easeInOut", delay: 2.1 }
                    }}
                  >
                    <SiMongodb size={31} />
                  </motion.div>
                )}
              </>
            )}
          </motion.div>

          <motion.h1 id="hero-title" variants={itemVariants}>
            &lt;DNA /&gt;
          </motion.h1>
          
          <motion.p className="hero-subtitle" variants={itemVariants}>
            Developers of Next-Gen Applications
          </motion.p>
          
          <motion.div className="hero-description" variants={itemVariants}>
            <div>
              <p>Welcome to DNA Community - where innovation meets collaboration.</p>
              <p>We develop cutting-edge applications, build professional networks, and achieve career goals in tech.</p>
              <p>Ready to build something amazing with us?</p>
            </div>
          </motion.div>
          
          <motion.div className="hero-cta-wrapper" variants={itemVariants}>
            <motion.a 
              href="#about" 
              className="cta-button"
              onClick={() => scrollToSection('about')}
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              git clone about
            </motion.a>
            <motion.a 
              href="#contact" 
              className="cta-button secondary"
              onClick={() => scrollToSection('contact')}
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              npm install community
            </motion.a>
          </motion.div>

          <motion.div 
            className="scroll-indicator"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <FiArrowDown size={24} />
            </motion.div>
            <p>// scroll to explore more</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
