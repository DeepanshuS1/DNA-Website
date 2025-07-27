import React from 'react';
import { motion } from 'framer-motion';
import { FiCode, FiUsers, FiTarget, FiTrendingUp, FiAward, FiGlobe } from 'react-icons/fi';

const About = () => {
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
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

  const cardVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    },
    hover: {
      y: -10,
      transition: { type: "spring", stiffness: 300 }
    }
  };

  return (
    <div className="about-3d-section interactive-3d-section" style={{ position: 'relative', minHeight: '100vh' }}>
      <section id="about" className="section about" aria-labelledby="about-title">
        <div className="container">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.h2 
              id="about-title" 
              className="section-title"
              variants={itemVariants}
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
              <div className="stat-item">
                <span className="stat-number">1000+</span>
                <span className="stat-label">Active Members</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">50+</span>
                <span className="stat-label">Projects Completed</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">200+</span>
                <span className="stat-label">Success Stories</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">24/7</span>
                <span className="stat-label">Community Support</span>
              </div>
            </motion.div>
          </div>

          <motion.div className="about-features" variants={containerVariants}>
            <motion.h3 className="features-title" variants={itemVariants}>
              Why Choose DNA Community?
            </motion.h3>
            <div className="features-grid">
              {features.map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <div key={index}>
                    <div>
                      <div className="feature-card">
                        <motion.div
                          variants={cardVariants}
                          whileHover="hover"
                          style={{ position: 'relative' }}
                        >
                          <div className="feature-icon" style={{ color: feature.color }}>
                            <IconComponent size={32} />
                          </div>
                          <h4>{feature.title}</h4>
                          <p>{feature.description}</p>
                        </motion.div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>

          <motion.div className="about-vision" variants={itemVariants}>
            <div className="vision-content">
              <h3>Our Vision</h3>
              <p>
                We envision a world where technology serves humanity's greatest challenges. 
                Through collaborative development, knowledge sharing, and innovative thinking, 
                our community members are building applications that transform industries, 
                improve lives, and create a more connected world.
              </p>
              <div className="vision-highlights">
                <div className="highlight">
                  <span className="highlight-icon">🚀</span>
                  <span>Innovation First</span>
                </div>
                <div className="highlight">
                  <span className="highlight-icon">🤝</span>
                  <span>Collaboration Always</span>
                </div>
                <div className="highlight">
                  <span className="highlight-icon">🎯</span>
                  <span>Impact Driven</span>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
    </div>
  );
};

export default About;
