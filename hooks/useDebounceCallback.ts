import { useRef, useCallback } from 'react';

export const useDebouncedCallback = (
  callback: (...args: any) => any,
  delay: number,
) => {
  const timeout = useRef<ReturnType<typeof setTimeout>>();

  return useCallback(
    (...args: unknown[]) => {
      const redo = () => {
        clearTimeout(timeout.current);
        callback(...args);
      };

      clearTimeout(timeout.current);
      timeout.current = setTimeout(redo, delay);
    },
    [callback, delay],
  );
};
