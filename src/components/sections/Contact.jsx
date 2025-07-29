import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiMapPin, FiSend, FiGithub, FiLinkedin, FiInstagram, FiPhone, FiClock } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [notification, setNotification] = useState({
    show: false,
    message: '',
    type: 'success'
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const showNotification = (message, type = 'success') => {
    setNotification({
      show: true,
      message,
      type
    });

    // Auto hide after 4 seconds
    setTimeout(() => {
      setNotification(prev => ({
        ...prev,
        show: false
      }));
    }, 4000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      showNotification('Please fill in all required fields.', 'error');
      return;
    }

    // TODO: Integrate with actual backend API
    showNotification('Thank you for your message! We\'ll get back to you soon.', 'success');
    
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };

  const contactInfo = [
    {
      icon: FiMail,
      title: 'Email Us',
      content: 'Dnatech@gmail.com',
      description: 'Send us an email anytime',
      color: '#e74c3c'
    },
    {
      icon: FiMapPin,
      title: 'Visit Us',
      content: 'Rajori Garden, Delhi',
      description: 'INDIA 🇮🇳',
      color: '#1abc9c'
    },
    {
      icon: FiClock,
      title: 'Working Hours',
      content: '24/7 Available',
      description: 'Community support always',
      color: '#f39c12'
    }
  ];

  const socialLinks = [
    { icon: FiGithub, url: 'https://github.com/DNA-DEVELOPERS-DEV', color: '#333', name: 'GitHub' },
    { icon: FiLinkedin, url: 'https://www.linkedin.com/company/dna-devs/', color: '#0077b5', name: 'LinkedIn' },
    { icon: FaWhatsapp, url: 'https://chat.whatsapp.com/LOC5LAO9iDAD8S9OtygofA', color: '#25D366', name: 'WhatsApp' },
    { icon: FiInstagram, url: 'https://www.instagram.com/code.in_dna', color: '#e4405f', name: 'Instagram' }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const cardHoverVariants = {
    hover: {
      y: -8,
      scale: 1.05,
      transition: {
        type: "spring",
        stiffness: 300
      }
    }
  };

  const iconHoverVariants = {
    hover: {
      rotate: 15,
      scale: 1.2,
      transition: { duration: 0.3 }
    }
  };

  return (
    <>
      {/* Centered Card Notification */}
      {notification.show && (
        <motion.div
          className="form-notification-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="form-notification-card"
            initial={{ opacity: 0, scale: 0.3, y: -100 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.3, y: -100 }}
            transition={{ 
              type: "spring", 
              stiffness: 300, 
              damping: 25,
              duration: 0.6
            }}
          >
            <div className="notification-animation">
              {notification.type === 'success' ? (
                <motion.div
                  className="success-animation"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 300 }}
                >
                  <motion.div
                    className="checkmark-circle"
                    initial={{ scale: 0, rotate: 0 }}
                    animate={{ scale: 1, rotate: 360 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                  >
                    <motion.svg
                      className="checkmark"
                      viewBox="0 0 52 52"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      <motion.circle
                        cx="26"
                        cy="26"
                        r="25"
                        fill="none"
                        stroke="#1abc9c"
                        strokeWidth="2"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                      />
                      <motion.path
                        fill="none"
                        stroke="#1abc9c"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m14.1 27.2 7.1 7.2 16.7-16.8"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.4, delay: 0.8 }}
                      />
                    </motion.svg>
                  </motion.div>
                  <motion.div
                    className="success-sparkles"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                  >
                    {[...Array(6)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="sparkle"
                        style={{
                          '--angle': `${i * 60}deg`,
                        }}
                        animate={{
                          scale: [0, 1, 0],
                          rotate: [0, 180],
                          opacity: [0, 1, 0]
                        }}
                        transition={{
                          duration: 1.5,
                          delay: 1 + i * 0.1,
                          repeat: Infinity,
                          repeatDelay: 2
                        }}
                      >
                        ✨
                      </motion.div>
                    ))}
                  </motion.div>
                </motion.div>
              ) : (
                <motion.div
                  className="error-animation"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 300 }}
                >
                  <motion.div
                    className="error-circle"
                    animate={{ 
                      scale: [1, 1.1, 1],
                      rotate: [0, -5, 5, 0]
                    }}
                    transition={{ 
                      duration: 0.6,
                      repeat: 2
                    }}
                  >
                    ❌
                  </motion.div>
                </motion.div>
              )}
            </div>
            
            <motion.div
              className="notification-content-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <motion.h3
                className="notification-title"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                {notification.type === 'success' ? 'Message Sent!' : 'Error Occurred'}
              </motion.h3>
              <motion.p
                className="notification-message-card"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                {notification.message}
              </motion.p>
            </motion.div>

            <motion.button
              className="notification-close-card"
              onClick={() => setNotification(prev => ({ ...prev, show: false }))}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8, type: "spring", stiffness: 300 }}
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
            >
              ✕
            </motion.button>
          </motion.div>
        </motion.div>
      )}

      <section id="contact" className="section contact" aria-labelledby="contact-title">
      <div className="container">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.h2 
            id="contact-title"
            className="section-title"
            variants={itemVariants}
          >
            Let's Connect & Build Together
          </motion.h2>
          <motion.p 
            className="section-subtitle"
            variants={itemVariants}
          >
            Ready to join our community or have questions? We'd love to hear from you!
          </motion.p>

          <div className="contact-layout">
            <motion.div className="contact-info-section" variants={itemVariants}>
              <div className="contact-info-header">
                <h3>Get In Touch</h3>
                <p>We're here to help you grow your development journey</p>
              </div>
              
              <div className="contact-info-grid">
                {contactInfo.map((item, index) => {
                  const IconComponent = item.icon;
                  return (
                    <motion.div 
                      key={index}
                      className="contact-info-card card-base"
                      variants={itemVariants}
                      whileHover={cardHoverVariants.hover}
                    >
                      <motion.div 
                        className="contact-info-icon"
                        style={{ backgroundColor: `${item.color}15`, color: item.color }}
                        variants={iconHoverVariants}
                        whileHover="hover"
                      >
                        <IconComponent size={24} />
                      </motion.div>
                      <div className="contact-info-content">
                        <h4>{item.title}</h4>
                        <p className="contact-info-main">{item.content}</p>
                        <p className="contact-info-desc">{item.description}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              <div className="social-links">
                <h4>Follow Our Journey</h4>
                <div className="social-grid">
                  {socialLinks.map((social, index) => {
                    const IconComponent = social.icon;
                    return (
                      <motion.a
                        key={index}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="social-link"
                        style={{ '--hover-color': social.color }}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        whileTap={{ scale: 0.95 }}
                        title={social.name}
                      >
                        <IconComponent size={20} />
                      </motion.a>
                    );
                  })}
                </div>
              </div>
            </motion.div>

            <motion.div className="contact-form-section" variants={itemVariants}>
              <div className="form-header">
                <h3>Send us a Message</h3>
                <p>Let's discuss your ideas and how we can help you succeed</p>
              </div>
              
              <form className="modern-contact-form" onSubmit={handleSubmit}>
                <div className="form-row">
                  <motion.div 
                    className="form-field"
                    whileFocus={{ scale: 1.02 }}
                  >
                    <label htmlFor="name">Full Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your full name"
                      required
                    />
                  </motion.div>
                  <motion.div 
                    className="form-field"
                    whileFocus={{ scale: 1.02 }}
                  >
                    <label htmlFor="email">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      required
                    />
                  </motion.div>
                </div>
                
                <motion.div 
                  className="form-field"
                  whileFocus={{ scale: 1.02 }}
                >
                  <label htmlFor="subject">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="What's this about?"
                    required
                  />
                </motion.div>
                
                <motion.div 
                  className="form-field"
                  whileFocus={{ scale: 1.02 }}
                >
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us more about your project or question..."
                    required
                    rows="5"
                  ></textarea>
                </motion.div>
                
                <motion.button 
                  type="submit" 
                  className="modern-submit-btn"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <FiSend size={18} />
                  <span>Send Message</span>
                  <div className="btn-shimmer"></div>
                </motion.button>
              </form>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
    </>
  );
};

export default Contact;
