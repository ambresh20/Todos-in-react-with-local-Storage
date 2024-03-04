// VantaBackground.js
import React, { useRef, useEffect } from 'react';
import {WAVES} from 'vanta/dist/vanta.waves.min.js';

const VantaBackground = () => {
  const vantaRef = useRef(null);

  useEffect(() => {
    const effect = WAVES({
      el: vantaRef.current,  
    });

    return () => {
      if (effect) {
        effect.destroy();
      }
    };
  }, []);

  return (
    <div ref={vantaRef} style={{ width: '100%', height: '100vh' }}>
    </div>
  );
};

export default VantaBackground;

