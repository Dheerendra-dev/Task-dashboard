import { useEffect } from "react";

export const useDismissibleLayer = ({ isActive, containerRef, onDismiss }) => {
  useEffect(() => {
    if (!isActive) {
      return undefined;
    }

    const onPointerDownOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        onDismiss();
      }
    };

    const onEscape = ({ key }) => {
      if (key === "Escape") {
        onDismiss();
      }
    };

    document.addEventListener("mousedown", onPointerDownOutside);
    document.addEventListener("touchstart", onPointerDownOutside);
    document.addEventListener("keydown", onEscape);

    return () => {
      document.removeEventListener("mousedown", onPointerDownOutside);
      document.removeEventListener("touchstart", onPointerDownOutside);
      document.removeEventListener("keydown", onEscape);
    };
  }, [isActive, containerRef, onDismiss]);
};
