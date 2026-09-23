import React from "react";

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export default function Badge({ children, className = "", ...props }: BadgeProps) {
  return (
    <div
      className={`inline-flex rounded-full p-[1px] bg-gradient-to-r from-text-primary to-border-brand/40 ${className}`}
      {...props}
    >
      <div className="rounded-full bg-bg-brand px-6 py-3 flex items-center justify-center">
        <span className="text-body font-mori font-medium text-text-primary select-none whitespace-nowrap leading-none">
          {children}
        </span>
      </div>
    </div>
  );
}
