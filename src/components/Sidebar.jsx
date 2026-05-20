import { NavLink } from "react-router-dom";
import { 
  FaFolder, 
  FaGem,
  FaCloud
} from "react-icons/fa";

function Sidebar() {
  return (
    <aside className="w-[260px] bg-[var(--bg-panel)] border-r border-[var(--border-subtle)] flex flex-col p-6 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] z-50 h-[100vh] sticky top-0
      max-md:w-[80px] max-md:p-[16px_8px]
      max-sm:w-full max-sm:h-auto max-sm:fixed max-sm:bottom-0 max-sm:left-0 max-sm:top-auto max-sm:flex-row max-sm:justify-around max-sm:py-3 max-sm:px-6 max-sm:border-r-0 max-sm:border-t max-sm:border-t-[#334155] max-sm:z-[1000] max-sm:backdrop-blur-xl max-sm:shadow-[0_-4px_20px_rgba(0,0,0,0.4)]"
    >
      <div className="flex items-center gap-4 mb-8 px-2 max-md:justify-center max-md:p-0 max-md:mb-6 max-sm:hidden">
        <div className="w-10 h-10 bg-gradient-to-br from-[#00d4ff] to-[#0072ff] rounded-md flex items-center justify-center shadow-[0_0_15px_rgba(0,212,255,0.4)] shrink-0">
          <FaCloud className="text-white text-[1.2rem]" />
        </div>
        <h1 className="font-['Outfit'] text-[1.25rem] font-bold text-[var(--text-main)] tracking-[-0.5px] max-md:hidden">IronCloud</h1>
      </div>

      <nav className="flex flex-col gap-6 flex-1 max-sm:flex-row max-sm:gap-0 max-sm:w-full max-sm:justify-around max-sm:items-center">
        <div className="flex flex-col gap-2 max-sm:flex-row max-sm:gap-0 max-sm:justify-evenly">
          <span className="text-[0.75rem] uppercase text-[var(--text-dim)] font-semibold mb-2 pl-4 tracking-[0.05em] max-md:hidden">Storage</span>
          <NavLink 
            to="/" 
            className={({ isActive }) => `flex items-center gap-4 px-4 py-[0.7rem] rounded-md font-medium transition-all no-underline max-md:justify-center max-md:p-3 max-sm:flex-col max-sm:gap-1 max-sm:px-5 max-sm:py-2 max-sm:rounded-lg max-sm:bg-transparent max-sm:hover:bg-transparent ${
              isActive 
                ? 'bg-[#00d4ff]/10 text-[#00d4ff] border-r-[3px] border-[#00d4ff] max-sm:border-r-0 max-sm:border-b-2 max-sm:bg-[#00d4ff]/10 max-sm:rounded-lg' 
                : 'text-[var(--text-muted)] hover:bg-[var(--bg-surface)] hover:text-[var(--text-main)] max-sm:hover:text-[#00d4ff]'
            }`}
          >
            <FaFolder className="text-[1.1rem] max-md:text-[1.4rem] max-md:m-0 max-sm:text-[1.3rem]" />
            <span className="max-md:hidden max-sm:!block max-sm:text-[0.65rem] max-sm:font-semibold">My Files</span>
          </NavLink>
        </div>

        <div className="flex flex-col gap-2 max-sm:flex-row max-sm:gap-0 max-sm:justify-evenly">
          <span className="text-[0.75rem] uppercase text-[var(--text-dim)] font-semibold mb-2 pl-4 tracking-[0.05em] max-md:hidden">Account</span>
          <NavLink 
            to="/plans" 
            className={({ isActive }) => `flex items-center gap-4 px-4 py-[0.7rem] rounded-md font-medium transition-all no-underline max-md:justify-center max-md:p-3 max-sm:flex-col max-sm:gap-1 max-sm:px-5 max-sm:py-2 max-sm:rounded-lg max-sm:bg-transparent max-sm:hover:bg-transparent ${
              isActive 
                ? 'bg-[#00d4ff]/10 text-[#00d4ff] border-r-[3px] border-[#00d4ff] max-sm:border-r-0 max-sm:border-b-2 max-sm:bg-[#00d4ff]/10 max-sm:rounded-lg' 
                : 'text-[var(--text-muted)] hover:bg-[var(--bg-surface)] hover:text-[var(--text-main)] max-sm:hover:text-[#00d4ff]'
            }`}
          >
            <FaGem className="text-[1.1rem] max-md:text-[1.4rem] max-md:m-0 max-sm:text-[1.3rem]" />
            <span className="max-md:hidden max-sm:!block max-sm:text-[0.65rem] max-sm:font-semibold">Plans</span>
          </NavLink>
        </div>
      </nav>
    </aside>
  );
}

export default Sidebar;
