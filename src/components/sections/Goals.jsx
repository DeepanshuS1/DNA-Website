import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FiCode, FiUsers, FiTarget } from 'react-icons/fi';

const Goals = () => {
  const [counters, setCounters] = useState([0, 0, 0]);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const goals = [
    {
      icon: FiCode,
      title: 'Develop',
      description: 'Create innovative next-generation applications using cutting-edge technologies and best practices in software development.',
      color: '#1abc9c',
      stats: { target: 50, label: 'PROJECTS' }
    },
    {
      icon: FiUsers,
      title: 'Network', 
      description: 'Build meaningful professional connections with like-minded developers, mentors, and industry experts from around the world.',
      color: '#3498db',
      stats: { target: 1000, label: 'MEMBERS' }
    },
    {
      icon: FiTarget,
      title: 'Achieve',
      description: 'Reach your career goals through continuous learning, skill development, and collaborative project experiences.',
      color: '#e74c3c',
      stats: { target: 200, label: 'SUCCESS STORIES' }
    }
  ];

  // Counter animation effect
  useEffect(() => {
    if (isInView) {
      goals.forEach((goal, index) => {
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
      });
    }
  }, [isInView]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.8 },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 300, damping: 20 }
    },
    hover: {
      y: -10,
      scale: 1.05,
      transition: { type: "spring", stiffness: 400 }
    }
  };

  return (
    <section id="goals" className="goals-section" aria-labelledby="goals-title" ref={ref}>
      {/* Background decorative elements */}
      <div className="goals-background">
        <div className="bg-shape bg-shape-1"></div>
        <div className="bg-shape bg-shape-2"></div>
        <div className="bg-shape bg-shape-3"></div>
        <div className="bg-shape bg-shape-4"></div>
        <div className="bg-shape bg-shape-5"></div>
        <div className="bg-shape bg-shape-6"></div>
      </div>

      <div className="container">
        <motion.div 
          className="goals-header"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 id="goals-title" className="goals-main-title">
            Our Main Goals
          </h2>
          <p className="goals-subtitle">
            Empowering developers to excel in the digital age through collaboration, innovation, and continuous growth
          </p>
        </motion.div>
        
        <motion.div 
          className="goals-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {goals.map((goal, index) => {
            const IconComponent = goal.icon;
            return (
              <motion.article 
                key={index}
                className="goal-card"
                variants={cardVariants}
                whileHover="hover"
              >
                <motion.div 
                  className="goal-icon-circle" 
                  style={{ borderColor: goal.color }}
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <IconComponent size={40} style={{ color: goal.color }} />
                </motion.div>
                
                <h3 className="goal-title" style={{ color: '#2c3e50' }}>
                  {goal.title}
                </h3>
                
                <p className="goal-description">
                  {goal.description}
                </p>
                
                <motion.div 
                  className="goal-stats-badge" 
                  style={{ 
                    backgroundColor: goal.color,
                    border: `2px solid ${goal.color}`
                  }}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <span className="counter" style={{ color: 'white' }}>
                    {counters[index]}+
                  </span>
                  <span className="counter-label" style={{ color: 'white' }}>
                    {goal.stats.label}
                  </span>
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
