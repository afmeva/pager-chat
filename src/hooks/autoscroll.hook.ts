import { useEffect, useRef } from 'react';

export const useAutoScroll = () => {
  const elementRef = useRef(null);
  useEffect(() => {
    if (elementRef && elementRef.current) {
      elementRef.current.addEventListener('DOMNodeInserted', (event) => {
        const { currentTarget: target } = event;
        console.log(target);
        target.scroll({ top: target.scrollHeight + 200, behavior: 'smooth' });
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
