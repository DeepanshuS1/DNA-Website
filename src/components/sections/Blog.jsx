import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowRight, User } from 'lucide-react';

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Mock blog posts data - replace with actual CMS integration
  useEffect(() => {
    setTimeout(() => {
      setPosts([
        {
          id: 1,
          title: 'Building Scalable React Applications: Best Practices for 2024',
          excerpt: 'Learn the latest patterns and techniques for building maintainable React applications that scale with your team and user base.',
          author: 'Deepansu',
          date: '2024-01-15',
          readTime: '8 min read',
          category: 'Development',
          image: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=800',
          slug: 'building-scalable-react-applications'
        },
        {
          id: 2,
          title: 'The Future of Web Development: Trends to Watch',
          excerpt: 'Explore emerging technologies and trends that are shaping the future of web development, from AI integration to edge computing.',
          author: 'Ayush Yadav',
          date: '2024-01-10',
          readTime: '6 min read',
          category: 'Technology',
          image: 'https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=800',
          slug: 'future-of-web-development'
        },
        {
          id: 3,
          title: 'Community Spotlight: Success Stories from DNA Members',
          excerpt: 'Celebrating the achievements of our community members and the impact they\'re making in the tech industry.',
          author: 'Rajan Jha',
          date: '2024-01-05',
          readTime: '5 min read',
          category: 'Community',
          image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800',
          slug: 'community-spotlight-success-stories'
        },
        {
          id: 4,
          title: 'Mastering Git: Advanced Workflows for Team Collaboration',
          excerpt: 'Deep dive into advanced Git workflows and strategies that improve team collaboration and code quality.',
          author: 'Akshit Tiwari',
          date: '2024-01-01',
          readTime: '10 min read',
          category: 'Development',
          image: 'https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg?auto=compress&cs=tinysrgb&w=800',
          slug: 'mastering-git-advanced-workflows'
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

  const getCategoryColor = (category) => {
    const colors = {
      Development: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
      Technology: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
      Community: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
      Tutorial: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200'
    };
    return colors[category] || 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
  };

  if (loading) {
    return (
      <section id="blog" className="section bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded w-64 mx-auto mb-4"></div>
              <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-96 mx-auto"></div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-200 dark:bg-gray-700 rounded-lg h-48 mb-4"></div>
                <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded mb-2"></div>
                <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
                <div className="flex justify-between">
                  <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-20"></div>
                  <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-16"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="blog" className="section bg-white dark:bg-gray-800 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Latest from Our Blog
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Insights, tutorials, and stories from the DNA community
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {posts.map((post) => (
            <motion.article
              key={post.id}
              className="bg-gray-50 dark:bg-gray-900 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700"
              variants={cardVariants}
              whileHover="hover"
            >
              <div className="relative overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
                />
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(post.category)}`}>
                    {post.category}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 line-clamp-2">
                  {post.title}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                  {post.excerpt}
                </p>

                <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                  <div className="flex items-center space-x-2">
                    <User className="w-4 h-4" />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(post.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                </div>

                <motion.button
                  className="flex items-center space-x-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors duration-200"
                  whileHover={{ x: 5 }}
                  onClick={() => {
                    // Handle blog post navigation
                    console.log(`Navigate to: /blog/${post.slug}`);
                  }}
                >
                  <span>Read More</span>
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </div>
            </motion.article>
          ))}
        </motion.div>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <motion.button
            className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors duration-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              // Handle view all posts navigation
              console.log('Navigate to: /blog');
            }}
          >
            <span>View All Posts</span>
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Blog;