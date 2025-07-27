import React from 'react';
import { motion } from 'framer-motion';
import { FiDownload, FiExternalLink, FiBook, FiVideo, FiCode, FiFile, FiLink, FiBookOpen } from 'react-icons/fi';
import { SiJavascript, SiReact, SiPython, SiNodedotjs, SiGit, SiDocker } from 'react-icons/si';

const Resources = () => {
  const resourceCategories = [
    {
      title: 'PDF Resources',
      icon: FiFile,
      color: '#e74c3c',
      resources: [
        {
          title: 'JavaScript Complete Guide',
          description: 'Comprehensive guide covering ES6+ features, DOM manipulation, and modern JavaScript concepts.',
          type: 'PDF',
          size: '2.5 MB',
          downloadLink: '#',
          icon: SiJavascript,
          tags: ['Beginner', 'JavaScript', 'Frontend']
        },
        {
          title: 'React Development Handbook',
          description: 'Master React with hooks, context, and modern patterns. Includes practical examples.',
          type: 'PDF',
          size: '3.2 MB',
          downloadLink: '#',
          icon: SiReact,
          tags: ['Intermediate', 'React', 'Frontend']
        },
        {
          title: 'Python Programming Essentials',
          description: 'From basics to advanced Python concepts, data structures, and OOP principles.',
          type: 'PDF',
          size: '4.1 MB',
          downloadLink: '#',
          icon: SiPython,
          tags: ['Beginner', 'Python', 'Backend']
        }
      ]
    },
    {
      title: 'Free Courses',
      icon: FiBookOpen,
      color: '#1abc9c',
      resources: [
        {
          title: 'Full Stack Web Development',
          description: 'Complete course covering HTML, CSS, JavaScript, React, Node.js, and MongoDB.',
          type: 'Course',
          duration: '40 hours',
          link: 'https://freecodecamp.org',
          icon: FiCode,
          tags: ['Full Stack', 'Web Development', 'Free']
        },
        {
          title: 'Git & GitHub Mastery',
          description: 'Learn version control, collaboration, and advanced Git workflows.',
          type: 'Course',
          duration: '8 hours',
          link: 'https://github.com/skills',
          icon: SiGit,
          tags: ['Git', 'Version Control', 'DevOps']
        },
        {
          title: 'Docker Fundamentals',
          description: 'Containerization basics, Docker compose, and deployment strategies.',
          type: 'Course',
          duration: '12 hours',
          link: 'https://docker.com/learning',
          icon: SiDocker,
          tags: ['Docker', 'DevOps', 'Deployment']
        }
      ]
    },
    {
      title: 'Video Tutorials',
      icon: FiVideo,
      color: '#3498db',
      resources: [
        {
          title: 'Node.js Backend Development',
          description: 'Build REST APIs, work with databases, and implement authentication.',
          type: 'Video Series',
          duration: '25 hours',
          link: 'https://youtube.com',
          icon: SiNodedotjs,
          tags: ['Node.js', 'Backend', 'API']
        },
        {
          title: 'Modern CSS Techniques',
          description: 'Flexbox, Grid, animations, and responsive design patterns.',
          type: 'Video Series',
          duration: '15 hours',
          link: 'https://youtube.com',
          icon: FiCode,
          tags: ['CSS', 'Frontend', 'Design']
        }
      ]
    },
    {
      title: 'External Links',
      icon: FiLink,
      color: '#f39c12',
      resources: [
        {
          title: 'MDN Web Docs',
          description: 'The most comprehensive web development documentation and tutorials.',
          type: 'Documentation',
          link: 'https://developer.mozilla.org',
          icon: FiBook,
          tags: ['Documentation', 'Reference', 'Web']
        },
        {
          title: 'Stack Overflow',
          description: 'Get answers to your programming questions from the community.',
          type: 'Community',
          link: 'https://stackoverflow.com',
          icon: FiExternalLink,
          tags: ['Community', 'Q&A', 'Help']
        }
      ]
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

  const categoryVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const resourceVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.4 }
    },
    hover: {
      y: -5,
      scale: 1.02,
      transition: {
        type: "spring",
        stiffness: 300
      }
    }
  };

  const handleResourceClick = (resource) => {
    if (resource.downloadLink) {
      // Handle PDF download
      window.open(resource.downloadLink, '_blank');
    } else if (resource.link) {
      // Handle external link
      window.open(resource.link, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <section id="resources" className="section resources" aria-labelledby="resources-title">
      <div className="container">
        <motion.h2 
          id="resources-title"
          className="section-title"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Learning Resources
        </motion.h2>
        <motion.p 
          className="section-subtitle"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          Free resources to accelerate your development journey
        </motion.p>

        <motion.div
          className="resources-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {resourceCategories.map((category, categoryIndex) => {
            const CategoryIcon = category.icon;
            return (
              <motion.div
                key={categoryIndex}
                className="resource-category"
                variants={categoryVariants}
              >
                <div className="category-header">
                  <div 
                    className="category-icon"
                    style={{ backgroundColor: category.color }}
                  >
                    <CategoryIcon size={24} />
                  </div>
                  <h3>{category.title}</h3>
                </div>

                <motion.div className="resource-list">
                  {category.resources.map((resource, resourceIndex) => {
                    const ResourceIcon = resource.icon;
                    return (
                      <motion.div
                        key={resourceIndex}
                        className="resource-item"
                        variants={resourceVariants}
                        whileHover="hover"
                        onClick={() => handleResourceClick(resource)}
                      >
                        <div className="resource-icon">
                          <ResourceIcon size={20} />
                        </div>
                        
                        <div className="resource-content">
                          <h4>{resource.title}</h4>
                          <p>{resource.description}</p>
                          
                          <div className="resource-meta">
                            <span className="resource-type">{resource.type}</span>
                            {resource.size && <span className="resource-size">{resource.size}</span>}
                            {resource.duration && <span className="resource-duration">{resource.duration}</span>}
                          </div>
                          
                          <div className="resource-tags">
                            {resource.tags.map((tag, tagIndex) => (
                              <span key={tagIndex} className="tag">{tag}</span>
                            ))}
                          </div>
                        </div>

                        <div className="resource-action">
                          {resource.downloadLink ? (
                            <FiDownload size={20} />
                          ) : (
                            <FiExternalLink size={20} />
                          )}
                        </div>
                      </motion.div>
                    );
                  })}
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Resources;
