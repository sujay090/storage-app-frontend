import { NavLink } from "react-router-dom";
import { 
  FaFolder, 
  FaGem,
  FaCloud
} from "react-icons/fa";

function Sidebar() {
  return (
    <aside className="w-[260px] bg-[var(--bg-panel)] border-r border-[var(--border-subtle)] flex flex-col p-6 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] z-50 h-[100vh] sticky top-0 max-md:w-[80px] max-md:p-[16px_8px] max-[480px]:w-full max-[480px]:h-auto max-[480px]:fixed max-[480px]:bottom-0 max-[480px]:top-auto max-[480px]:flex-row max-[480px]:justify-around max-[480px]:p-2.5 max-[480px]:border-r-0 max-[480px]:border-t max-[480px]:z-[1000]">
      <div className="flex items-center gap-4 mb-8 px-2 max-md:justify-center max-md:p-0 max-md:mb-6 max-[480px]:hidden">
        <div className="w-10 h-10 bg-gradient-to-br from-[#00d4ff] to-[#0072ff] rounded-md flex items-center justify-center shadow-[0_0_15px_rgba(0,212,255,0.4)] shrink-0">
          <FaCloud className="text-white text-[1.2rem]" />
        </div>
        <h1 className="font-['Outfit'] text-[1.25rem] font-bold text-[var(--text-main)] tracking-[-0.5px] max-md:hidden">IronCloud</h1>
      </div>

      <nav className="flex flex-col gap-6 flex-1 max-[480px]:flex-row max-[480px]:gap-0 max-[480px]:w-full max-[480px]:justify-around">
        <div className="flex flex-col gap-2 max-[480px]:flex-row max-[480px]:gap-0 max-[480px]:w-full max-[480px]:justify-evenly">
          <span className="text-[0.75rem] uppercase text-[var(--text-dim)] font-semibold mb-2 pl-4 tracking-[0.05em] max-md:hidden">Storage</span>
          <NavLink 
            to="/" 
            className={({ isActive }) => `flex items-center gap-4 px-4 py-[0.7rem] rounded-md font-medium transition-all no-underline max-md:justify-center max-md:p-3 max-[480px]:flex-col max-[480px]:gap-1 max-[480px]:p-2 max-[480px]:rounded-sm max-[480px]:bg-transparent max-[480px]:hover:bg-transparent ${
              isActive 
                ? 'bg-[#00d4ff]/10 text-[#00d4ff] border-r-[3px] border-[#00d4ff] max-[480px]:border-r-0 max-[480px]:border-b-2' 
                : 'text-[var(--text-muted)] hover:bg-[var(--bg-surface)] hover:text-[var(--text-main)] max-[480px]:hover:text-[#00d4ff]'
            }`}
          >
            <FaFolder className="text-[1.1rem] max-md:text-[1.4rem] max-md:m-0" />
            <span className="max-md:hidden">My Files</span>
          </NavLink>
        </div>

        <div className="flex flex-col gap-2 max-[480px]:flex-row max-[480px]:gap-0 max-[480px]:w-full max-[480px]:justify-evenly">
          <span className="text-[0.75rem] uppercase text-[var(--text-dim)] font-semibold mb-2 pl-4 tracking-[0.05em] max-md:hidden">Account</span>
          <NavLink 
            to="/plans" 
            className={({ isActive }) => `flex items-center gap-4 px-4 py-[0.7rem] rounded-md font-medium transition-all no-underline max-md:justify-center max-md:p-3 max-[480px]:flex-col max-[480px]:gap-1 max-[480px]:p-2 max-[480px]:rounded-sm max-[480px]:bg-transparent max-[480px]:hover:bg-transparent ${
              isActive 
                ? 'bg-[#00d4ff]/10 text-[#00d4ff] border-r-[3px] border-[#00d4ff] max-[480px]:border-r-0 max-[480px]:border-b-2' 
                : 'text-[var(--text-muted)] hover:bg-[var(--bg-surface)] hover:text-[var(--text-main)] max-[480px]:hover:text-[#00d4ff]'
            }`}
          >
            <FaGem className="text-[1.1rem] max-md:text-[1.4rem] max-md:m-0" />
            <span className="max-md:hidden">Plans & Pricing</span>
          </NavLink>
        </div>
      </nav>
    </aside>
  );
}

export default Sidebar;
