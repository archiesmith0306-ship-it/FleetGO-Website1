export default function Logo({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* 3D Semi Sleeper Truck - Isometric view */}
      <defs>
        {/* Gradients for 3D effect */}
        <linearGradient id="truckBody" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#3B82F6" />
          <stop offset="100%" stopColor="#1E40AF" />
        </linearGradient>
        
        <linearGradient id="truckSide" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#2563EB" />
          <stop offset="100%" stopColor="#1E3A8A" />
        </linearGradient>
        
        <linearGradient id="cabin" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#60A5FA" />
          <stop offset="100%" stopColor="#2563EB" />
        </linearGradient>

        <linearGradient id="windshield" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#93C5FD" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.2" />
        </linearGradient>

        {/* Glow filter */}
        <filter id="glow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      {/* Shadow */}
      <ellipse cx="60" cy="85" rx="45" ry="6" fill="black" opacity="0.2" />

      {/* Sleeper cabin - back part */}
      <path
        d="M 25 45 L 25 65 L 28 68 L 45 68 L 48 65 L 48 45 Z"
        fill="url(#truckBody)"
      />
      
      {/* Sleeper cabin - top */}
      <path
        d="M 25 45 L 30 40 L 53 40 L 48 45 Z"
        fill="url(#cabin)"
      />
      
      {/* Sleeper cabin - side */}
      <path
        d="M 48 45 L 53 40 L 53 63 L 48 68 Z"
        fill="url(#truckSide)"
      />

      {/* Main cabin - front part */}
      <path
        d="M 45 48 L 45 68 L 48 71 L 70 71 L 73 68 L 73 48 Z"
        fill="url(#truckBody)"
      />
      
      {/* Main cabin - top */}
      <path
        d="M 45 48 L 50 43 L 78 43 L 73 48 Z"
        fill="url(#cabin)"
      />
      
      {/* Main cabin - side */}
      <path
        d="M 73 48 L 78 43 L 78 66 L 73 71 Z"
        fill="url(#truckSide)"
      />

      {/* Windshield - front */}
      <path
        d="M 48 50 L 48 62 L 50 64 L 68 64 L 70 62 L 70 50 Z"
        fill="url(#windshield)"
        stroke="#60A5FA"
        strokeWidth="0.5"
      />

      {/* Windshield - side angled */}
      <path
        d="M 70 50 L 75 47 L 75 59 L 70 62 Z"
        fill="url(#windshield)"
        stroke="#60A5FA"
        strokeWidth="0.5"
      />

      {/* Grille */}
      <rect x="50" y="65" width="16" height="5" fill="#1E3A8A" rx="0.5" />
      <line x1="52" y1="65" x2="52" y2="70" stroke="#60A5FA" strokeWidth="0.5" opacity="0.5" />
      <line x1="55" y1="65" x2="55" y2="70" stroke="#60A5FA" strokeWidth="0.5" opacity="0.5" />
      <line x1="58" y1="65" x2="58" y2="70" stroke="#60A5FA" strokeWidth="0.5" opacity="0.5" />
      <line x1="61" y1="65" x2="61" y2="70" stroke="#60A5FA" strokeWidth="0.5" opacity="0.5" />
      <line x1="64" y1="65" x2="64" y2="70" stroke="#60A5FA" strokeWidth="0.5" opacity="0.5" />

      {/* Headlights with glow */}
      <circle cx="52" cy="67.5" r="1.5" fill="#FCD34D" filter="url(#glow)" />
      <circle cx="64" cy="67.5" r="1.5" fill="#FCD34D" filter="url(#glow)" />

      {/* Wheels - rear */}
      <g>
        {/* Rear wheel back */}
        <circle cx="32" cy="72" r="5" fill="#1F2937" stroke="#374151" strokeWidth="1" />
        <circle cx="32" cy="72" r="3" fill="#4B5563" />
        <circle cx="32" cy="72" r="1.5" fill="#6B7280" />
        
        {/* Rear wheel front */}
        <circle cx="40" cy="72" r="5" fill="#1F2937" stroke="#374151" strokeWidth="1" />
        <circle cx="40" cy="72" r="3" fill="#4B5563" />
        <circle cx="40" cy="72" r="1.5" fill="#6B7280" />
      </g>

      {/* Wheels - front */}
      <g>
        <circle cx="65" cy="72" r="5" fill="#1F2937" stroke="#374151" strokeWidth="1" />
        <circle cx="65" cy="72" r="3" fill="#4B5563" />
        <circle cx="65" cy="72" r="1.5" fill="#6B7280" />
      </g>

      {/* Exhaust pipes */}
      <rect x="46" y="50" width="1.5" height="18" fill="#374151" rx="0.5" />
      <rect x="43" y="50" width="1.5" height="16" fill="#374151" rx="0.5" />
      
      {/* Side mirror */}
      <line x1="73" y1="53" x2="78" y2="51" stroke="#2563EB" strokeWidth="1" />
      <rect x="78" y="49.5" width="3" height="3" fill="#1E40AF" stroke="#60A5FA" strokeWidth="0.5" rx="0.5" />

      {/* Accent details */}
      <line x1="48" y1="46" x2="53" y2="41" stroke="#60A5FA" strokeWidth="0.5" opacity="0.5" />
      <line x1="28" y1="47" x2="48" y2="47" stroke="#1E40AF" strokeWidth="0.5" opacity="0.6" />
    </svg>
  );
}