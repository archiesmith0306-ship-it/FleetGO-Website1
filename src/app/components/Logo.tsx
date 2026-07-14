export default function Logo({ className = "h-8" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 440 150"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="FleetGO"
    >
      <defs>
        {/* Chrome / metallic bevel rim */}
        <linearGradient id="fg-rim" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="18%" stopColor="#c9d5e0" />
          <stop offset="50%" stopColor="#75859a" />
          <stop offset="72%" stopColor="#515f70" />
          <stop offset="100%" stopColor="#e6edf3" />
        </linearGradient>

        {/* Glossy dark-navy badge interior */}
        <linearGradient id="fg-badge" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#294863" />
          <stop offset="45%" stopColor="#0e2135" />
          <stop offset="100%" stopColor="#03080f" />
        </linearGradient>

        {/* Top glass reflection */}
        <linearGradient id="fg-gloss" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.34" />
          <stop offset="60%" stopColor="#ffffff" stopOpacity="0.05" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>

        {/* Blue headlight flare */}
        <radialGradient id="fg-flare" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#d3f1ff" stopOpacity="0.95" />
          <stop offset="38%" stopColor="#4fb8ee" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#3aa0e0" stopOpacity="0" />
        </radialGradient>

        {/* Bright white wordmark */}
        <linearGradient id="fg-text" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="58%" stopColor="#f4f8fc" />
          <stop offset="100%" stopColor="#dbe4ee" />
        </linearGradient>

        <filter id="fg-shadow" x="-15%" y="-15%" width="130%" height="150%">
          <feDropShadow dx="0" dy="2.5" stdDeviation="2.5" floodColor="#01060e" floodOpacity="0.7" />
        </filter>
      </defs>

      {/* Metallic rim */}
      <rect x="2.5" y="2.5" width="435" height="145" rx="28" fill="url(#fg-rim)" />
      <rect x="2.5" y="2.5" width="435" height="145" rx="28" fill="none" stroke="#0a1626" strokeOpacity="0.5" strokeWidth="1.5" />

      {/* Badge interior */}
      <rect x="13" y="13" width="414" height="124" rx="20" fill="url(#fg-badge)" />

      {/* Blue flare behind the text */}
      <ellipse cx="162" cy="86" rx="150" ry="64" fill="url(#fg-flare)" />

      {/* Top glass reflection */}
      <rect x="17" y="17" width="406" height="56" rx="17" fill="url(#fg-gloss)" />

      {/* Inner highlight edge for the bevel */}
      <rect x="13" y="13" width="414" height="124" rx="20" fill="none" stroke="#ffffff" strokeOpacity="0.3" strokeWidth="1" />

      {/* Wordmark */}
      <text
        x="220"
        y="102"
        textAnchor="middle"
        fontFamily="'Arial', 'Helvetica Neue', system-ui, sans-serif"
        fontSize="84"
        fontWeight="800"
        letterSpacing="-1.5"
        fill="url(#fg-text)"
        filter="url(#fg-shadow)"
      >
        FleetGO
      </text>
    </svg>
  );
}
