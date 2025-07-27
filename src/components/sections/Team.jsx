import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiUser, FiUsers, FiSettings, FiCalendar, FiX } from 'react-icons/fi';
import { FaLinkedin, FaGithub } from 'react-icons/fa';
import { FaInstagram } from 'react-icons/fa6';
import { HiOutlineStar } from 'react-icons/hi';
import { teamMembers, additionalMembers, topMembers, dynamicTitles } from '../../data/teamData';
import { 
  containerVariants, 
  cardVariants, 
  modalVariants, 
  overlayVariants 
} from '../../utils/animations';

// Persistent subtitle component - defined outside to prevent re-renders
const PersistentSubtitle = () => {
  const [displayText, setDisplayText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    if (hasStarted) return; // Only run once

    const timeout = setTimeout(() => {
      setHasStarted(true);
      let currentIndex = 0;
      const text = "The passionate individuals behind DNA who make our community thrive";
      
      const interval = setInterval(() => {
        if (currentIndex <= text.length) {
          setDisplayText(text.slice(0, currentIndex));
          currentIndex++;
        } else {
          clearInterval(interval);
          // Hide cursor after typing is complete
          setTimeout(() => setShowCursor(false), 2000);
        }
      }, 60);
      
      return () => clearInterval(interval);
    }, 2000);

    return () => clearTimeout(timeout);
  }, []); // Empty dependency array - runs only once

  return (
    <span className="section-subtitle animated-subtitle">
      {displayText}
      {showCursor && <span className="typing-cursor">|</span>}
    </span>
  );
};

const Team = () => {
  const [showModal, setShowModal] = useState(false);
  const [currentTitle, setCurrentTitle] = useState(0);

  // Cycle through titles every 5 seconds (increased for better readability)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTitle((prev) => (prev + 1) % dynamicTitles.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Animated typing component
  const TypewriterText = ({ text, className, delay = 0, speed = 50 }) => {
    const [displayText, setDisplayText] = useState('');
    const [showCursor, setShowCursor] = useState(true);
    const [isTyping, setIsTyping] = useState(false);

    useEffect(() => {
      setDisplayText('');
      setIsTyping(false);
      let currentIndex = 0;
      
      const timeout = setTimeout(() => {
        setIsTyping(true);
        const interval = setInterval(() => {
          if (currentIndex <= text.length) {
            setDisplayText(text.slice(0, currentIndex));
            currentIndex++;
          } else {
            clearInterval(interval);
            setIsTyping(false);
            // Hide cursor after typing is complete
            setTimeout(() => setShowCursor(false), 2000);
          }
        }, speed);
        
        return () => clearInterval(interval);
      }, delay);

      return () => clearTimeout(timeout);
    }, [text, delay, speed]);

    useEffect(() => {
      if (!isTyping) return;
      
      const cursorInterval = setInterval(() => {
        setShowCursor(prev => !prev);
      }, 500);
      
      return () => clearInterval(cursorInterval);
    }, [isTyping]);

    return (
      <span className={className}>
        {displayText}
        {showCursor && <span className="typing-cursor">|</span>}
      </span>
    );
  };

  const allMembers = [...teamMembers, ...additionalMembers];

  const avatarVariants = {
    hover: {
      scale: 1.1,
      rotate: [0, -5, 5, 0],
      transition: {
        rotate: {
          duration: 0.6,
          ease: "easeInOut"
        },
        scale: {
          type: "spring",
          stiffness: 300
        }
      }
    }
  };

  const iconVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: {
        delay: 0.4,
        type: "spring",
        stiffness: 300
      }
    },
    hover: {
      rotate: 360,
      scale: 1.2,
      transition: { duration: 0.6 }
    }
  };

  const socialLinksVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        delay: 0.6,
        duration: 0.4,
        staggerChildren: 0.1
      }
    }
  };

  const socialLinkVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300
      }
    },
    hover: {
      scale: 1.2,
      y: -3,
      transition: {
        type: "spring",
        stiffness: 400
      }
    }
  };

  return (
    <section id="team" className="section" aria-labelledby="team-title">
      <div className="container">
        <motion.div
          className="team-header"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.h2 
            id="team-title"
            className="section-title dynamic-title"
            key={currentTitle}
            initial={{ opacity: 0, y: -30, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.8 }}
            transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
          >
            <motion.span
              initial={{ backgroundPosition: "0% 50%" }}
              animate={{ backgroundPosition: "100% 50%" }}
              transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
              className="gradient-text"
            >
              {dynamicTitles[currentTitle]}
            </motion.span>
          </motion.h2>
          
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "100px" }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="title-underline"
          />
        </motion.div>

        <motion.div 
          className="section-subtitle-container"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.5 }}
          viewport={{ once: true }}
        >
          <PersistentSubtitle />
        </motion.div>
        <motion.div 
          className="team-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          role="list"
        >
          {teamMembers.map((member, index) => {
            const IconComponent = member.icon;
            return (
              <div key={index}>
                <motion.article 
                  className="team-card"
                  variants={cardVariants}
                  whileHover="hover"
                  role="listitem"
                  style={{ position: 'relative' }}
                >
                  <motion.div 
                    className="team-avatar"
                    variants={avatarVariants}
                    style={{ borderColor: member.color }}
                  >
                    <img src={member.image} alt={`${member.name}, ${member.role}`} />
                    <motion.div 
                      className="team-role-icon"
                      style={{ backgroundColor: member.color }}
                      variants={iconVariants}
                      initial="hidden"
                      whileInView="visible"
                      whileHover="hover"
                      viewport={{ once: true }}
                    >
                      <IconComponent size={20} />
                    </motion.div>
                  </motion.div>
                  <motion.h3
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    {member.name}
                  </motion.h3>
                  <motion.div 
                    className="team-role" 
                    style={{ color: member.color }}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    {member.role}
                  </motion.div>
                  <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    {member.description}
                  </motion.p>
                  <motion.div 
                    className="team-social-links"
                    variants={socialLinksVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                  >
                    {member.socialLinks.map((social, socialIndex) => {
                      const SocialIcon = social.icon;
                      return (
                        <motion.a
                          key={socialIndex}
                          href={social.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={social.platform}
                          variants={socialLinkVariants}
                          whileHover="hover"
                          aria-label={`${member.name}'s ${social.platform === 'x' ? 'X' : social.platform} profile`}
                        >
                          <SocialIcon />
                        </motion.a>
                      );
                    })}
                  </motion.div>
                </motion.article>
              </div>
            );
          })}
        </motion.div>
        
        {/* View All Button */}
        <motion.div 
          className="team-view-all"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <motion.button
            className="view-all-btn"
            onClick={() => setShowModal(true)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View All Team Members
          </motion.button>
        </motion.div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div 
            className="team-modal-overlay"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={() => setShowModal(false)}
          >
            <motion.div 
              className="team-modal"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-header">
                <motion.h2
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <TypewriterText 
                    text="Our Complete Team" 
                    className="modal-title"
                    delay={500}
                    speed={80}
                  />
                </motion.h2>
                <motion.button 
                  className="modal-close"
                  onClick={() => setShowModal(false)}
                  aria-label="Close modal"
                  whileHover={{ rotate: 90, scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                >
                  <FiX />
                </motion.button>
              </div>
              
              <div className="modal-content">
                {/* Main Team Section */}
                <div className="modal-section">
                  <motion.h3
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="modal-section-title"
                  >
                    <motion.span
                      initial={{ backgroundSize: "0% 100%" }}
                      animate={{ backgroundSize: "100% 100%" }}
                      transition={{ duration: 1, delay: 0.8 }}
                      className="section-highlight"
                    >
                      Core Team
                    </motion.span>
                  </motion.h3>
                  <div className="modal-team-grid">
                    {allMembers.map((member, index) => {
                      const IconComponent = member.icon;
                      return (
                        <div key={index} className="modal-team-card">
                          <div className="modal-avatar" style={{ borderColor: member.color }}>
                            <img src={member.image} alt={`${member.name}, ${member.role}`} />
                            <div 
                              className="modal-role-icon"
                              style={{ backgroundColor: member.color }}
                            >
                              <IconComponent size={16} />
                            </div>
                          </div>
                          <h4>{member.name}</h4>
                          <div className="modal-role" style={{ color: member.color }}>
                            {member.role}
                          </div>
                          <p>{member.description}</p>
                          <div className="modal-social-links">
                            {member.socialLinks.map((social, socialIndex) => {
                              const SocialIcon = social.icon;
                              return (
                                <a
                                  key={socialIndex}
                                  href={social.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className={`modal-social-link ${social.platform}`}
                                  aria-label={`${member.name}'s ${social.platform} profile`}
                                >
                                  <SocialIcon size={14} />
                                </a>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Top Members Section */}
                <div className="modal-section">
                  <motion.h3
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1.2 }}
                    className="modal-section-title"
                  >
                    <motion.span
                      initial={{ backgroundSize: "0% 100%" }}
                      animate={{ backgroundSize: "100% 100%" }}
                      transition={{ duration: 1, delay: 1.6 }}
                      className="section-highlight"
                    >
                      Top Community Members
                    </motion.span>
                  </motion.h3>
                  <div className="modal-team-grid">
                    {topMembers.map((member, index) => {
                      const IconComponent = member.icon;
                      return (
                        <div key={index} className="modal-team-card">
                          <div className="modal-avatar" style={{ borderColor: member.color }}>
                            <img src={member.image} alt={`${member.name}, ${member.role}`} />
                            <div 
                              className="modal-role-icon"
                              style={{ backgroundColor: member.color }}
                            >
                              <IconComponent size={16} />
                            </div>
                          </div>
                          <h4>{member.name}</h4>
                          <div className="modal-role" style={{ color: member.color }}>
                            {member.role}
                          </div>
                          <p>{member.description}</p>
                          <div className="modal-social-links">
                            {member.socialLinks.map((social, socialIndex) => {
                              const SocialIcon = social.icon;
                              return (
                                <a
                                  key={socialIndex}
                                  href={social.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className={`modal-social-link ${social.platform}`}
                                  aria-label={`${member.name}'s ${social.platform} profile`}
                                >
                                  <SocialIcon size={14} />
                                </a>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Team;
