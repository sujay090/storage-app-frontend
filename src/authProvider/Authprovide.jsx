import { useContext } from "react"
import { UserContext } from "../App"

const Authprovide = ({ children }) => {
    const { user, loading } = useContext(UserContext);
    if (loading) {
        return (
            <div className="loading-container">
                <div>Loading authentication...</div>
            </div>
        );
    }
    if (!user) {
        return (
            <div className="auth-error">
                <h3>Authentication Required</h3>
                <p>Please log in to access this page</p>
            </div>
        );
    }

    if (user.role !== "admin" && user.role !== "manager") {
        return (
            <div className="auth-error">
                <h3>Access Denied</h3>
                <p>You don't have admin privileges</p>
                <p>Your role: {user.role}</p>
            </div>
        );
    }
    return <div>{children}</div>
}

export default Authprovide