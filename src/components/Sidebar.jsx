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
      max-[540px]:w-full max-[540px]:h-auto max-[540px]:fixed max-[540px]:bottom-0 max-[540px]:top-auto max-[540px]:flex-row max-[540px]:justify-around max-[540px]:py-3 max-[540px]:px-6 max-[540px]:border-r-0 max-[540px]:border-t max-[540px]:border-t-[#334155] max-[540px]:z-[1000] max-[540px]:backdrop-blur-xl max-[540px]:shadow-[0_-4px_20px_rgba(0,0,0,0.4)]"
    >
      <div className="flex items-center gap-4 mb-8 px-2 max-md:justify-center max-md:p-0 max-md:mb-6 max-[540px]:hidden">
        <div className="w-10 h-10 bg-gradient-to-br from-[#00d4ff] to-[#0072ff] rounded-md flex items-center justify-center shadow-[0_0_15px_rgba(0,212,255,0.4)] shrink-0">
          <FaCloud className="text-white text-[1.2rem]" />
        </div>
        <h1 className="font-['Outfit'] text-[1.25rem] font-bold text-[var(--text-main)] tracking-[-0.5px] max-md:hidden">IronCloud</h1>
      </div>

      <nav className="flex flex-col gap-6 flex-1 max-[540px]:flex-row max-[540px]:gap-0 max-[540px]:w-full max-[540px]:justify-around max-[540px]:items-center">
        <div className="flex flex-col gap-2 max-[540px]:flex-row max-[540px]:gap-0 max-[540px]:justify-evenly">
          <span className="text-[0.75rem] uppercase text-[var(--text-dim)] font-semibold mb-2 pl-4 tracking-[0.05em] max-md:hidden">Storage</span>
          <NavLink 
            to="/" 
            className={({ isActive }) => `flex items-center gap-4 px-4 py-[0.7rem] rounded-md font-medium transition-all no-underline max-md:justify-center max-md:p-3 max-[540px]:flex-col max-[540px]:gap-1 max-[540px]:px-5 max-[540px]:py-2 max-[540px]:rounded-lg max-[540px]:bg-transparent max-[540px]:hover:bg-transparent ${
              isActive 
                ? 'bg-[#00d4ff]/10 text-[#00d4ff] border-r-[3px] border-[#00d4ff] max-[540px]:border-r-0 max-[540px]:border-b-2 max-[540px]:bg-[#00d4ff]/10 max-[540px]:rounded-lg' 
                : 'text-[var(--text-muted)] hover:bg-[var(--bg-surface)] hover:text-[var(--text-main)] max-[540px]:hover:text-[#00d4ff]'
            }`}
          >
            <FaFolder className="text-[1.1rem] max-md:text-[1.4rem] max-md:m-0 max-[540px]:text-[1.3rem]" />
            <span className="max-md:hidden max-[540px]:!block max-[540px]:text-[0.65rem] max-[540px]:font-semibold">My Files</span>
          </NavLink>
        </div>

        <div className="flex flex-col gap-2 max-[540px]:flex-row max-[540px]:gap-0 max-[540px]:justify-evenly">
          <span className="text-[0.75rem] uppercase text-[var(--text-dim)] font-semibold mb-2 pl-4 tracking-[0.05em] max-md:hidden">Account</span>
          <NavLink 
            to="/plans" 
            className={({ isActive }) => `flex items-center gap-4 px-4 py-[0.7rem] rounded-md font-medium transition-all no-underline max-md:justify-center max-md:p-3 max-[540px]:flex-col max-[540px]:gap-1 max-[540px]:px-5 max-[540px]:py-2 max-[540px]:rounded-lg max-[540px]:bg-transparent max-[540px]:hover:bg-transparent ${
              isActive 
                ? 'bg-[#00d4ff]/10 text-[#00d4ff] border-r-[3px] border-[#00d4ff] max-[540px]:border-r-0 max-[540px]:border-b-2 max-[540px]:bg-[#00d4ff]/10 max-[540px]:rounded-lg' 
                : 'text-[var(--text-muted)] hover:bg-[var(--bg-surface)] hover:text-[var(--text-main)] max-[540px]:hover:text-[#00d4ff]'
            }`}
          >
            <FaGem className="text-[1.1rem] max-md:text-[1.4rem] max-md:m-0 max-[540px]:text-[1.3rem]" />
            <span className="max-md:hidden max-[540px]:!block max-[540px]:text-[0.65rem] max-[540px]:font-semibold">Plans</span>
          </NavLink>
        </div>
      </nav>
    </aside>
  );
}

export default Sidebar;
