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
          <stop offset="0%" stopColor="#f6f9fc" />
          <stop offset="16%" stopColor="#cbd6e1" />
          <stop offset="48%" stopColor="#7c8b9c" />
          <stop offset="70%" stopColor="#5b6a7a" />
          <stop offset="100%" stopColor="#dfe7ee" />
        </linearGradient>

        {/* Glossy dark-blue badge interior */}
        <linearGradient id="fg-badge" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3a5d84" />
          <stop offset="42%" stopColor="#173049" />
          <stop offset="100%" stopColor="#040c18" />
        </linearGradient>

        {/* Top glass reflection */}
        <linearGradient id="fg-gloss" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.38" />
          <stop offset="60%" stopColor="#ffffff" stopOpacity="0.06" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>

        {/* Blue headlight flare on the left */}
        <radialGradient id="fg-flare" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#bdeeff" stopOpacity="0.95" />
          <stop offset="35%" stopColor="#4cc4f7" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#4cc4f7" stopOpacity="0" />
        </radialGradient>

        {/* Brushed-metal white wordmark */}
        <linearGradient id="fg-text" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="52%" stopColor="#eef4fa" />
          <stop offset="100%" stopColor="#b6c5d5" />
        </linearGradient>

        <filter id="fg-shadow" x="-15%" y="-15%" width="130%" height="150%">
          <feDropShadow dx="0" dy="2.5" stdDeviation="2.5" floodColor="#01060e" floodOpacity="0.65" />
        </filter>
      </defs>

      {/* Metallic rim */}
      <rect x="2.5" y="2.5" width="435" height="145" rx="32" fill="url(#fg-rim)" />
      <rect x="2.5" y="2.5" width="435" height="145" rx="32" fill="none" stroke="#0a1626" strokeOpacity="0.45" strokeWidth="1.5" />

      {/* Badge interior */}
      <rect x="13" y="13" width="414" height="124" rx="23" fill="url(#fg-badge)" />

      {/* Blue flare behind the text */}
      <ellipse cx="128" cy="82" rx="140" ry="62" fill="url(#fg-flare)" />

      {/* Top glass reflection */}
      <rect x="17" y="17" width="406" height="58" rx="20" fill="url(#fg-gloss)" />

      {/* Inner highlight edge for the bevel */}
      <rect x="13" y="13" width="414" height="124" rx="23" fill="none" stroke="#ffffff" strokeOpacity="0.28" strokeWidth="1" />

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
