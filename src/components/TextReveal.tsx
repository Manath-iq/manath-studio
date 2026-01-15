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
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-5%" }}
        transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
        className={className}
      >
        {children}
      </motion.div>
    );
  }

  const text = children as string;

  return (
    <span className={`inline-block overflow-hidden ${className} align-bottom`}>
      <motion.span
        initial={{ y: "100%" }}
        whileInView={{ y: 0 }}
        viewport={{ once: true, margin: "-5%" }}
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
    <span className={`${className} inline-flex flex-wrap gap-x-[0.25em] leading-tight`}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom">
          <motion.span
            className="inline-block"
            initial={{ y: "100%" }}
            whileInView={{ y: 0 }}
            viewport={{ once: true, margin: "-5%" }}
            transition={{
              duration: 0.8,
              delay: delay + (i * 0.05),
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
