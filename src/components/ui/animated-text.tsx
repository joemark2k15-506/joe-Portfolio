"use client";

import { TypeAnimation } from "react-type-animation";

interface AnimatedTextProps {
  sequences: (string | number)[];
  className?: string;
  speed?: 10 | 20 | 30 | 40 | 50 | 60 | 70 | 80 | 90;
}

export default function AnimatedText({
  sequences,
  className = "",
  speed = 50,
}: AnimatedTextProps) {
  return (
    <TypeAnimation
      sequence={sequences}
      wrapper="span"
      speed={speed}
      className={className}
      repeat={Infinity}
    />
  );
}
