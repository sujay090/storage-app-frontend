import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

function Layout() {
  return (
    <div className="app-layout">
      <Sidebar />
      <main className="main-content">
        <div className="content-scrollable">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default Layout;
