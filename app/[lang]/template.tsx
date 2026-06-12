"use client";

import { motion } from "framer-motion";

/**
 * The ink fade — 300ms of the same darkness between rooms, so journey →
 * pricing → checkout stays one building instead of three hard cuts.
 * Opacity only: position:fixed children (the terrain) keep the viewport.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, ease: [0.22, 0.8, 0.24, 1] }}
    >
      {children}
    </motion.div>
  );
}
