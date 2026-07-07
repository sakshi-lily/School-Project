import React from 'react';

const SchoolLogo = ({ className = "w-16 h-16", showText = true, textColor = "text-slate-800" }) => {
  return (
    <div className="flex items-center gap-3">
      {/* SVG Circle Logo */}
      <svg
        className={`${className} flex-shrink-0 filter drop-shadow-sm transition-transform duration-300 hover:scale-105`}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Outer Golden Border */}
        <circle cx="50" cy="50" r="48" fill="#F4B400" />
        {/* Inner Blue Circle */}
        <circle cx="50" cy="50" r="44" fill="#0F4C81" />
        {/* Decorative inner dotted circle */}
        <circle cx="50" cy="50" r="40" stroke="#F4B400" strokeWidth="1" strokeDasharray="3,3" fill="none" />

        {/* Core Emblem Shape (White Shield/Diamond) */}
        <path
          d="M50 20 L75 45 L50 78 L25 45 Z"
          fill="#FFFFFF"
          stroke="#F4B400"
          strokeWidth="1.5"
        />

        {/* Flaming Torch of Knowledge (Traditional Indian Diya/Jyoti & Torch) */}
        {/* Torch Handle */}
        <path
          d="M50 52 L50 72"
          stroke="#0F4C81"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <path
          d="M48 72 L52 72"
          stroke="#F4B400"
          strokeWidth="3"
          strokeLinecap="round"
        />

        {/* Torch Cup */}
        <path
          d="M44 52 C44 52, 44 46, 50 46 C56 46, 56 52, 56 52 Z"
          fill="#F4B400"
          stroke="#0F4C81"
          strokeWidth="1"
        />

        {/* Flame */}
        <path
          d="M50 30 C53 38, 56 40, 53 45 C51 47, 49 47, 47 45 C44 40, 47 38, 50 30 Z"
          fill="url(#flameGradient)"
        />

        {/* Rays of Wisdom */}
        <line x1="50" y1="28" x2="50" y2="23" stroke="#F4B400" strokeWidth="2" strokeLinecap="round" />
        <line x1="57" y1="31" x2="61" y2="27" stroke="#F4B400" strokeWidth="2" strokeLinecap="round" />
        <line x1="43" y1="31" x2="39" y2="27" stroke="#F4B400" strokeWidth="2" strokeLinecap="round" />
        <line x1="62" y1="37" x2="67" y2="34" stroke="#F4B400" strokeWidth="2" strokeLinecap="round" />
        <line x1="38" y1="37" x2="33" y2="34" stroke="#F4B400" strokeWidth="2" strokeLinecap="round" />

        {/* Circular text paths */}
        <defs>
          <path id="textPathUpper" d="M12 50 A38 38 0 0 1 88 50" />
          <path id="textPathLower" d="M88 50 A38 38 0 0 1 12 50" />

          <linearGradient id="flameGradient" x1="50" y1="30" x2="50" y2="47" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FF4500" />
            <stop offset="60%" stopColor="#FF8C00" />
            <stop offset="100%" stopColor="#F4B400" />
          </linearGradient>
        </defs>

        {/* Upper text: Hindi School Name */}
        <text fill="#FFFFFF" fontSize="6.5" fontWeight="bold" letterSpacing="0.3">
          <textPath href="#textPathUpper" startOffset="50%" textAnchor="middle">
            ठाकुर बीरी सिंह इण्टर कॉलेज
          </textPath>
        </text>

        {/* Lower text: Location */}
        <text fill="#F4B400" fontSize="5.5" fontWeight="semibold" letterSpacing="0.5">
          <textPath href="#textPathLower" startOffset="50%" textAnchor="middle">
            टूण्डला (फ़िरोज़ाबाद) • स्था. 1950
          </textPath>
        </text>
      </svg>

      {showText && (
        <div className="flex flex-col">
          <h1 className={`text-base md:text-xl font-heading font-extrabold tracking-tight ${textColor} leading-tight`}>
            THAKUR BIRI SINGH INTER COLLEGE
          </h1>
          <span className="text-[10px] md:text-xs font-semibold text-slate-500 tracking-wider">
            TUNDLA, FIROZABAD (U.P.) • AFFILIATED TO UPMSP
          </span>
        </div>
      )}
    </div>
  );
};

export default SchoolLogo;
