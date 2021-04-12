import { useEffect, useRef } from 'react';

export const useAutoScroll = () => {
  const elementRef = useRef(null);
  useEffect(() => {
    if (elementRef && elementRef.current) {
      elementRef.current.addEventListener('DOMNodeInserted', (event) => {
        const { currentTarget: target } = event;
        target.scroll({ top: target.scrollHeight, behavior: 'smooth' });
      });
    }

    return () => {
      if (elementRef.current) {
        elementRef.current.removeEvent('DOMNodeInserted');
      }
    };
  }, []);

  return elementRef;
};
