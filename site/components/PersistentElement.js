import { useState, useEffect } from 'react';

const PersistentElement = ({ children, startId, endId }) => {
  const [isSticky, setIsSticky] = useState(false);

  const handleScroll = () => {
    const startElement = document.getElementById(startId);
    const endElement = document.getElementById(endId);
    const startPosition = startElement.getBoundingClientRect().top + window.scrollY;
    const endPosition = endElement.getBoundingClientRect().top + window.scrollY;

    const currentPosition = window.scrollY + window.innerHeight / 3; // Adjust this to change the trigger point

    if (currentPosition >= startPosition && currentPosition <= endPosition) {
      setIsSticky(true);
    } else {
      setIsSticky(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div
      className={`transition-opacity duration-500 pointer-events-none ${isSticky ? 'fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 pointer-events-auto' : 'fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-0 cursor-none'}`}
    >
      {children}
    </div>
  );
};

export default PersistentElement;
