import React, { useState, useEffect } from "react";

export default function PiChart() {
  const width = 100;
  const height = 200;
  const strokeWidth = 18;
  const radius = width / 2;

  const segments = [
    { name: "Blue", value: 60, color: "#2563eb" },
    { name: "Yellow", value: 30, color: "#f59e0b" },
    { name: "Green", value: 40, color: "#16a34a" },
    { name: "Red", value: 50, color: "#ef4444" },
  ];

  const totalValue = segments.reduce((sum, s) => sum + s.value, 0);

  const perimeter =
    2 * (height - width) + 2 * Math.PI * radius;

  const [animated, setAnimated] = useState(false);
  const [hovered, setHovered] = useState(null);

  useEffect(() => {
    setTimeout(() => setAnimated(true), 200);
  }, []);

  let accumulated = 0;

  return (
    <div className="relative w-[160px] h-[320px] flex items-center justify-center">
      <svg width={width} height={height}>
        {/* Background */}
        <rect
          x={strokeWidth / 2}
          y={strokeWidth / 2}
          width={width - strokeWidth}
          height={height - strokeWidth}
          rx={radius}
          ry={radius}
          fill="none"
          stroke="#e5e7eb"
          strokeWidth={strokeWidth}
        />

        {segments.map((segment, index) => {
          const segmentLength =
            (segment.value / totalValue) * perimeter;

          const dashArray = `${segmentLength} ${perimeter}`;
          const dashOffset = -accumulated;

          accumulated += segmentLength;

          return (
            <rect
              key={index}
              x={strokeWidth / 2}
              y={strokeWidth / 2}
              width={width - strokeWidth}
              height={height - strokeWidth}
              rx={radius}
              ry={radius}
              fill="none"
              stroke={segment.color}
              strokeWidth={
                hovered === index
                  ? strokeWidth + 5
                  : strokeWidth
              }
              strokeDasharray={dashArray}
              strokeDashoffset={
                animated ? dashOffset : perimeter
              }
              className="transition-all duration-700 ease-out cursor-pointer"
              style={{
                filter:
                  hovered === index
                    ? "brightness(1.15)"
                    : "brightness(1)",
              }}
              onMouseEnter={() => setHovered(index)}
              onMouseLeave={() => setHovered(null)}
            />
          );
        })}
      </svg>

      {/* Center Text */}
      <div className="absolute text-center">
        <p className="text-gray-500 text-sm">
          {hovered !== null
            ? segments[hovered].name
            : "Total"}
        </p>
        <h2 className="text-2xl font-bold">
          {hovered !== null
            ? segments[hovered].value
            : totalValue}
        </h2>
      </div>

      {/* Tooltip */}
      {hovered !== null && (
        <div className="absolute -bottom-10 bg-black text-white text-xs px-3 py-1 rounded-lg shadow-lg">
          {segments[hovered].name}:{" "}
          {(
            (segments[hovered].value / totalValue) *
            100
          ).toFixed(1)}
          %
        </div>
      )}
    </div>
  );
}