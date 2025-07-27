import React from 'react';
import { motion } from 'framer-motion';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4 }
    }
  };

  return (
    <footer className="footer" role="contentinfo">
      <div className="container">
        <motion.div 
          className="footer-content"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.p variants={itemVariants}>
            &copy; {currentYear} DNA - Developers of Next-Gen Applications. All rights reserved.
          </motion.p>
          <motion.p variants={itemVariants}>
            Building the future of technology, one line of code at a time.
          </motion.p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
