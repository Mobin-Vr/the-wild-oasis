import { useEffect, useRef } from 'react';

export default function useOutsideClick<T extends HTMLElement>(
   handler: () => void,
) {
   const ref = useRef<T>(null);

   useEffect(
      function () {
         function handleClick(e: MouseEvent) {
            if (ref.current && !ref.current.contains(e.target as Node))
               handler();
         }

         document.addEventListener('click', handleClick, true);

         return () => document.removeEventListener('click', handleClick, true);
      },
      [handler],
   );

   return ref;
}
