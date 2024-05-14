import React, { useEffect, useState } from "react";
import CustomCursor from "custom-cursor-react";
import "custom-cursor-react/dist/index.css";
import { useTheme } from "next-themes";

const Cursor = () => {
  const theme = useTheme();
  const [mount, setMount] = useState(false);

  const getCustomColor = () => {
    if (theme.theme === "dark") {
      return "#fff";  // White cursor for dark theme
    } else if (theme.theme === "light") {
      return "#000";  // Black cursor for light theme
    }
  };

  useEffect(() => {
    setMount(true); // Ensures component is mounted before applying custom cursor
  }, []);

  return (
    <>
      {mount && (
        <CustomCursor
          targets={[".link",":not(.leaflet-interactive)"]}  // Exclude Leaflet elements
          customClass="custom-cursor"
          dimensions={30}
          fill={getCustomColor()}
          smoothness={{
            movement: 0.2,
            scale: 0.1,
            opacity: 0.2,
          }}
          targetOpacity={0.5}
          targetScale={2}
        />
      )}
    </>
  );
};

export default Cursor;
