// src/components/AnimatedBookCard.js
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import BookCard from "./BookCard";

const AnimatedBookCard = ({ book }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.9, rotate: 5 }}
      animate={isInView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
      exit={{ opacity: 0, scale: 0.9, rotate: -5 }}
      transition={{
        duration: 0.5,
        ease: [0.68, -0.55, 0.27, 1.55],
      }}
    >
      <BookCard book={book} />
    </motion.div>
  );
};

export default AnimatedBookCard;
