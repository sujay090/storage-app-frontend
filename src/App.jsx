import { createBrowserRouter, RouterProvider } from "react-router-dom";
import DirectoryView from "./DirectoryView";
import Register from "./Register";
import Admin from "./Admin"
import AdminPlan from "./AdminPlan";
import Plan from "./Plan";
import PaymentSuccess from "./PaymentSuccess";
import "./App.css";
import Login from "./Login";
import Authprovide from "./authProvider/Authprovide";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useState } from "react";
import { useEffect } from "react";
import { createContext } from "react";
const client_id = "363103927361-cf7666uhnm26bnr2d1a95qajttkua2ki.apps.googleusercontent.com"

const router = createBrowserRouter([
  {
    path: "/",
    element: <DirectoryView />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/directory",
    element: <DirectoryView />,
  },
  {
    path: "/plans",
    element: <Plan />,
  },
  {
    path: "/payment-success",
    element: <PaymentSuccess />,
  },
  {
    path: "/directory/:dirId",
    element: <DirectoryView />,
  },
  {
    path: "/admin",
    element: <Authprovide> <Admin /> </Authprovide>,
  },
  {
    path: "/admin/plans",
    element: <Authprovide> <AdminPlan /> </Authprovide>,
  },
]);

export const UserContext = createContext();

function App() {
  const [user, setUser] = useState();
  const [loading, useLoading] = useState(false);
  const BASE_URL = import.meta.env.VITE_SERVER_URL;
  
  const fetchUserData = async () => {
    try {
      useLoading(true);
      const response = await fetch(`${BASE_URL}/user`, {
        credentials: "include",
      });

      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
        console.log("✅ User data loaded:", userData.email);
      } else if (response.status === 401) {
        setUser(null);
        console.log("❌ User not logged in");
      }
    } catch (error) {
      console.error("❌ Error fetching user:", error);
      setUser(null);
    } finally {
      useLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [])

  return (
    <>
      <UserContext.Provider value={{ user, loading }}>
        <GoogleOAuthProvider clientId={client_id}>
          <RouterProvider router={router} />
        </GoogleOAuthProvider>
      </UserContext.Provider>
    </>
  );
}

export default App;
