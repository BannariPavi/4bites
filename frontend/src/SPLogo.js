import React from "react";

function SPLogo({ size = 64 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="spg1" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
          <stop stopColor="#43cea2" />
          <stop offset="1" stopColor="#185a9d" />
        </linearGradient>
        <linearGradient id="spg2" x1="0" y1="64" x2="64" y2="0" gradientUnits="userSpaceOnUse">
          <stop stopColor="#fcb69f" />
          <stop offset="1" stopColor="#a1c4fd" />
        </linearGradient>
      </defs>
      <circle cx="32" cy="32" r="30" fill="url(#spg1)" stroke="url(#spg2)" strokeWidth="4" />
      <text x="50%" y="50%" textAnchor="middle" dy=".35em" fontFamily="Montserrat, sans-serif" fontWeight="bold" fontSize="28" fill="#fff" style={{ letterSpacing: 2 }}>
        SP
      </text>
    </svg>
  );
}

export default SPLogo; 