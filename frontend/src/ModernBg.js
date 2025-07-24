import React from "react";

const ModernBg = ({ children }) => (
  <div
    style={{
      minHeight: '100vh',
      position: 'relative',
      overflow: 'hidden',
      background: '#f5f6fa',
    }}
  >
    <div style={{ position: 'relative', zIndex: 1 }}>{children}</div>
  </div>
);

export default ModernBg; 