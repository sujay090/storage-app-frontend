// client/src/Admin.jsx
import React, { useState, useEffect } from 'react';
import { deleteUser, getAllUsers, logoutUser } from './apis/admin.api.js';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from './App.jsx';

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [notification, setNotification] = useState("");

  const navigate = useNavigate();

  const { user, loading: userLoading } = useContext(UserContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError('');
        const usersData = await getAllUsers();
        if (usersData.success) {
          setUsers(usersData.users);
        } else {
          navigate("/");
        }
      } catch (error) {
        setError(error.message || "Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Handle user logout
  const handleLogoutUser = async (userId) => {
    try {
      setLoading(true);
      const result = await logoutUser(userId);
      window.location.reload();
      setNotification(result.message);
    } catch (err) {
      setLoading(false);
      setNotification(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle user deletion (admin only)
  const handleDeleteUser = async (userId) => {
    try {
      setLoading(true);
      const response = await deleteUser(userId);
      window.location.reload();
      setNotification(response.message);
    } catch (error) {
      setNotification(error.message);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  // Filter users based on search term
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );


  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  // ✅ Check current user's role
  const isAdmin = user?.role === 'admin';
  const isManager = user?.role === 'manager';

  if (loading) {
    return (
      <div className="max-w-[1500px] mx-auto p-[40px_32px] bg-[#111318] min-h-screen relative text-slate-100 max-md:p-[20px_16px]">
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
          <div className="w-[48px] h-[48px] border-4 border-slate-700 border-t-[#6366f1] rounded-full animate-spin"></div>
          <p>Loading users...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-[1500px] mx-auto p-[40px_32px] bg-[#111318] min-h-screen relative text-slate-100 max-md:p-[20px_16px]">
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
          <div className="text-4xl">⚠️</div>
          <h3>Error Loading Data</h3>
          <p>{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-[#6366f1] text-white border-none py-2 px-6 rounded-md cursor-pointer hover:bg-[#4f46e5]"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[1500px] mx-auto p-[40px_32px] bg-[#111318] min-h-screen relative text-slate-100 max-md:p-[20px_16px]
      before:content-[''] before:fixed before:inset-0 before:bg-[radial-gradient(circle_at_20%_20%,rgba(99,102,241,0.03)_0%,transparent_50%),radial-gradient(circle_at_80%_80%,rgba(139,92,246,0.03)_0%,transparent_50%)] before:pointer-events-none before:z-0">
      
      {notification && (
        <div className="fixed top-6 right-6 bg-emerald-500 text-white p-[16px_24px] rounded-md shadow-lg animate-in slide-in-from-right-8 z-[1000] font-medium">
          {notification}
        </div>
      )}

      <div className="text-center mb-12 animate-in slide-in-from-bottom-6 duration-500 relative z-10">
        <h1 className="text-[2.75rem] text-slate-100 m-[0_0_14px_0] font-extrabold flex items-center justify-center gap-[14px] tracking-[-0.03em] before:content-['⚙️'] before:text-[2.25rem] before:drop-shadow-[0_2px_4px_rgba(0,0,0,0.1)] max-md:text-[1.75rem]">
          {isAdmin ? 'Admin Dashboard' : 'Manager Dashboard'}
        </h1>
        <p className="text-slate-400 text-[1.15rem] m-0">
          {isAdmin ? 'Manage users and monitor activity' : 'Monitor users and manage sessions'}
        </p>
        <div className="mt-4">
          <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase ${isAdmin ? 'bg-[#6366f1]/20 text-[#818cf8]' : 'bg-emerald-500/20 text-emerald-400'}`}>
            {user?.role?.toUpperCase()} ACCESS
          </span>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex justify-between items-center mb-6 flex-wrap gap-4 relative z-10 max-md:flex-col max-md:items-stretch">
        <div className="flex-1 max-w-[400px] max-md:max-w-full">
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-[1rem]">🔍</span>
            <input
              type="text"
              placeholder="Search users by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-[14px_16px_14px_48px] border-[2px] border-slate-700 rounded-md text-[0.95rem] bg-[#1e293b] text-slate-100 transition-all duration-200 focus:outline-none focus:border-[#6366f1] focus:ring-4 focus:ring-[#6366f1]/20"
            />
          </div>
        </div>
        <div className="text-slate-500 text-[0.875rem] font-medium">
          Showing {filteredUsers.length} of {users.length} users
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-[#15191e] rounded-lg shadow-md overflow-hidden border border-slate-800 relative z-10">
        <table className="w-full border-collapse max-[1024px]:block max-[1024px]:overflow-x-auto">
          <thead className="bg-[#1e293b] border-b-[2px] border-slate-800">
            <tr>
              <th className="p-[16px_20px] text-left font-bold text-slate-100 text-[0.8rem] uppercase tracking-[0.5px] max-md:p-[12px_14px]">User</th>
              <th className="p-[16px_20px] text-left font-bold text-slate-100 text-[0.8rem] uppercase tracking-[0.5px] max-md:p-[12px_14px]">Name</th>
              <th className="p-[16px_20px] text-left font-bold text-slate-100 text-[0.8rem] uppercase tracking-[0.5px] max-md:p-[12px_14px]">Email</th>
              <th className="p-[16px_20px] text-left font-bold text-slate-100 text-[0.8rem] uppercase tracking-[0.5px] max-md:p-[12px_14px]">Status</th>
              <th className="p-[16px_20px] text-left font-bold text-slate-100 text-[0.8rem] uppercase tracking-[0.5px] max-md:p-[12px_14px]">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((tableUser) => (
              <tr key={tableUser._id} className="transition-colors duration-200 hover:bg-[#1e293b] border-b border-slate-800 last:border-b-0">
                <td className="w-[60px] p-[16px_20px] max-md:p-[12px_14px]">
                  <div className="w-[44px] h-[44px] rounded-full overflow-hidden border-2 border-slate-600 shadow-sm">
                    {tableUser.picture ? (
                      <img src={tableUser.picture} alt={tableUser.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#818cf8] to-[#4f46e5] text-white font-bold text-[0.9rem]">
                        {getInitials(tableUser.name)}
                      </div>
                    )}
                  </div>
                </td>
                <td className="p-[16px_20px] text-slate-100 text-[0.9rem] max-md:p-[12px_14px]">
                  <div className="flex flex-col gap-1">
                    <span className="font-semibold text-slate-100">{tableUser.name}</span>
                  </div>
                </td>
                <td className="text-slate-400 p-[16px_20px] text-[0.9rem] max-md:p-[12px_14px]">{tableUser.email}</td>
                <td className="p-[16px_20px] max-md:p-[12px_14px]">
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[0.75rem] font-semibold ${tableUser.isEmailVerified ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' : 'bg-amber-500/10 text-amber-500 border border-amber-500/20'}`}>
                    {tableUser.isLoggedIn ? '✅ Logged In' : '⏳ Logged Out'}
                  </span>
                </td>
                <td className="p-[16px_20px] max-md:p-[12px_14px]">
                  <div className="flex gap-2 max-[480px]:flex-col max-[480px]:gap-1">
                    {tableUser.isLoggedIn && (
                      <button
                        className="h-[36px] px-3 rounded-md border-none cursor-pointer flex items-center justify-center text-[0.9rem] transition-all duration-200 font-medium bg-amber-500/10 text-amber-500 hover:bg-amber-500/20 hover:scale-105"
                        title="Logout User"
                        onClick={() => handleLogoutUser(tableUser._id)}
                      >
                        {loading ? "Loading..." : "Logout"}

                      </button>
                    )}

                    {/* ✅ Delete button - Only for admins */}
                    {isAdmin && (
                      <button
                        className="h-[36px] px-3 rounded-md border-none cursor-pointer flex items-center justify-center text-[0.9rem] transition-all duration-200 font-medium bg-red-500/10 text-red-500 hover:bg-red-500/20 hover:scale-105"
                        title="Delete User"
                        onClick={() => handleDeleteUser(tableUser._id)}
                      >
                        {loading ? "Loading..." : "Delete"}
                      </button>
                    )}

                    {/* ✅ Show role restriction message for managers */}
                    {isManager && (
                      <span className="text-[0.8rem] text-slate-500 self-center" title="Admin privileges required">
                        🔒 Admin Only
                      </span>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Empty State */}
      {filteredUsers.length === 0 && !loading && (
        <div className="text-center p-[80px_40px] text-slate-500">
          <div className="text-[4rem] mb-5 opacity-50">🔍</div>
          <h3 className="text-[1.25rem] font-bold text-slate-300 mb-2">No users found</h3>
          <p className="text-slate-500 text-[0.95rem]">Try adjusting your search criteria</p>
        </div>
      )}
    </div>
  );
};

export default Admin;