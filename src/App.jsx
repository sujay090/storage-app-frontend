import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import DirectoryView from "./DirectoryView";
import Register from "./Register";
import Admin from "./Admin";
import AdminPlan from "./AdminPlan";
import Plan from "./Plan";
import PaymentSuccess from "./PaymentSuccess";
import "./App.css";
import Login from "./Login";
import Authprovide from "./authProvider/Authprovide";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useState, useEffect, createContext } from "react";
import Layout from "./components/Layout";
import { ThemeProvider } from "./components/ThemeProvider";

// Legal Pages
import TermsOfService from "./pages/TermsOfService";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import RefundPolicy from "./pages/RefundPolicy";

const client_id =
  "363103927361-cf7666uhnm26bnr2d1a95qajttkua2ki.apps.googleusercontent.com";

const router = createBrowserRouter([
  // Public Routes (No Sidebar)
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/payment-success",
    element: <PaymentSuccess />,
  },
  // Legal Pages
  {
    path: "/terms",
    element: <TermsOfService />,
  },
  {
    path: "/privacy",
    element: <PrivacyPolicy />,
  },
  {
    path: "/refund",
    element: <RefundPolicy />,
  },

  // Protected / App Routes (Wrapped in Layout)
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <DirectoryView />,
      },
      {
        path: "/directory",
        element: <DirectoryView />,
      },
      {
        path: "/directory/:dirId",
        element: <DirectoryView />,
      },
      {
        path: "/plans",
        element: <Plan />,
      },
      {
        path: "/admin",
        element: (
          <Authprovide>
            <Admin />
          </Authprovide>
        ),
      },
      {
        path: "/admin/plans",
        element: (
          <Authprovide>
            <AdminPlan />
          </Authprovide>
        ),
      },
      // Fallback for missing routes inside app could go here
    ],
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
      } else if (response.status === 401) {
        setUser(null);
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
  }, []);

  return (
    <>
      <UserContext.Provider value={{ user, loading }}>
        <GoogleOAuthProvider clientId={client_id}>
          <ThemeProvider>
            <RouterProvider router={router} />
          </ThemeProvider>
        </GoogleOAuthProvider>
      </UserContext.Provider>
    </>
  );
}

export default App;
