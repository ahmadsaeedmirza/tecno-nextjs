import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
}

export const ScrollReveal = ({
  children,
  className = "",
}: ScrollRevealProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [80, 0, 0, -40]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0.95, 1, 1, 0.98],
  );

  return (
    <motion.div ref={ref} style={{ y, opacity, scale }} className={className}>
      {children}
    </motion.div>
  );
};

export const ParallaxImage = ({
  src,
  alt,
  className = "",
}: {
  src: string;
  alt: string;
  className?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.img
        src={src}
        alt={alt}
        style={{ y }}
        className="w-full h-[120%] object-cover"
      />
    </div>
  );
};

export const TextReveal = ({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const StaggerContainer = ({
  children,
  className = "",
  staggerChildren = 0.1,
  delayChildren = 0,
}: {
  children: ReactNode;
  className?: string;
  staggerChildren?: number;
  delayChildren?: number;
}) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren, delayChildren } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const StaggerItem = ({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 40, scale: 0.95 },
        visible: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: { duration: 0.6, ease: "easeOut" },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
