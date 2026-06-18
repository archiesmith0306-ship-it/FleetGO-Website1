export default function Logo({ className = "h-8" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 132 38"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="FleetGO"
    >
      {/* Flat wordmark — "Fleet" adapts to theme via currentColor, "GO" in brand gold */}
      <text
        x="0"
        y="29"
        fontFamily="'Oswald', 'Inter', system-ui, -apple-system, sans-serif"
        fontSize="32"
        fontWeight="600"
        letterSpacing="-0.5"
      >
        <tspan fill="currentColor">Fleet</tspan><tspan fill="#c8970d">GO</tspan>
      </text>
    </svg>
  );
}
