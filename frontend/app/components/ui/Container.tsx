import React from "react";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  as?: React.ElementType;
}

export default function Container({
  children,
  as: Component = "div",
  className = "",
  ...props
}: ContainerProps) {
  return (
    <Component
      className={`container-custom w-full mx-auto ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
}
