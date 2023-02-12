import { useLayoutEffect, useState } from "react";

export const useBreakpoint = (width: number = 800) => {
  const match = window.matchMedia(`(max-width: ${width}px)`);
  const [isMobile, setIsMobile] = useState(match.matches);

  const handleResize = (e: MediaQueryListEvent) => {
    setIsMobile(e.matches);
  };

  useLayoutEffect(() => {
    match.addEventListener("change", handleResize);

    return () => {
      match.removeEventListener("change", handleResize);
    };
  }, []);

  return isMobile;
};
