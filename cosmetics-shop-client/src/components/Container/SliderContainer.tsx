import React from "react";
import { twMerge } from "tailwind-merge";

interface SliderContainerProps {
  children: React.ReactNode;
  className?: string;
}

const SliderContainer = ({ children, className }: SliderContainerProps) => {
  return (
    <div className={twMerge("max-w-[1740px] px-4 py-2 mx-auto", className)}>
      {children}
    </div>
  );
};

export default SliderContainer;
