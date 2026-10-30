import React from 'react';

interface MizigeGridProps {
  size: number;
}

export const MizigeGrid: React.FC<MizigeGridProps> = ({ size }) => {
  const half = size / 2;

  return (
    <svg
      width={size}
      height={size}
      className="absolute inset-0 pointer-events-none"
      style={{ width: size, height: size }}
    >
      {/* Outer border */}
      <rect
        x="2"
        y="2"
        width={size - 4}
        height={size - 4}
        fill="transparent"
        stroke="#6ee7b7"
        strokeWidth="3"
        rx="8"
      />

      {/* Diagonal top-left to bottom-right */}
      <line
        x1="2"
        y1="2"
        x2={size - 2}
        y2={size - 2}
        stroke="#a7f3d0"
        strokeWidth="1.5"
        strokeDasharray="5,5"
      />

      {/* Diagonal top-right to bottom-left */}
      <line
        x1={size - 2}
        y1="2"
        x2="2"
        y2={size - 2}
        stroke="#a7f3d0"
        strokeWidth="1.5"
        strokeDasharray="5,5"
      />

      {/* Horizontal middle line */}
      <line
        x1="2"
        y1={half}
        x2={size - 2}
        y2={half}
        stroke="#a7f3d0"
        strokeWidth="1.5"
        strokeDasharray="5,5"
      />

      {/* Vertical middle line */}
      <line
        x1={half}
        y1="2"
        x2={half}
        y2={size - 2}
        stroke="#a7f3d0"
        strokeWidth="1.5"
        strokeDasharray="5,5"
      />
    </svg>
  );
};
