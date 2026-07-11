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
        {/* Background badge circle */}
        <circle cx="50" cy="50" r="48" fill="#FDF8E7" stroke="#D4AF37" strokeWidth="1.5" />
        
        {/* Inner dotted border */}
        <circle cx="50" cy="50" r="45" stroke="#8A1515" strokeWidth="0.8" strokeDasharray="2,2" fill="none" opacity="0.6" />

        {/* Definitions */}
        <defs>
          {/* We define a single ray pointing straight up relative to center (50, 43) */}
          <polygon id="sunRay" points="50,15 51.5,27 48.5,27" fill="#8A1515" />
          
          <linearGradient id="flameOuterGrad" x1="50" y1="26" x2="50" y2="52" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFF176" />
            <stop offset="50%" stopColor="#FFB300" />
            <stop offset="100%" stopColor="#FF8F00" />
          </linearGradient>

          <linearGradient id="flameInnerGrad" x1="50" y1="32" x2="50" y2="50" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FF9800" />
            <stop offset="100%" stopColor="#D84315" />
          </linearGradient>

          <path id="logoTextPath" d="M14,62 A38,38 0 1,1 86,62" fill="none" />
          <path id="logoTextPathLower" d="M86,62 A38,38 0 0,1 14,62" fill="none" />
        </defs>

        {/* Render the 11 Rays rotated around the sun center (50, 43) */}
        <use href="#sunRay" transform="rotate(0, 50, 43)" />
        <use href="#sunRay" transform="rotate(30, 50, 43)" />
        <use href="#sunRay" transform="rotate(60, 50, 43)" />
        <use href="#sunRay" transform="rotate(90, 50, 43)" />
        <use href="#sunRay" transform="rotate(120, 50, 43)" />
        <use href="#sunRay" transform="rotate(150, 50, 43)" />
        <use href="#sunRay" transform="rotate(-30, 50, 43)" />
        <use href="#sunRay" transform="rotate(-60, 50, 43)" />
        <use href="#sunRay" transform="rotate(-90, 50, 43)" />
        <use href="#sunRay" transform="rotate(-120, 50, 43)" />
        <use href="#sunRay" transform="rotate(-150, 50, 43)" />

        {/* Central Sun Circle */}
        <circle cx="50" cy="43" r="16" fill="#8A1515" />

        {/* Flame (Jyoti) - Outer Layer */}
        <path
          d="M50,26 C53,32 54,39 52,49 C51,51 49,51 48,49 C46,43 47,32 50,26 Z"
          fill="url(#flameOuterGrad)"
        />

        {/* Flame (Jyoti) - Inner Layer */}
        <path
          d="M50,32 C51.5,37 52.5,41 51,47 C50.5,48 49.5,48 49,47 C47.5,41 48.5,37 50,32 Z"
          fill="url(#flameInnerGrad)"
        />

        {/* Pedestal / Torch Base (outlined in maroon, filled with cream background) */}
        {/* Stem */}
        <rect x="48.5" y="59" width="3" height="25" rx="1" stroke="#8A1515" strokeWidth="1.2" fill="#FDF8E7" />
        {/* Top Plate */}
        <rect x="36" y="61" width="28" height="3" rx="1" stroke="#8A1515" strokeWidth="1.2" fill="#FDF8E7" />
        {/* Middle Plate */}
        <rect x="40" y="66" width="20" height="3" rx="1" stroke="#8A1515" strokeWidth="1.2" fill="#FDF8E7" />
        {/* Bottom Plate */}
        <rect x="44" y="71" width="12" height="3" rx="1" stroke="#8A1515" strokeWidth="1.2" fill="#FDF8E7" />

        {/* Curved Hindi Text: School Name and Location */}
        <text fill="#8A1515" fontSize="5.6" fontWeight="bold" fontFamily="system-ui, -apple-system, sans-serif" letterSpacing="0.1">
          <textPath href="#logoTextPath" startOffset="50%" textAnchor="middle">
            ठा. बीरी सिंह इण्टर कॉलेज, टूण्डला (फ़िरोज़ाबाद)
          </textPath>
        </text>

        {/* Optional Founding Year or Star at the Bottom */}
        <text fill="#8A1515" fontSize="4.8" fontWeight="bold" fontFamily="system-ui, -apple-system, sans-serif" letterSpacing="0.2" opacity="0.8">
          <textPath href="#logoTextPathLower" startOffset="50%" textAnchor="middle">
            ★ स्था. 1950 ★
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
