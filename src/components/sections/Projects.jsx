import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink, Star, GitFork, Eye } from 'lucide-react';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  // Mock GitHub projects data - replace with actual GitHub API call
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setProjects([
        {
          id: 1,
          name: 'DNA-Website',
          description: 'Official website for DNA community built with React and modern web technologies',
          html_url: 'https://github.com/DNA-DEVELOPERS-DEV/DNA-Website',
          homepage: 'https://dna-community.dev',
          language: 'JavaScript',
          stargazers_count: 45,
          forks_count: 12,
          watchers_count: 8,
          topics: ['react', 'website', 'community', 'open-source']
        },
        {
          id: 2,
          name: 'Code-Challenge-Platform',
          description: 'A platform for hosting coding challenges and hackathons for the community',
          html_url: 'https://github.com/DNA-DEVELOPERS-DEV/Code-Challenge-Platform',
          homepage: null,
          language: 'TypeScript',
          stargazers_count: 32,
          forks_count: 8,
          watchers_count: 5,
          topics: ['typescript', 'coding-challenges', 'platform', 'education']
        },
        {
          id: 3,
          name: 'Learning-Resources',
          description: 'Curated collection of learning resources for developers at all levels',
          html_url: 'https://github.com/DNA-DEVELOPERS-DEV/Learning-Resources',
          homepage: null,
          language: 'Markdown',
          stargazers_count: 78,
          forks_count: 23,
          watchers_count: 15,
          topics: ['resources', 'learning', 'documentation', 'education']
        },
        {
          id: 4,
          name: 'Community-Bot',
          description: 'Discord bot for managing community activities and automating tasks',
          html_url: 'https://github.com/DNA-DEVELOPERS-DEV/Community-Bot',
          homepage: null,
          language: 'Python',
          stargazers_count: 28,
          forks_count: 6,
          watchers_count: 4,
          topics: ['discord-bot', 'python', 'automation', 'community']
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
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
      y: -8,
      scale: 1.02,
      transition: {
        type: "spring",
        stiffness: 300
      }
    }
  };

  const getLanguageColor = (language) => {
    const colors = {
      JavaScript: '#f7df1e',
      TypeScript: '#3178c6',
      Python: '#3776ab',
      Markdown: '#083fa1',
      HTML: '#e34c26',
      CSS: '#1572b6',
      React: '#61dafb'
    };
    return colors[language] || '#6b7280';
  };

  if (loading) {
    return (
      <section id="projects" className="section bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded w-64 mx-auto mb-4"></div>
              <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-96 mx-auto mb-8"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
                    <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded mb-3"></div>
                    <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded mb-2"></div>
                    <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
                    <div className="flex justify-between items-center">
                      <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-20"></div>
                      <div className="flex space-x-4">
                        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-12"></div>
                        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-12"></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="section bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Open Source Projects
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Explore our community-driven projects and contribute to the future of technology
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {projects.map((project) => (
            <motion.div
              key={project.id}
              className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700"
              variants={cardVariants}
              whileHover="hover"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {project.name}
                </h3>
                <div className="flex space-x-2">
                  <motion.a
                    href={project.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Github className="w-5 h-5" />
                  </motion.a>
                  {project.homepage && (
                    <motion.a
                      href={project.homepage}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <ExternalLink className="w-5 h-5" />
                    </motion.a>
                  )}
                </div>
              </div>

              <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-4">
                {project.topics.slice(0, 3).map((topic) => (
                  <span
                    key={topic}
                    className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded-full"
                  >
                    {topic}
                  </span>
                ))}
              </div>

              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-1">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: getLanguageColor(project.language) }}
                  ></div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {project.language}
                  </span>
                </div>

                <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4" />
                    <span>{project.stargazers_count}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <GitFork className="w-4 h-4" />
                    <span>{project.forks_count}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Eye className="w-4 h-4" />
                    <span>{project.watchers_count}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <motion.a
            href="https://github.com/DNA-DEVELOPERS-DEV"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-6 py-3 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors duration-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Github className="w-5 h-5" />
            <span>View All Projects</span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;