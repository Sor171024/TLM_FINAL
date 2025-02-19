import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faPieChart,
  faCubesStacked,
  faExclamationTriangle,
  faFileLines,
  faCog,
  faRightFromBracket,
  faChevronDown,
  faChevronUp,
} from "@fortawesome/free-solid-svg-icons";
import "./Sidebar.css";

const Sidebar = ({ onLogout }) => {
  const [isDashboardOpen, setDashboardOpen] = useState(false);
  const [isConfigOpen, setConfigOpen] = useState(false);
  const [isEventsOpen, setEventsOpen] = useState(false);
  const [isReportOpen, setReportOpen] = useState(false);
  const [isSettingsOpen, setSettingsOpen] = useState(false);
  const [isUsersOpen, setUsersOpen] = useState(false);

  const toggleDropdown = (setter, state) => {
    setter(!state);
  };

  return (
    <nav className="sidebar">
      <ul>
        <a href="">
          <img className="logo" src="./wellfine_01.png" alt="" />
        </a>

        {/* Dashboard Dropdown */}
        <li>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              toggleDropdown(setDashboardOpen, isDashboardOpen);
            }}
          >
            <FontAwesomeIcon icon={faPieChart} />
            Dashboard
            <FontAwesomeIcon
              icon={isDashboardOpen ? faChevronUp : faChevronDown}
              className="dropdown-icon"
            />
          </a>
          {isDashboardOpen && (
            <ul className="dropdown-menu">
              <li>
                <a href="">๐ Usage</a>
              </li>
              <li>
                <a href="">๐ Installation</a>
              </li>
              <li>
                <a href="">๐ Map</a>
              </li>
            </ul>
          )}
        </li>

        {/* Configuration Dropdown */}
        <a href="#">
          <FontAwesomeIcon icon={faCubesStacked} />
          Configuration
        </a>

        <a href="#">
          <FontAwesomeIcon icon={faExclamationTriangle} />
          Events
        </a>

        {/* Report Dropdown */}
        <a href="#">
          <FontAwesomeIcon icon={faFileLines} />
          Report
        </a>

        {/* Settings Dropdown */}
        <li>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              toggleDropdown(setSettingsOpen, isSettingsOpen);
            }}
          >
            <FontAwesomeIcon icon={faCog} />
            Settings
            <FontAwesomeIcon
              icon={isSettingsOpen ? faChevronUp : faChevronDown}
              className="dropdown-icon"
            />
          </a>
          {isSettingsOpen && (
            <ul className="dropdown-menu">
              <li>
                <a href="">๐ Segment</a>
              </li>
              <li>
                <a href="">๐ Transformer Type</a>
              </li>
              <li>
                <a href="">๐ Communication Type</a>
              </li>
            </ul>
          )}
        </li>

        {/* Users Management Dropdown */}
        <li>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              toggleDropdown(setUsersOpen, isUsersOpen);
            }}
          >
            <FontAwesomeIcon icon={faUser} />
            Users Management
            <FontAwesomeIcon
              icon={isUsersOpen ? faChevronUp : faChevronDown}
              className="dropdown-icon"
            />
          </a>
          {isUsersOpen && (
            <ul className="dropdown-menu">
              <li>
                <a href="">๐ Users</a>
              </li>
            </ul>
          )}
        </li>

        {/* Sign Out */}
        <li>
          <a
            className="click-logout"
            onClick={(e) => {
              e.preventDefault();
              onLogout();
            }}
            href="#"
          >
            <FontAwesomeIcon icon={faRightFromBracket} />
            Sign Out
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
