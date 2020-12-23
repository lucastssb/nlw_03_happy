import React, { useContext } from "react";
import { FiPower, FiMapPin, FiAlertCircle } from "react-icons/fi";
import { Link, useHistory } from "react-router-dom";

import ".././styles/components/dashboardSidebar.css";
import Logo from ".././images/logo-dashboard-page.svg";
import AuthContext from "../contexts/auth";

export default function DashboardSideBar() {
  const history = useHistory();
  const { signOut } = useContext(AuthContext);

  async function handleLogout() {
    await signOut();
    history.push("/login");
  }
  return (
    <aside className="dashboard-sidebar">
      <img src={Logo} alt="happy" className="logo" />

      <div className="navigation-buttons">
        <Link to="/" id="locations-button">
          <FiMapPin color="white" size={24} />
        </Link>

        <Link to="/" id="alert-button">
          <div id="notification-circle" />
          <FiAlertCircle color="white" size={24} />
        </Link>
      </div>

      <button id="logout-button" onClick={() => handleLogout()}>
        <FiPower color="white" size={30} />
      </button>
    </aside>
  );
}
