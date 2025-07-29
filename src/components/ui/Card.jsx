import React from 'react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';

const Card = ({ 
  children, 
  className = '', 
  variant = 'default',
  hoverable = true,
  glowing = false,
  ...props 
}) => {
  const baseClasses = 'rounded-xl transition-all duration-300';
  
  const variants = {
    default: 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm',
    glass: 'bg-white/10 dark:bg-white/5 backdrop-blur-md border border-white/20 dark:border-white/10 shadow-xl',
    gradient: 'bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 border border-gray-200 dark:border-gray-700 shadow-lg',
    futuristic: 'bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-md border border-cyan-500/30 shadow-2xl shadow-cyan-500/10',
    neon: 'bg-gray-900/90 backdrop-blur-md border border-purple-500/50 shadow-2xl shadow-purple-500/20',
  };
  
  const hoverVariants = {
    default: 'hover:shadow-md hover:border-gray-300 dark:hover:border-gray-600',
    glass: 'hover:bg-white/20 dark:hover:bg-white/10 hover:shadow-2xl',
    gradient: 'hover:shadow-xl hover:from-white hover:to-blue-50 dark:hover:from-gray-700 dark:hover:to-gray-800',
    futuristic: 'hover:border-cyan-400/50 hover:shadow-cyan-400/20',
    neon: 'hover:border-purple-400/70 hover:shadow-purple-400/30',
  };

  const cardClasses = clsx(
    baseClasses,
    variants[variant],
    hoverable && hoverVariants[variant],
    glowing && 'animate-pulse',
    className
  );

  const cardVariants = {
    hover: { 
      y: -2,
      transition: { type: "spring", stiffness: 300, damping: 30 }
    }
  };

  return (
    <motion.div
      className={cardClasses}
      variants={hoverable ? cardVariants : {}}
      whileHover={hoverable ? "hover" : undefined}
      {...props}
    >
      {/* Glow effect for futuristic variants */}
      {(variant === 'futuristic' || variant === 'neon') && (
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      )}
      
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
};

export default Card;