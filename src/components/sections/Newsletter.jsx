import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { EnvelopeIcon, SparklesIcon } from '@heroicons/react/24/outline';
import { newsletterAPI } from '../../services/api';
import Button from '../ui/Button';
import Card from '../ui/Card';
import toast from 'react-hot-toast';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    try {
      await newsletterAPI.subscribe({ 
        email, 
        preferences: ['events', 'announcements', 'blog_posts'] 
      });
      toast.success('Successfully subscribed to newsletter!');
      setEmail('');
    } catch (error) {
      // Error is handled by API interceptor
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section id="newsletter" className="section bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900">
      <div className="container">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div 
            className="flex justify-center mb-6"
            variants={itemVariants}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full blur-lg opacity-30 animate-pulse"></div>
              <div className="relative bg-gradient-to-r from-blue-500 to-purple-600 p-4 rounded-full">
                <EnvelopeIcon className="w-8 h-8 text-white" />
              </div>
            </div>
          </motion.div>

          <motion.h2 
            className="section-title gradient-text mb-6"
            variants={itemVariants}
          >
            Stay Connected
          </motion.h2>
          
          <motion.p 
            className="section-subtitle mb-12"
            variants={itemVariants}
          >
            Get the latest updates on events, projects, and community news delivered straight to your inbox.
          </motion.p>

          <motion.div variants={itemVariants}>
            <Card variant="glass" className="max-w-2xl mx-auto p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      required
                      className="w-full px-4 py-3 bg-white/50 dark:bg-gray-800/50 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                    />
                  </div>
                  <Button 
                    type="submit" 
                    variant="futuristic" 
                    size="lg"
                    loading={loading}
                    className="sm:px-8"
                  >
                    <SparklesIcon className="w-5 h-5 mr-2" />
                    Subscribe
                  </Button>
                </div>
                
                <div className="flex items-center justify-center space-x-6 text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                    Event Updates
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></div>
                    Project News
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mr-2 animate-pulse"></div>
                    Community Insights
                  </div>
                </div>
              </form>

              <div className="mt-6 text-xs text-gray-500 dark:text-gray-400 text-center">
                📧 No spam, ever. Unsubscribe at any time.
              </div>
            </Card>
          </motion.div>

          {/* Floating elements */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <motion.div
              className="absolute top-20 left-10 w-4 h-4 bg-blue-400 rounded-full opacity-20"
              animate={{
                y: [0, -20, 0],
                x: [0, 10, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div
              className="absolute top-40 right-20 w-6 h-6 bg-purple-400 rounded-full opacity-20"
              animate={{
                y: [0, -30, 0],
                x: [0, -15, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
            />
            <motion.div
              className="absolute bottom-20 left-1/4 w-3 h-3 bg-cyan-400 rounded-full opacity-20"
              animate={{
                y: [0, -25, 0],
                x: [0, 20, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2
              }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Newsletter;