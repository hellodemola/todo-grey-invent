import { useEffect, useState } from "react";

const useItemSize = () => {
    const [itemSize, setItemSize] = useState(50); // Default size

    // Adjust itemSize based on screen width
    useEffect(() => {
      const handleResize = () => {
        if (window.innerWidth < 640) {
          setItemSize(100); // Larger for mobile
        } else {
          setItemSize(50); // Default for larger screens
        }
      };
  
      handleResize(); // Run initially
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);

    return itemSize
}

export default useItemSize;