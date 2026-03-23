import { motion, useReducedMotion } from "framer-motion";
import type { ElementType, ReactNode } from "react";
import React from "react";

type RevealDelay = 0 | 1 | 2 | 3;
type RevealDirection = "up" | "diagonal-left" | "diagonal-right" | "none";

type RevealProps = {
  as?: ElementType;
  delay?: RevealDelay;
  direction?: RevealDirection;
  className?: string;
  children: ReactNode;
  [key: string]: unknown;
};

export function Reveal({
  as = "div",
  delay = 0,
  direction = "up",
  className,
  children,
  ...props
}: RevealProps) {
  const shouldReduceMotion = useReducedMotion();
  const Component = motion.create(as as any);

  const getInitialPosition = () => {
    if (shouldReduceMotion || direction === "none") return { x: 0, y: 0 };
    switch (direction) {
      case "up":
        return { x: 0, y: 20 };
      case "diagonal-left":
        return { x: -15, y: 20 };
      case "diagonal-right":
        return { x: 15, y: 20 };
      default:
        return { x: 0, y: 20 };
    }
  };

  const variants = {
    hidden: {
      opacity: 0,
      ...getInitialPosition(),
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
        delay: delay * 0.1,
      },
    },
  };

  return (
    <Component
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      variants={variants}
      {...props}
    >
      {children}
    </Component>
  );
}
