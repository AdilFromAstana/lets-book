import { useEffect, useMemo, useState } from "react";

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}

export default function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const result = useMemo(() => {
    const isMobile = windowDimensions.width <= 768;
    const isTablet =
      768 < windowDimensions.width && windowDimensions.width <= 1200;
    const isDesktop = windowDimensions.width > 1200;

    return {
      ...windowDimensions,
      isMobile,
      isTablet,
      isDesktop,
    };
  }, [windowDimensions]);

  return result;
}
