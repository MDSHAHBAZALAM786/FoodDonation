import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/dashboard.css";
import ProfilePanel from "../../components/ProfilePanel";
import { logout as logoutAll } from "../../utils/api";

export default function DonorLayout({ user, active, children }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || user.role !== "donor") navigate("/");
  }, [navigate, user]);

  const logout = () => {
    logoutAll();
    navigate("/");
  };

  if (!user || user.role !== "donor") return null;

  return (
    <div className="dash-layout">
      <aside className="dash-sidebar">
        <div className="dash-brand">
          <span className="dot" />
          <span>Food Value</span>
        </div>

        <nav className="dash-menu">
          <button
            className={`menu-item ${active === "overview" ? "active" : ""}`}
            onClick={() => navigate("/donor-dashboard")}
          >
            Overview
          </button>
          <button
            className={`menu-item ${active === "add" ? "active" : ""}`}
            onClick={() => navigate("/donor/add-food")}
          >
            Add food items
          </button>
          <button
            className={`menu-item ${active === "requests" ? "active" : ""}`}
            onClick={() => navigate("/donor/requests")}
          >
            Requests
          </button>
          <button
            className={`menu-item ${active === "inventory" ? "active" : ""}`}
            onClick={() => navigate("/donor/inventory")}
          >
            Inventory
          </button>
        </nav>

        <button className="logout-btn" onClick={logout}>
          Logout
        </button>
      </aside>

      <main className="dash-main">
        <header className="dash-header" style={{ alignItems: "flex-start" }}>
          <div />
          <ProfilePanel
            user={user}
            onLogout={() => {
              logout();
              navigate("/");
            }}
          />
        </header>
        {children}
      </main>
    </div>
  );
}

