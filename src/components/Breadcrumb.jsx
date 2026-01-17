import { useNavigate } from 'react-router-dom';
import './Breadcrumb.css';

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
    <div className="breadcrumb">
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        const isFirst = index === 0;
        
        return (
          <span key={item.id} className="breadcrumb-item-wrapper">
            {index > 0 && <span className="breadcrumb-separator">/</span>}
            <span
              className={`breadcrumb-item ${isLast ? 'current' : 'clickable'}`}
              onClick={() => handleClick(item.id, isLast)}
            >
              {isFirst && <span className="breadcrumb-icon">🏠</span>}
              {!isFirst && <span className="breadcrumb-icon">📁</span>}
              <span className="breadcrumb-name">{item.name}</span>
            </span>
          </span>
        );
      })}
    </div>
  );
}

export default Breadcrumb;
