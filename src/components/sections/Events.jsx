import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiClock, FiMapPin, FiUsers, FiCalendar } from 'react-icons/fi';
import { HiOutlineLightningBolt, HiOutlineCode, HiOutlineAcademicCap, HiOutlineUserGroup, HiOutlineDeviceMobile, HiOutlineCloud } from 'react-icons/hi';

const Events = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [notification, setNotification] = useState({
    show: false,
    message: '',
    type: 'info'
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000 * 60 * 60); // Update every hour

    return () => clearInterval(timer);
  }, []);

  const calculateDaysUntil = (eventDateStr) => {
    const eventDate = new Date(eventDateStr + ', 2025');
    const diffTime = eventDate - currentDate;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  const handleEventRegistration = (event) => {
    if (event.registrationLink && event.registrationLink !== '#') {
      window.open(event.registrationLink, '_blank', 'noopener,noreferrer');
      showNotification('Redirecting to registration...', 'success');
    } else {
      // Show custom notification instead of alert
      showNotification('Registration link will be available soon! Stay tuned for updates.', 'info');
    }
  };

  const showNotification = (message, type = 'info') => {
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

const events = [
    {
        date: 'July 25, 2025 - July 27, 2025',
        title: 'Alpha Web Development',
        description: 'Learn the fundamentals of HTML, CSS, and JavaScript in this beginner-friendly workshop.',
        time: '7:00 PM - 8:00 PM',
        location: 'Online & ZOOM',
        category: 'Workshop',
        spots: 200,
        icon: HiOutlineCode,
        color: '#1abc9c',
        isOngoing: false,
        registrationLink: 'https://chat.whatsapp.com/JlJ92kKgCIJGyL8ky8J86A?mode=r_t'
    },
    {
        date: 'Aug 28, 2025',
        title: 'AI/ML Hackathon',
        description: 'Build innovative AI-powered applications in this 48-hour intensive hackathon event.',
        time: '48 Hours',
        location: 'Tech Hub Downtown',
        category: 'Hackathon',
        spots: 50,
        icon: HiOutlineLightningBolt,
        color: '#e74c3c',
        registrationLink: '#'
    },
    {
        date: 'Sep 10, 2025',
        title: 'Full-Stack Development Bootcamp',
        description: 'Comprehensive bootcamp covering modern web development from frontend to backend.',
        time: '9:00 AM - 5:00 PM',
        location: 'DNA Community Center',
        category: 'Bootcamp',
        spots: 30,
        icon: HiOutlineAcademicCap,
        color: '#3498db',
        registrationLink: '#'
    },
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

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.9
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    hover: {
      y: -10,
      scale: 1.02,
      transition: {
        type: "spring",
        stiffness: 300
      }
    }
  };

  const iconVariants = {
    hover: {
      rotate: [0, -10, 10, 0],
      scale: 1.2,
      transition: { duration: 0.6 }
    }
  };

  return (
    <>
      {/* Custom Notification */}
      {notification.show && (
        <motion.div
          className="event-notification"
          initial={{ opacity: 0, y: -100, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -100, scale: 0.8 }}
          transition={{ 
            type: "spring", 
            stiffness: 300, 
            damping: 20 
          }}
        >
          <div className={`notification-content ${notification.type}`}>
            <motion.div
              className="notification-icon"
              animate={{ 
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ duration: 0.5 }}
            >
              {notification.type === 'success' ? '🚀' : 'ℹ️'}
            </motion.div>
            <motion.p
              className="notification-message"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              {notification.message}
            </motion.p>
            <motion.button
              className="notification-close"
              onClick={() => setNotification(prev => ({ ...prev, show: false }))}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              ✕
            </motion.button>
          </div>
        </motion.div>
      )}

    <div className="events-3d-section interactive-3d-section" style={{ position: 'relative', minHeight: '100vh' }}>
      <section id="events" className="section events" aria-labelledby="events-title">
      <div className="container">
        <motion.h2 
          id="events-title"
          className="section-title"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Upcoming Events
        </motion.h2>
        <motion.p 
          className="section-subtitle"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          Join us for exciting workshops, hackathons, and networking opportunities with industry experts and fellow developers.
        </motion.p>
        <motion.div 
          className="events-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {events.map((event, index) => {
            const daysUntil = event.isOngoing ? null : calculateDaysUntil(event.date);
            const IconComponent = event.icon;
            return (
              <motion.div 
                key={index} 
                className="event-card"
                variants={cardVariants}
                whileHover="hover"
              >
                {event.isOngoing && (
                  <div className="live-indicator">
                    ● LIVE
                  </div>
                )}
                <div className="event-date" style={{ background: `linear-gradient(135deg, ${event.color}, ${event.color}dd)` }}>
                  <motion.div 
                    className="event-icon"
                    variants={iconVariants}
                    whileHover="hover"
                  >
                    <IconComponent size={32} />
                  </motion.div>
                  <div className="date-main">{event.date}</div>
                  <div className="date-countdown">
                    {event.isOngoing ? (
                      <motion.div
                        className="live-status-badge"
                        animate={{ 
                          opacity: [1, 0.7, 1],
                          scale: [1, 1.05, 1]
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <motion.span
                          className="live-dot"
                          animate={{ 
                            boxShadow: [
                              '0 0 0 0 rgba(231, 76, 60, 0.7)',
                              '0 0 0 10px rgba(231, 76, 60, 0)',
                              '0 0 0 0 rgba(231, 76, 60, 0)'
                            ]
                          }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                        <span className="live-text">LIVE NOW</span>
                      </motion.div>
                    ) : (
                      daysUntil > 0 ? `${daysUntil} days to go` : 'Event Passed'
                    )}
                  </div>
                </div>
                <div className="event-content">
                  <div className="event-category" style={{ backgroundColor: event.color }}>
                    {event.category}
                  </div>
                  <h3>{event.title}</h3>
                  <p>{event.description}</p>
                  <div className="event-meta">
                    <span><FiClock size={16} /> {event.time}</span>
                    <span><FiMapPin size={16} /> {event.location}</span>
                    <span><FiUsers size={16} /> {event.spots} spots</span>
                  </div>
                  <motion.button 
                    className="event-register-btn" 
                    disabled={!event.isOngoing && daysUntil === 0}
                    style={{ 
                      backgroundColor: event.isOngoing ? event.color : (daysUntil > 0 ? event.color : '#ccc'),
                      cursor: (event.isOngoing || daysUntil > 0) ? 'pointer' : 'not-allowed'
                    }}
                    onClick={() => (event.isOngoing || daysUntil > 0) ? handleEventRegistration(event) : null}
                    whileHover={event.isOngoing || daysUntil > 0 ? { scale: 1.02 } : {}}
                    whileTap={event.isOngoing || daysUntil > 0 ? { scale: 0.98 } : {}}
                  >
                    {event.isOngoing ? 'Join Now' : (daysUntil > 0 ? 'Register Now' : 'Event Ended')}
                  </motion.button>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
    </div>
    </>
  );
};

export default Events;
