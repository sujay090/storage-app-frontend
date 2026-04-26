import { useNavigate } from 'react-router-dom';

function Breadcrumb({ items, rootDirId }) {
  const navigate = useNavigate();

  const handleClick = (id, isLast) => {
    if (isLast) return; // Don't navigate if clicking current folder
    
    if (id === rootDirId) {
      navigate('/directory');
    } else {
      navigate(`/directory/${id}`);
    }
  };

  if (!items || items.length === 0) return null;

  return (
    <div className="flex items-center gap-1.5 p-3 sm:p-4 md:px-6 md:py-4 bg-[var(--bg-panel)] rounded-lg mb-3 sm:mb-6 text-[0.8rem] sm:text-[0.85rem] md:text-[0.9rem] overflow-x-auto whitespace-nowrap border border-[var(--border-subtle)] shadow-sm mt-2 sm:mt-4 md:mt-8
      scrollbar-thin scrollbar-track-transparent scrollbar-thumb-slate-700 hover:scrollbar-thumb-slate-600">
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        const isFirst = index === 0;
        
        return (
          <span key={item.id} className="flex items-center gap-1.5 shrink-0">
            {index > 0 && <span className="text-[var(--text-dim)] mx-1 md:mx-2 text-[1.1rem]">/</span>}
            <span
              className={`flex items-center gap-2 md:gap-2.5 px-2.5 py-1.5 md:px-[14px] md:py-2 rounded-md transition-all font-medium ${
                isLast 
                  ? 'text-[#00d4ff] font-semibold bg-[#00d4ff]/10 border border-[#00d4ff]/20' 
                  : 'text-[var(--text-muted)] cursor-pointer hover:bg-[var(--bg-surface)] hover:text-[var(--text-main)] hover:-translate-y-px'
              }`}
              onClick={() => handleClick(item.id, isLast)}
            >
              {isFirst && <span className="text-[1.1rem]">🏠</span>}
              {!isFirst && <span className="text-[1.1rem]">📁</span>}
              <span className="max-w-[120px] md:max-w-[200px] overflow-hidden text-ellipsis whitespace-nowrap">{item.name}</span>
            </span>
          </span>
        );
      })}
    </div>
  );
}

export default Breadcrumb;
