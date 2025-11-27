import { useEffect, useState } from "react";

/**
 * Hook for handling closing when clicking outside of an element
 * @param {React.RefObject<Element>} el - A reference to the element to detect clicks outside of
 * @param {boolean} initialState - The initial state of whether the element is active
 * @returns {[boolean, React.Dispatch<React.SetStateAction<boolean>>]} - A tuple containing the current state and the setter function
 */
export const useDetectOutsideClick = (
  el: React.RefObject<HTMLElement | null>,
  initialState: boolean
): [boolean, React.Dispatch<React.SetStateAction<boolean>>] => {
  const [isActive, setIsActive] = useState<boolean>(initialState);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      // If the active element exists and is clicked outside of it
      if (el.current && !el.current.contains(e.target as Node)) {
        setIsActive(false);
      }
    };

    // If the item is active (i.e., open), then listen for clicks outside
    if (isActive) {
      window.addEventListener("click", onClick);
    }

    // Clean up the event listener
    return () => {
      window.removeEventListener("click", onClick);
    };
  }, [isActive, el]);

  return [isActive, setIsActive];
};
