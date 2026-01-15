import React from 'react';
import { motion } from 'framer-motion';

interface TextRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export const TextReveal: React.FC<TextRevealProps> = ({ children, className = '', delay = 0 }) => {
  // If children is a string, we can split it. If it's a complex element, we just fade it in.
  // For this usage, we assume usually strings or inline elements.
  
  if (typeof children !== 'string') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
        className={className}
      >
        {children}
      </motion.div>
    );
  }

  const text = children as string;

  return (
    <span className={`inline-block overflow-hidden ${className}`}>
        <motion.span
          initial={{ y: "110%" }}
         whileInView={{ y: 0 }}
         viewport={{ once: true, margin: "-10%" }}
         transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
         className="inline-block"
        >
          {text}
        </motion.span>
    </span>
  );
};

export const StaggerText: React.FC<{ text: string; className?: string; delay?: number }> = ({ text, className = '', delay = 0 }) => {
  const words = text.split(' ');
  
  return (
    <span className={`${className} inline-flex flex-wrap gap-x-[0.25em]`}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden">
          <motion.span
            className="inline-block"
            initial={{ y: "110%" }}
            whileInView={{ y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ 
                duration: 0.8, 
                delay: delay + (i * 0.03), 
                ease: [0.22, 1, 0.36, 1] 
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
};
