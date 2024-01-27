import { useEffect, useRef } from 'react';

export function useOutsideModalClose(fn) {
  const ref = useRef();

  useEffect(
    function () {
      function handleClick(e) {
        if (ref.current && !ref.current.contains(e.target)) fn();
      }

      document.addEventListener('click', handleClick, true);

      return () => document.removeEventListener('click', handleClick, true);
    },
    [fn]
  );
  return ref;
}
