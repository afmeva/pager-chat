import { useEffect, useRef } from 'react';

export const useAutoScroll = () => {
  const msgRef = useRef(null);
  useEffect(() => {
    if (msgRef) {
      msgRef.current.addEventListener('DOMNodeInserted', (event) => {
        const { currentTarget: target } = event;
        target.scroll({ top: target.scrollHeight, behavior: 'smooth' });
      });
    }

    return () => {
      msgRef.current.removeEvent('DOMNodeInserted');
    };
  }, []);

  return msgRef;
};
