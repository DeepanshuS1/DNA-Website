import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { FiDownload, FiExternalLink, FiBook, FiVideo, FiCode, FiFile, FiLink, FiBookOpen, FiFilter, FiX, FiSearch, FiChevronDown, FiGrid, FiList, FiMaximize2, FiMinimize2, FiEye, FiEyeOff } from 'react-icons/fi';
import { SiJavascript, SiReact, SiPython, SiNodedotjs, SiGit, SiDocker } from 'react-icons/si';

// Move allResources outside component to prevent recreation on every render
const allResources = [
  // PDF Resources
  {
    title: 'JavaScript Complete Guide',
    description: 'Comprehensive guide covering ES6+ features, DOM manipulation, and modern JavaScript concepts.',
    type: 'PDF',
    category: 'PDF',
    size: '2.5 MB',
    downloadLink: '#',
    icon: SiJavascript,
    tags: ['Beginner', 'JavaScript', 'Frontend'],
    color: '#f7df1e'
  },
  {
    title: 'React Development Handbook',
    description: 'Master React with hooks, context, and modern patterns. Includes practical examples.',
    type: 'PDF',
    category: 'PDF',
    size: '3.2 MB',
    downloadLink: '#',
    icon: SiReact,
    tags: ['Intermediate', 'React', 'Frontend'],
    color: '#61dafb'
  },
  
  // Video Resources
  {
    title: 'Node.js Backend Development',
    description: 'Build REST APIs, work with databases, and implement authentication.',
    type: 'Video',
    category: 'Video',
    duration: '25 hours',
    link: 'https://youtube.com',
    icon: SiNodedotjs,
    tags: ['Node.js', 'Backend', 'API'],
    color: '#339933'
  },
  {
    title: 'React Hooks Deep Dive',
    description: 'Advanced React patterns, custom hooks, and performance optimization.',
    type: 'Video',
    category: 'Video',
    duration: '18 hours',
    link: 'https://youtube.com',
    icon: SiReact,
    tags: ['React', 'Advanced', 'Hooks'],
    color: '#61dafb'
  },

  // Course Resources
  {
    title: 'Full Stack Web Development',
    description: 'Complete course covering HTML, CSS, JavaScript, React, Node.js, and MongoDB.',
    type: 'Course',
    category: 'Course',
    duration: '40 hours',
    link: 'https://freecodecamp.org',
    icon: FiCode,
    tags: ['Full Stack', 'Web Development', 'Free'],
    color: '#0a0a23'
  },
  {
    title: 'Git & GitHub Mastery',
    description: 'Learn version control, collaboration, and advanced Git workflows.',
    type: 'Course',
    category: 'Course',
    duration: '8 hours',
    link: 'https://github.com/skills',
    icon: SiGit,
    tags: ['Git', 'Version Control', 'DevOps'],
    color: '#f05032'
  },

  // External Link Resources
  {
    title: 'MDN Web Docs',
    description: 'The most comprehensive web development documentation and tutorials.',
    type: 'Documentation',
    category: 'External Link',
    link: 'https://developer.mozilla.org',
    icon: FiBook,
    tags: ['Documentation', 'Reference', 'Web'],
    color: '#000000'
  },
  {
    title: 'Stack Overflow',
    description: 'Get answers to your programming questions from the community.',
    type: 'Community',
    category: 'External Link',
    link: 'https://stackoverflow.com',
    icon: FiExternalLink,
    tags: ['Community', 'Q&A', 'Help'],
    color: '#f48024'
  }
];

const Resources = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredResources, setFilteredResources] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [showPreview, setShowPreview] = useState(6); // Number of items to show initially
  const [contentHeight, setContentHeight] = useState(0);
  const ref = useRef(null);
  const contentRef = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const filterOptions = ['All', 'PDF', 'Video', 'Course', 'External Link'];

  // Filter resources based on active filter and search term
  useEffect(() => {
    let filtered = allResources;

    if (activeFilter !== 'All') {
      filtered = filtered.filter(resource => resource.category === activeFilter);
    }

    if (searchTerm) {
      filtered = filtered.filter(resource =>
        resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resource.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    setFilteredResources(filtered);
  }, [activeFilter, searchTerm]);

  // Calculate content height for smooth animation
  useEffect(() => {
    if (contentRef.current && filteredResources.length > 0) {
      const height = contentRef.current.scrollHeight;
      setContentHeight(height);
    }
  }, [filteredResources, isExpanded, viewMode]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 80, opacity: 0, scale: 0.7, rotateX: -15 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      rotateX: 0,
      transition: { 
        type: "spring",
        stiffness: 300,
        damping: 25,
        duration: 0.8,
        ease: [0.25, 0.4, 0.25, 1]
      }
    }
  };

  const resourceVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.8, 
      y: 60,
      rotateX: -20,
      rotateY: 5,
      z: -100
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      y: 0,
      rotateX: 0,
      rotateY: 0,
      z: 0,
      transition: { 
        type: "spring",
        stiffness: 250,
        damping: 20,
        duration: 0.7,
        ease: [0.25, 0.4, 0.25, 1]
      }
    },
    hover: {
      y: -15,
      scale: 1.03,
      rotateX: 5,
      rotateY: 2,
      z: 50,
      boxShadow: "0 30px 60px rgba(0,0,0,0.15), 0 15px 35px rgba(52, 152, 219, 0.1)",
      filter: "brightness(1.05)",
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 30,
        duration: 0.4
      }
    }
  };

  const filterVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20 }
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

  const handleToggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const getResourceIcon = (category) => {
    switch (category) {
      case 'PDF': return FiFile;
      case 'Video': return FiVideo;
      case 'Course': return FiBookOpen;
      case 'External Link': return FiLink;
      default: return FiFile;
    }
  };

  const getResourceColor = (category) => {
    switch (category) {
      case 'PDF': return '#e74c3c';
      case 'Video': return '#3498db';
      case 'Course': return '#1abc9c';
      case 'External Link': return '#f39c12';
      default: return '#95a5a6';
    }
  };

  return (
    <section id="resources" className="section resources" aria-labelledby="resources-title" ref={ref}>
      {/* Enhanced Background decorative elements */}
      <div className="resources-background">
        <motion.div 
          className="bg-shape bg-shape-1"
          animate={{ 
            rotate: [0, 360],
            scale: [1, 1.2, 1],
            opacity: [0.05, 0.15, 0.05]
          }}
          transition={{ 
            duration: 30, 
            repeat: Infinity, 
            ease: "linear" 
          }}
        />
        <motion.div 
          className="bg-shape bg-shape-2"
          animate={{ 
            rotate: [360, 0],
            scale: [1, 0.8, 1],
            opacity: [0.05, 0.12, 0.05]
          }}
          transition={{ 
            duration: 25, 
            repeat: Infinity, 
            ease: "linear" 
          }}
        />
      </div>

      <div className="container">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.h2 
            id="resources-title"
            className="section-title"
            variants={itemVariants}
            whileHover={{ 
              scale: 1.05,
              textShadow: "0px 0px 8px rgba(52, 152, 219, 0.3)"
            }}
          >
            Learning Resources
          </motion.h2>
          <motion.p 
            className="section-subtitle"
            variants={itemVariants}
          >
            Free resources to accelerate your development journey
          </motion.p>

          {/* Search and Filter Controls */}
          <motion.div className="resources-controls" variants={itemVariants}>
            {/* Search Bar */}
            <div className="search-bar">
              <FiSearch className="search-icon" />
              <input
                type="text"
                placeholder="Search resources..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
              {searchTerm && (
                <motion.button
                  className="clear-search"
                  onClick={() => setSearchTerm('')}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FiX />
                </motion.button>
              )}
            </div>

            {/* Filter Toggle */}
            <motion.button
              className="filter-toggle"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FiFilter />
              <span>Filter</span>
              {activeFilter !== 'All' && <span className="active-filter-indicator" />}
            </motion.button>
          </motion.div>

          {/* Filter Options */}
          <AnimatePresence>
            {isFilterOpen && (
              <motion.div
                className="filter-options"
                variants={filterVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                {filterOptions.map((filter) => (
                  <motion.button
                    key={filter}
                    className={`filter-option ${activeFilter === filter ? 'active' : ''}`}
                    onClick={() => {
                      setActiveFilter(filter);
                      setIsFilterOpen(false);
                    }}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {React.createElement(getResourceIcon(filter), { size: 16 })}
                    <span>{filter}</span>
                    {filter !== 'All' && (
                      <span className="filter-count">
                        {allResources.filter(r => r.category === filter).length}
                      </span>
                    )}
                  </motion.button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Active Filter Display */}
          {(activeFilter !== 'All' || searchTerm) && (
            <motion.div
              className="active-filters"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <span className="filter-label">Active filters:</span>
              {activeFilter !== 'All' && (
                <motion.span
                  className="active-filter-tag"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  {activeFilter}
                  <button
                    onClick={() => setActiveFilter('All')}
                    className="remove-filter"
                  >
                    <FiX size={12} />
                  </button>
                </motion.span>
              )}
              {searchTerm && (
                <motion.span
                  className="active-filter-tag"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  "{searchTerm}"
                  <button
                    onClick={() => setSearchTerm('')}
                    className="remove-filter"
                  >
                    <FiX size={12} />
                  </button>
                </motion.span>
              )}
            </motion.div>
          )}

          {/* Modern Resources Explorer Container */}
          <motion.div 
            className="resources-explorer"
            initial={{ opacity: 0, y: 50, scale: 0.95, rotateX: -10 }}
            animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
            transition={{ 
              delay: 0.4, 
              duration: 0.8,
              type: "spring",
              stiffness: 200,
              damping: 25,
              ease: [0.25, 0.4, 0.25, 1]
            }}
          >
            {/* Explorer Header with Controls */}
            <div className="explorer-header">
              <div className="explorer-info">
                <div className="explorer-title">
                  <FiCode className="explorer-icon" />
                  <div>
                    <h4>Resource Explorer</h4>
                    <span className="resource-count">
                      {filteredResources.length} {filteredResources.length === 1 ? 'resource' : 'resources'} available
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="explorer-controls">
                {/* View Mode Toggle */}
                <div className="view-mode-toggle">
                  <motion.button
                    className={`mode-btn ${viewMode === 'grid' ? 'active' : ''}`}
                    onClick={() => setViewMode('grid')}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FiGrid size={16} />
                  </motion.button>
                  <motion.button
                    className={`mode-btn ${viewMode === 'list' ? 'active' : ''}`}
                    onClick={() => setViewMode('list')}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FiList size={16} />
                  </motion.button>
                </div>

                {/* Expand Toggle */}
                <motion.button
                  className="expand-toggle"
                  onClick={handleToggleExpanded}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isExpanded ? (
                    <>
                      <FiMinimize2 size={16} />
                      <span>Minimize</span>
                    </>
                  ) : (
                    <>
                      <FiMaximize2 size={16} />
                      <span>Expand All</span>
                    </>
                  )}
                </motion.button>
              </div>
            </div>

            {/* Resources Display Area */}
            <motion.div
              className={`resources-display ${viewMode} ${isExpanded ? 'expanded' : 'collapsed'}`}
              initial={{ maxHeight: 700 }}
              animate={{ 
                maxHeight: isExpanded ? 10000 : 700
              }}
              transition={{ 
                duration: 0.8,
                ease: [0.4, 0, 0.2, 1]
              }}
              style={{
                overflowY: isExpanded ? 'visible' : 'auto',
                overflowX: 'hidden',
                height: isExpanded ? 'auto' : undefined
              }}
            >
              <div className={`resources-grid-wrapper ${viewMode}`} ref={contentRef}>
                {filteredResources.length > 0 ? (
                  (isExpanded ? filteredResources : filteredResources.slice(0, showPreview))
                    .map((resource, index) => {
                        const ResourceIcon = resource.icon;
                        return (
                          <motion.div
                            key={`${resource.title}-${resource.category}-${index}`}
                            className={`resource-card ${viewMode}`}
                            variants={resourceVariants}
                            initial={isExpanded ? "visible" : "hidden"}
                            animate="visible"
                            exit="hidden"
                            whileHover="hover"
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handleResourceClick(resource)}
                            layout
                          >
                            {/* Terminal-style header */}
                            <div className="resource-terminal-header">
                              <div className="terminal-dots">
                                <span className="dot red"></span>
                                <span className="dot yellow"></span>
                                <span className="dot green"></span>
                              </div>
                              <div className="terminal-title">
                                {resource.category.toLowerCase()}.{resource.type === 'PDF' ? 'pdf' : resource.type === 'Video' ? 'mp4' : 'js'}
                              </div>
                              <div 
                                className="resource-type-indicator"
                                style={{ backgroundColor: getResourceColor(resource.category) }}
                              >
                                {React.createElement(getResourceIcon(resource.category), { size: 14 })}
                              </div>
                            </div>

                            {/* Code-style content */}
                            <div className="resource-code-content">
                              {/* Line numbers and syntax-style content */}
                              <div className="code-line">
                                <span className="line-number">1</span>
                                <span className="code-comment">// {resource.type} Resource</span>
                              </div>
                              <div className="code-line">
                                <span className="line-number">2</span>
                                <span className="code-keyword">const</span> 
                                <span className="code-variable"> resource</span> 
                                <span className="code-operator"> = </span>
                                <span className="code-string">"{resource.title}"</span>
                              </div>
                              <div className="code-line">
                                <span className="line-number">3</span>
                                <span className="code-keyword">export</span> 
                                <span className="code-keyword"> default</span> 
                                <span className="code-function">{resource.title.replace(/\s+/g, '')}</span>
                              </div>
                            </div>

                            {/* Professional content section */}
                            <div className="resource-main-content">
                              <div className="resource-header-info">
                                <div className="resource-icon-wrapper">
                                  <ResourceIcon 
                                    size={20} 
                                    style={{ color: resource.color }}
                                  />
                                </div>
                                <h4 className="resource-title">{resource.title}</h4>
                              </div>
                              
                              <p className="resource-description">{resource.description}</p>
                              
                              {/* Meta information in terminal style */}
                              <div className="resource-terminal-info">
                                <div className="terminal-line">
                                  <span className="terminal-prompt">$</span>
                                  <span className="terminal-command">ls -la</span>
                                </div>
                                <div className="terminal-output">
                                  {resource.size && (
                                    <>
                                      <span className="terminal-size">{resource.size}</span>
                                      <span className="terminal-separator">•</span>
                                    </>
                                  )}
                                  {resource.duration && (
                                    <>
                                      <span className="terminal-duration">{resource.duration}</span>
                                      <span className="terminal-separator">•</span>
                                    </>
                                  )}
                                  <span className="terminal-type">{resource.category}</span>
                                </div>
                              </div>
                              
                              {/* Tags in code style */}
                              <div className="resource-code-tags">
                                <span className="code-comment">// Tags:</span>
                                <div className="tags-array">
                                  <span className="code-bracket">[</span>
                                  {resource.tags.slice(0, 3).map((tag, tagIndex) => (
                                    <span key={tagIndex}>
                                      <span className="code-string">"{tag}"</span>
                                      {tagIndex < Math.min(resource.tags.length, 3) - 1 && <span className="code-comma">, </span>}
                                    </span>
                                  ))}
                                  {resource.tags.length > 3 && (
                                    <span className="code-comment"> /* +{resource.tags.length - 3} more */</span>
                                  )}
                                  <span className="code-bracket">]</span>
                                </div>
                              </div>
                            </div>

                            {/* Action button in terminal style */}
                            <div className="resource-action-terminal">
                              <div className="terminal-command-line">
                                <span className="terminal-prompt">$</span>
                                <span className="terminal-action">
                                  {resource.downloadLink ? 'wget ' : 'curl '}
                                  <span className="terminal-url">{resource.downloadLink ? 'download' : 'open'}</span>
                                </span>
                                <motion.div
                                  className="terminal-cursor"
                                  animate={{ opacity: [1, 0] }}
                                  transition={{ duration: 1, repeat: Infinity }}
                                >
                                  |
                                </motion.div>
                              </div>
                            </div>

                            {/* Status indicator */}
                            <div className="resource-status">
                              <div className="status-dot" style={{ backgroundColor: resource.color }}></div>
                              <span className="status-text">Ready</span>
                            </div>

                            {/* Hover overlay with terminal style */}
                            <motion.div
                              className="resource-hover-overlay"
                              initial={{ opacity: 0 }}
                              whileHover={{ opacity: 1 }}
                              transition={{ duration: 0.2 }}
                            >
                              <div className="overlay-terminal">
                                <div className="overlay-prompt">
                                  <span className="terminal-prompt">$</span>
                                  <span className="overlay-command">
                                    {resource.downloadLink ? 'Download resource' : 'Open external link'}
                                  </span>
                                </div>
                                <div className="overlay-status">
                                  <span className="status-ready">● Ready to execute</span>
                                </div>
                              </div>
                            </motion.div>
                          </motion.div>
                        );
                      })
                  ) : (
                    <motion.div
                      className="no-results"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                    >
                      <FiSearch size={48} />
                      <h3>No resources found</h3>
                      <p>Try adjusting your search terms or filters</p>
                      <motion.button
                        className="reset-filters"
                        onClick={() => {
                          setActiveFilter('All');
                          setSearchTerm('');
                        }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Reset Filters
                      </motion.button>
                    </motion.div>
                  )}
              </div>

              {/* Gradient overlay for collapsed view */}
              {false && !isExpanded && filteredResources.length > showPreview && (
                <motion.div 
                  className="view-more-overlay"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="overlay-content">
                    <motion.button
                      className="view-more-btn"
                      onClick={handleToggleExpanded}
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FiEye size={20} />
                      <span>View {filteredResources.length - showPreview} More Resources</span>
                      <FiChevronDown className="expand-icon" />
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </motion.div>

            {/* Explorer Footer */}
            <div className="explorer-footer">
              <div className="footer-stats">
                <div className="stat-group">
                  <FiBook size={16} />
                  <span>{filteredResources.length} Resources</span>
                </div>
                <div className="stat-group">
                  <FiFilter size={16} />
                  <span>{activeFilter !== 'All' ? `Filtered by ${activeFilter}` : 'All Categories'}</span>
                </div>
                {searchTerm && (
                  <div className="stat-group">
                    <FiSearch size={16} />
                    <span>Search: "{searchTerm}"</span>
                  </div>
                )}
              </div>
              
              {!isExpanded && filteredResources.length > showPreview && (
                <motion.div 
                  className="quick-expand"
                  whileHover={{ scale: 1.02 }}
                >
                  <span className="expand-hint">
                    {filteredResources.length - showPreview} more resources hidden
                  </span>
                  <button 
                    className="quick-expand-btn"
                    onClick={handleToggleExpanded}
                  >
                    Show All
                  </button>
                </motion.div>
              )}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Resources;
