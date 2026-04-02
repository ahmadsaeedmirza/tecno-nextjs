import { motion } from "framer-motion";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
  delay?: number;
}

const SectionReveal = ({ children, className = "", delay = 0 }: Props) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
    className={className}
  >
    {children}
  </motion.div>
);

export default SectionReveal;
