import { useContext } from "react"
import { UserContext } from "../App"

const Authprovide = ({ children }) => {
    const { user, loading } = useContext(UserContext);
    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 text-slate-100">
                <div className="w-10 h-10 border-4 border-slate-700 border-t-[#00d4ff] rounded-full animate-spin"></div>
                <div>Loading authentication...</div>
            </div>
        );
    }
    if (!user) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 text-center text-slate-100">
                <h3 className="text-xl font-bold">Authentication Required</h3>
                <p className="text-slate-400">Please log in to access this page</p>
            </div>
        );
    }

    if (user.role !== "admin" && user.role !== "manager") {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 text-center text-slate-100">
                <h3 className="text-xl font-bold">Access Denied</h3>
                <p className="text-slate-400">You don't have admin privileges</p>
                <p className="text-slate-500">Your role: {user.role}</p>
            </div>
        );
    }
    return <div>{children}</div>
}

export default Authprovide