import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiCode, FiUsers, FiTarget } from 'react-icons/fi';

const Goals = () => {
  const goals = [
    {
      icon: FiCode,
      title: 'Develop',
      description: 'Create innovative next-generation applications using cutting-edge technologies and best practices in software development.',
      color: '#1abc9c',
      stats: { target: 50, label: 'Projects' }
    },
    {
      icon: FiUsers,
      title: 'Network', 
      description: 'Build meaningful professional connections with like-minded developers, mentors, and industry experts from around the world.',
      color: '#3498db',
      stats: { target: 1000, label: 'Members' }
    },
    {
      icon: FiTarget,
      title: 'Achieve',
      description: 'Reach your career goals through continuous learning, skill development, and collaborative project experiences.',
      color: '#e74c3c',
      stats: { target: 200, label: 'Success Stories' }
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
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
    <section id="goals" className="section" aria-labelledby="goals-title">
      <div className="container">
        <motion.h2 
          id="goals-title"
          className="section-title"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Our Goals
        </motion.h2>
        
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
                style={{ 
                  background: `linear-gradient(135deg, ${goal.color}15, ${goal.color}05)`,
                  border: `2px solid ${goal.color}30`,
                  borderRadius: '16px',
                  padding: '2rem'
                }}
              >
                <div className="goal-icon-wrapper" style={{ color: goal.color }}>
                  <IconComponent size={56} />
                </div>
                <h3>{goal.title}</h3>
                <p>{goal.description}</p>
                <div className="goal-stats" style={{ color: goal.color }}>
                  <span className="counter">{goal.stats.target}+</span>
                  <span className="counter-label">{goal.stats.label}</span>
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Goals;
