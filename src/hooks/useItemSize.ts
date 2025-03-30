import { useEffect, useState } from "react";

const useItemSize = () => {
    const [itemSize, setItemSize] = useState(50);

    useEffect(() => {
      const handleResize = () => {
        if (window.innerWidth < 640) {
          setItemSize(100); 
        } else {
          setItemSize(50); 
        }
      };
  
      handleResize(); 
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);

    return itemSize
}

export default useItemSize;