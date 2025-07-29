import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FiCode, FiUsers, FiTarget, FiTrendingUp, FiAward, FiGlobe } from 'react-icons/fi';

// Move stats outside component to prevent recreation on every render
const stats = [
  { target: 1000, label: 'Active Members', suffix: '+' },
  { target: 50, label: 'Projects Completed', suffix: '+' },
  { target: 200, label: 'Success Stories', suffix: '+' },
  { target: 24, label: 'Community Support', suffix: '/7' }
];

const About = () => {
  const [counters, setCounters] = useState([0, 0, 0, 0]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    once: true, 
    amount: 0.1,  // Reduced from 0.2 to 0.1 for mobile
    margin: "0px 0px -50px 0px"  // Start animation 50px before element enters viewport
  });

  // Force visibility after component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const features = [
    {
      icon: FiCode,
      title: 'Modern Development',
      description: 'Learn cutting-edge technologies and best practices in software development.',
      color: '#3498db'
    },
    {
      icon: FiUsers,
      title: 'Community Driven',
      description: 'Connect with like-minded developers and build lasting professional relationships.',
      color: '#e74c3c'
    },
    {
      icon: FiTarget,
      title: 'Goal Oriented',
      description: 'Achieve your career goals through structured learning and mentorship programs.',
      color: '#2ecc71'
    },
    {
      icon: FiTrendingUp,
      title: 'Skill Growth',
      description: 'Continuously improve your skills through hands-on projects and workshops.',
      color: '#f39c12'
    },
    {
      icon: FiAward,
      title: 'Recognition',
      description: 'Get recognized for your contributions and achievements in the community.',
      color: '#9b59b6'
    },
    {
      icon: FiGlobe,
      title: 'Global Network',
      description: 'Join a worldwide network of developers and expand your professional reach.',
      color: '#1abc9c'
    }
  ];

  // Counter animation effect
  useEffect(() => {
    if (isInView && !isAnimating) {
      setIsAnimating(true);
      
      stats.forEach((stat, index) => {
        // Start counter animation after a delay
        const statsDelay = (index * 200 + 800); // Convert to milliseconds
        
        setTimeout(() => {
          let start = 0;
          const end = stat.target;
          const duration = 1500; // 1.5 seconds
          const increment = end / (duration / 16); // 60fps
          
          const timer = setInterval(() => {
            start += increment;
            if (start >= end) {
              start = end;
              clearInterval(timer);
            }
            
            setCounters(prev => {
              const newCounters = [...prev];
              newCounters[index] = Math.floor(start);
              return newCounters;
            });
          }, 16);
          
          return () => clearInterval(timer);
        }, statsDelay);
      });
    }
  }, [isInView, isAnimating]);

  // Fallback for mobile - start animation after 2 seconds if not triggered
  useEffect(() => {
    const fallbackTimer = setTimeout(() => {
      if (!isAnimating) {
        setIsAnimating(true);
        stats.forEach((stat, index) => {
          const statsDelay = (index * 200 + 800);
          
          setTimeout(() => {
            let start = 0;
            const end = stat.target;
            const duration = 1500;
            const increment = end / (duration / 16);
            
            const timer = setInterval(() => {
              start += increment;
              if (start >= end) {
                start = end;
                clearInterval(timer);
              }
              
              setCounters(prev => {
                const newCounters = [...prev];
                newCounters[index] = Math.floor(start);
                return newCounters;
              });
            }, 16);
          }, statsDelay);
        });
      }
    }, 2000);

    return () => clearTimeout(fallbackTimer);
  }, [isAnimating]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
        ease: "easeOut"
      }
    }
  };

  const itemVariants = {
    hidden: { y: 60, opacity: 0, scale: 0.8 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: { 
        type: "spring",
        stiffness: 200,
        damping: 20,
        duration: 0.8 
      }
    }
  };

  const cardVariants = {
    hidden: { 
      scale: 0.8, 
      opacity: 0,
      y: 50,
      rotateY: -10
    },
    visible: {
      scale: 1,
      opacity: 1,
      y: 0,
      rotateY: 0,
      transition: { 
        type: "spring",
        stiffness: 200,
        damping: 25,
        duration: 0.6 
      }
    },
    hover: {
      y: -15,
      scale: 1.05,
      rotateY: 5,
      boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
      transition: { 
        type: "spring", 
        stiffness: 300,
        damping: 20
      }
    }
  };

  const statsVariants = {
    hidden: { scale: 0.5, opacity: 0, rotateX: -90 },
    visible: {
      scale: 1,
      opacity: 1,
      rotateX: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20,
        duration: 0.8
      }
    }
  };

  const titleVariants = {
    hidden: { opacity: 0, y: -50, scale: 0.8 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { 
        type: "spring",
        stiffness: 200,
        damping: 20,
        duration: 0.8
      }
    }
  };

  return (
    <section id="about" className="section about" aria-labelledby="about-title" ref={ref}>
      {/* Enhanced Background decorative elements */}
      <div className="about-background">
        <motion.div 
          className="bg-shape bg-shape-1"
          animate={{ 
            rotate: [0, 360],
            scale: [1, 1.3, 1],
            opacity: [0.05, 0.15, 0.05]
          }}
          transition={{ 
            duration: 25, 
            repeat: Infinity, 
            ease: "linear" 
          }}
        />
        <motion.div 
          className="bg-shape bg-shape-2"
          animate={{ 
            rotate: [360, 0],
            scale: [1, 0.7, 1],
            opacity: [0.05, 0.12, 0.05]
          }}
          transition={{ 
            duration: 20, 
            repeat: Infinity, 
            ease: "linear" 
          }}
        />
        <motion.div 
          className="bg-shape bg-shape-3"
          animate={{ 
            rotate: [0, -360],
            scale: [1, 1.4, 1],
            opacity: [0.05, 0.18, 0.05]
          }}
          transition={{ 
            duration: 30, 
            repeat: Infinity, 
            ease: "linear" 
          }}
        />
      </div>

      <div className="container">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          whileInView="visible"
          viewport={{ 
            once: true, 
            amount: 0.1,
            margin: "0px 0px -100px 0px"
          }}
          style={{
            opacity: isVisible ? 1 : undefined,
            visibility: isVisible ? 'visible' : undefined
          }}
        >
          <motion.h2 
            id="about-title" 
            className="section-title"
            variants={titleVariants}
            whileHover={{ 
              scale: 1.05,
              textShadow: "0px 0px 8px rgba(52, 152, 219, 0.3)"
            }}
          >
            About DNA Community
          </motion.h2>
          <motion.p 
            className="section-subtitle"
            variants={itemVariants}
          >
            Developers of Next-Gen Applications - Where Innovation Meets Community
          </motion.p>

          <div className="about-hero">
            <motion.div className="about-main-content" variants={itemVariants}>
              <h3>Building the Future, One Developer at a Time</h3>
              <p>
                DNA (Developers of Next-Gen Applications) is more than just a coding community—we're 
                a movement of passionate technologists dedicated to shaping the future of software development. 
                Our mission is to create an inclusive ecosystem where developers at every level can learn, 
                grow, and contribute to meaningful projects that make a real difference.
              </p>
            </motion.div>

            <motion.div className="about-stats" variants={itemVariants}>
              {stats.map((stat, index) => (
                <motion.div 
                  key={index}
                  className="stat-item"
                  variants={statsVariants}
                  whileHover={{ 
                    scale: 1.1,
                    y: -5,
                    boxShadow: "0 10px 25px rgba(52, 152, 219, 0.2)"
                  }}
                >
                  <motion.span 
                    className="stat-number"
                    key={counters[index]}
                    initial={{ scale: 1.2 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <motion.span
                      animate={{ 
                        textShadow: [
                          "0px 0px 0px rgba(52, 152, 219, 0)",
                          "0px 0px 10px rgba(52, 152, 219, 0.6)",
                          "0px 0px 0px rgba(52, 152, 219, 0)"
                        ]
                      }}
                      transition={{ 
                        duration: 2, 
                        repeat: Infinity,
                        delay: index * 0.5
                      }}
                    >
                      {counters[index]}{stat.suffix}
                    </motion.span>
                  </motion.span>
                  <span className="stat-label">{stat.label}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <motion.div className="about-features" variants={containerVariants}>
            <motion.h3 
              className="features-title" 
              variants={itemVariants}
              whileHover={{ 
                scale: 1.02,
                textShadow: "0px 0px 8px rgba(46, 204, 113, 0.3)"
              }}
            >
              Why Choose DNA Community?
            </motion.h3>
            <div className="features-grid">
              {features.map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <motion.div 
                    key={index}
                    variants={cardVariants}
                    whileHover="hover"
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="feature-card">
                      <motion.div
                        className="feature-icon-wrapper"
                        whileHover={{ 
                          rotate: 360,
                          scale: 1.2
                        }}
                        transition={{ duration: 0.6 }}
                      >
                        <div 
                          className="feature-icon" 
                          style={{ 
                            color: feature.color,
                            background: `${feature.color}15`,
                            border: `2px solid ${feature.color}30`
                          }}
                        >
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ 
                              delay: index * 0.1 + 0.5,
                              type: "spring",
                              stiffness: 200
                            }}
                          >
                            <IconComponent size={32} />
                          </motion.div>
                        </div>
                      </motion.div>
                      
                      <motion.h4
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 + 0.7 }}
                        whileHover={{ 
                          color: feature.color,
                          scale: 1.05
                        }}
                      >
                        {feature.title}
                      </motion.h4>
                      
                      <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 + 0.9 }}
                      >
                        {feature.description}
                      </motion.p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          <motion.div className="about-vision" variants={itemVariants}>
            <div className="vision-content">
              <motion.h3
                initial={{ opacity: 0, y: -30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, type: "spring" }}
                viewport={{ once: true }}
                whileHover={{ 
                  scale: 1.02,
                  textShadow: "0px 0px 8px rgba(155, 89, 182, 0.3)"
                }}
              >
                Our Vision
              </motion.h3>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              >
                We envision a world where technology serves humanity's greatest challenges. 
                Through collaborative development, knowledge sharing, and innovative thinking, 
                our community members are building applications that transform industries, 
                improve lives, and create a more connected world.
              </motion.p>
              <div className="vision-highlights">
                {[
                  { icon: '🚀', text: 'Innovation First' },
                  { icon: '🤝', text: 'Collaboration Always' },
                  { icon: '🎯', text: 'Impact Driven' }
                ].map((highlight, index) => (
                  <motion.div 
                    key={index}
                    className="highlight"
                    initial={{ opacity: 0, scale: 0.5, rotateY: -180 }}
                    whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
                    transition={{ 
                      duration: 0.8, 
                      delay: index * 0.2 + 0.4,
                      type: "spring",
                      stiffness: 200
                    }}
                    viewport={{ once: true }}
                    whileHover={{ 
                      scale: 1.1,
                      y: -5,
                      boxShadow: "0 10px 20px rgba(0,0,0,0.1)"
                    }}
                  >
                    <motion.span 
                      className="highlight-icon"
                      animate={{ 
                        rotate: [0, 10, -10, 0]
                      }}
                      transition={{ 
                        duration: 2, 
                        repeat: Infinity,
                        delay: index * 0.5
                      }}
                    >
                      {highlight.icon}
                    </motion.span>
                    <span>{highlight.text}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
