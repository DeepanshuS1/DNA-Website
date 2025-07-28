import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import { FiCode, FiUsers, FiTarget, FiArrowUp } from 'react-icons/fi';

const Goals = () => {
  const [counters, setCounters] = useState([0, 0, 0]);
  const [isAnimating, setIsAnimating] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const controls = useAnimation();

  const goals = [
    {
      icon: FiCode,
      title: 'Develop',
      description: 'Create innovative next-generation applications using cutting-edge technologies and best practices in software development.',
      color: '#1abc9c',
      stats: { target: 50, label: 'PROJECTS' },
      gradient: 'linear-gradient(135deg, #1abc9c, #16a085)'
    },
    {
      icon: FiUsers,
      title: 'Network', 
      description: 'Build meaningful professional connections with like-minded developers, mentors, and industry experts from around the world.',
      color: '#3498db',
      stats: { target: 1000, label: 'MEMBERS' },
      gradient: 'linear-gradient(135deg, #3498db, #2980b9)'
    },
    {
      icon: FiTarget,
      title: 'Achieve',
      description: 'Reach your career goals through continuous learning, skill development, and collaborative project experiences.',
      color: '#e74c3c',
      stats: { target: 200, label: 'SUCCESS STORIES' },
      gradient: 'linear-gradient(135deg, #e74c3c, #c0392b)'
    }
  ];

  // Counter animation effect
  useEffect(() => {
    if (isInView && !isAnimating) {
      setIsAnimating(true);
      controls.start("visible");
      
      goals.forEach((goal, index) => {
        // Match the delay with stats badge: index * 0.2 + 1.1 seconds
        const badgeDelay = (index * 0.2 + 1.1) * 1000; // Convert to milliseconds
        
        setTimeout(() => {
          let start = 0;
          const end = goal.stats.target;
          const duration = 1000; // 1 second
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
        }, badgeDelay);
      });
    }
  }, [isInView, isAnimating, controls]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { 
        staggerChildren: 0.3, 
        delayChildren: 0.2,
        ease: "easeOut"
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 80, 
      scale: 0.7,
      rotateY: -15
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      rotateY: 0,
      transition: { 
        type: "spring", 
        stiffness: 200, 
        damping: 25,
        duration: 0.8
      }
    },
    hover: {
      y: -15,
      scale: 1.08,
      rotateY: 5,
      transition: { 
        type: "spring", 
        stiffness: 300,
        damping: 20
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
    <section id="goals" className="goals-section" aria-labelledby="goals-title" ref={ref}>
      {/* Enhanced Background decorative elements */}
      <div className="goals-background">
        <motion.div 
          className="bg-shape bg-shape-1"
          animate={{ 
            rotate: [0, 360],
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{ 
            duration: 20, 
            repeat: Infinity, 
            ease: "linear" 
          }}
        />
        <motion.div 
          className="bg-shape bg-shape-2"
          animate={{ 
            rotate: [360, 0],
            scale: [1, 0.8, 1],
            opacity: [0.1, 0.15, 0.1]
          }}
          transition={{ 
            duration: 15, 
            repeat: Infinity, 
            ease: "linear" 
          }}
        />
        <motion.div 
          className="bg-shape bg-shape-3"
          animate={{ 
            rotate: [0, -360],
            scale: [1, 1.3, 1],
            opacity: [0.1, 0.25, 0.1]
          }}
          transition={{ 
            duration: 25, 
            repeat: Infinity, 
            ease: "linear" 
          }}
        />
        <motion.div 
          className="bg-shape bg-shape-4"
          animate={{ 
            rotate: [180, -180],
            scale: [1, 1.1, 1],
            opacity: [0.1, 0.18, 0.1]
          }}
          transition={{ 
            duration: 18, 
            repeat: Infinity, 
            ease: "linear" 
          }}
        />
        <motion.div 
          className="bg-shape bg-shape-5"
          animate={{ 
            rotate: [0, 360],
            scale: [1, 1.4, 1],
            opacity: [0.1, 0.22, 0.1]
          }}
          transition={{ 
            duration: 22, 
            repeat: Infinity, 
            ease: "linear" 
          }}
        />
        <motion.div 
          className="bg-shape bg-shape-6"
          animate={{ 
            rotate: [360, 0],
            scale: [1, 0.9, 1],
            opacity: [0.1, 0.16, 0.1]
          }}
          transition={{ 
            duration: 16, 
            repeat: Infinity, 
            ease: "linear" 
          }}
        />
      </div>

      <div className="container">
        <motion.div 
          className="goals-header"
          variants={titleVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.h2 
            id="goals-title" 
            className="goals-main-title"
            whileHover={{ 
              scale: 1.05,
              textShadow: "0px 0px 8px rgba(52, 152, 219, 0.3)"
            }}
          >
            Our Main Goals
          </motion.h2>
          <motion.p 
            className="goals-subtitle"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            viewport={{ once: true }}
          >
            Empowering developers to excel in the digital age through collaboration, innovation, and continuous growth
          </motion.p>
        </motion.div>
        
        <motion.div 
          className="goals-grid"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          {goals.map((goal, index) => {
            const IconComponent = goal.icon;
            return (
              <motion.article 
                key={index}
                className="goal-card"
                variants={cardVariants}
                whileHover="hover"
                whileTap={{ scale: 0.95 }}
              >
                {/* Animated Icon */}
                <motion.div 
                  className="goal-icon-circle" 
                  style={{ 
                    borderColor: goal.color,
                    background: `linear-gradient(135deg, ${goal.color}10, ${goal.color}05)`
                  }}
                  whileHover={{ 
                    rotate: 360,
                    scale: 1.1,
                    boxShadow: `0 0 25px ${goal.color}30`
                  }}
                  transition={{ duration: 0.6 }}
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ 
                      delay: index * 0.2 + 0.5,
                      type: "spring",
                      stiffness: 200
                    }}
                  >
                    <IconComponent size={40} style={{ color: goal.color }} />
                  </motion.div>
                  
                  {/* Pulse effect */}
                  <motion.div
                    className="icon-pulse"
                    animate={{ 
                      scale: [1, 1.3, 1],
                      opacity: [0.5, 0, 0.5]
                    }}
                    transition={{ 
                      duration: 2, 
                      repeat: Infinity,
                      delay: index * 0.5
                    }}
                    style={{ borderColor: goal.color }}
                  />
                </motion.div>
                
                {/* Animated Title */}
                <motion.h3 
                  className="goal-title" 
                  style={{ color: '#2c3e50' }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.2 + 0.7 }}
                  whileHover={{ 
                    color: goal.color,
                    scale: 1.05
                  }}
                >
                  {goal.title}
                </motion.h3>
                
                {/* Animated Description */}
                <motion.p 
                  className="goal-description"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 + 0.9 }}
                >
                  {goal.description}
                </motion.p>
                
                {/* Enhanced Stats Badge */}
                <motion.div 
                  className="goal-stats-badge" 
                  style={{ 
                    background: goal.gradient,
                    border: `2px solid ${goal.color}`
                  }}
                  initial={{ opacity: 0, scale: 0.5, rotateX: -90 }}
                  animate={{ opacity: 1, scale: 1, rotateX: 0 }}
                  transition={{ 
                    delay: index * 0.2 + 1.1,
                    type: "spring",
                    stiffness: 200
                  }}
                  whileHover={{ 
                    scale: 1.1,
                    boxShadow: `0 10px 25px ${goal.color}40`,
                    y: -5
                  }}
                >
                  <motion.span 
                    className="counter" 
                    style={{ color: 'white' }}
                    key={counters[index]}
                    initial={{ scale: 1.2 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <motion.span
                      animate={{ 
                        textShadow: [
                          "0px 0px 0px rgba(255,255,255,0)",
                          "0px 0px 10px rgba(255,255,255,0.8)",
                          "0px 0px 0px rgba(255,255,255,0)"
                        ]
                      }}
                      transition={{ 
                        duration: 1.5, 
                        repeat: Infinity,
                        delay: index * 0.3
                      }}
                    >
                      {counters[index]}
                    </motion.span>
                    +
                  </motion.span>
                  <span className="counter-label" style={{ color: 'white' }}>
                    {goal.stats.label}
                  </span>
                  
                  {/* Progress indicator */}
                  <motion.div
                    className="progress-ring"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: counters[index] / goal.stats.target }}
                    transition={{ duration: 1, delay: index * 0.2 }}
                  />
                </motion.div>

                {/* Floating arrow indicator */}
                <motion.div
                  className="floating-arrow"
                  animate={{ 
                    y: [0, -10, 0],
                    opacity: [0.5, 1, 0.5]
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity,
                    delay: index * 0.5
                  }}
                  style={{ color: goal.color }}
                >
                  <FiArrowUp size={16} />
                </motion.div>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Goals;
