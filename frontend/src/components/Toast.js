import React, { useEffect } from 'react';

export default function Toast({ message, type = 'error', onClose, duration = 3000 }) {
  useEffect(() => {
    if (!message) return;
    const t = setTimeout(onClose, duration);
    return () => clearTimeout(t);
  }, [message, onClose, duration]);

  if (!message) return null;

  return (
    <div style={{
      position: 'fixed',
      bottom: '1.5em',
      right: '1.5em',
      background: '#202020',
      color: type === 'success' ? '#2aff95' : '#ff2a66',
      padding: '.9em 1.4em',
      borderRadius: '6px',
      boxShadow: '0 2px 10px rgba(0,0,0,.4)',
      zIndex: 1000,
      maxWidth: 'min(320px, calc(100vw - 3em))',
    }}>
      {message}
    </div>
  );
}
