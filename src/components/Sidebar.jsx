import { NavLink } from "react-router-dom";
import { 
  FaFolder, 
  FaClock, 
  FaStar, 
  FaTrash, 
  FaCloud, 
  FaCog,
  FaGem
} from "react-icons/fa";
import "./Sidebar.css";

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="brand-logo">
          <FaCloud className="logo-icon" />
        </div>
        <h1 className="brand-name">IronCloud</h1>
      </div>

      <nav className="sidebar-nav">
        <div className="nav-section">
          <span className="nav-label">Storage</span>
          <NavLink to="/" className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}>
            <FaFolder className="nav-icon" />
            <span>My Files</span>
          </NavLink>
        </div>

        <div className="nav-section">
          <span className="nav-label">Account</span>
          <NavLink to="/plans" className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}>
            <FaGem className="nav-icon" />
            <span>Plans & Pricing</span>
          </NavLink>
        </div>
      </nav>
    </aside>
  );
}

export default Sidebar;
