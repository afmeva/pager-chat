import { useEffect, useRef, useState } from 'react';

export const useAutoFocus = () => {
  const elementRef = useRef(null);

  useEffect(() => {
    if (elementRef && elementRef.current) {
      elementRef.current.focus();
    }
  }, []);

  return elementRef;
};
