import { FaSun, FaMoon } from "react-icons/fa";
import { useTheme } from "./ThemeProvider";

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      className="flex bg-[var(--bg-surface)] text-[var(--text-muted)] w-9 h-9 md:w-10 md:h-10 rounded-md items-center justify-center text-[1.1rem] transition-all border border-[var(--border-subtle)] hover:border-[#00d4ff] hover:text-[#00d4ff] mr-3"
      onClick={toggleTheme}
      title={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
    >
      {theme === "dark" ? <FaSun /> : <FaMoon />}
    </button>
  );
}

export default ThemeToggle;
