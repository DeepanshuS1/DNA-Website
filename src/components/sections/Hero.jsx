import React, { useState, useEffect, Suspense } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Users, Code, Database, Globe, Cpu, Terminal, Github, ExternalLink } from 'lucide-react';
import { SiJavascript, SiPython, SiReact, SiNodedotjs, SiGit, SiDocker, SiTypescript, SiMongodb } from 'react-icons/si';

// DNA Logo Component
const DNA = () => (
  <div className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
    DNA
  </div>
);

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
    <section id="home" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900 relative overflow-hidden transition-colors duration-300" role="banner" aria-labelledby="hero-title">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-gray-50 dark:bg-gray-900" 
             style={{
               backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
               backgroundSize: '60px 60px'
             }}>
        </div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="text-center max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Floating Tech Icons */}
          <motion.div className="absolute inset-0 pointer-events-none" aria-hidden="true">
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
                      position: 'absolute',
                      color: '#10b981'
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

          <motion.h1 id="hero-title" variants={itemVariants} className="mb-6">
            <DNA />
          </motion.h1>
          
          <motion.p className="text-2xl md:text-3xl text-gray-600 dark:text-gray-300 mb-8" variants={itemVariants}>
            Developers of Next-Gen Applications
          </motion.p>
          
          <motion.div className="max-w-2xl mx-auto mb-12" variants={itemVariants}>
            <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-4">
              Welcome to DNA Community - where innovation meets collaboration.
            </p>
            <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300">
              We develop cutting-edge applications, build professional networks, and achieve career goals in tech.
            </p>
          </motion.div>
          
          <motion.div className="flex flex-col sm:flex-row gap-4 justify-center mb-16" variants={itemVariants}>
            <motion.a 
              href="#about" 
              className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors duration-200"
              onClick={() => scrollToSection('about')}
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <Code className="w-5 h-5 mr-2" />
              Explore Community
            </motion.a>
            <motion.a 
              href="https://github.com/DNA-DEVELOPERS-DEV" 
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-4 bg-gray-900 dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-100 text-white dark:text-gray-900 rounded-lg font-semibold transition-colors duration-200"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <Github className="w-5 h-5 mr-2" />
              View Projects
            </motion.a>
          </motion.div>

          <motion.div 
            className="flex flex-col items-center text-gray-500 dark:text-gray-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ArrowDown className="w-6 h-6" />
            </motion.div>
            <p className="text-sm mt-2 font-mono">// scroll to explore more</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;