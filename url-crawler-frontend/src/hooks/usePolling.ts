
import { useEffect } from "react";
export const usePolling = (cb: () => void, delay: number) => {
  useEffect(() => {
    cb();
    const id = setInterval(cb, delay);
    return () => clearInterval(id);
  }, [cb, delay]);
};
