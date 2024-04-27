import { useTheme } from "next-themes";
import React from "react";

const ModeToggle = () => {
  const { theme, setTheme } = useTheme();
  console.log("theme",theme);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className="flex justify-center items-center">
      <input
        type="checkbox"
        className="toggle"

        onChange={toggleTheme}
      />
    </div>
  );
};

export default ModeToggle;
