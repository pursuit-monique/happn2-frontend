import React, { useEffect, useState } from "react";
import { Link,  useLocation  } from "react-router-dom";
import "./UserMenu.css";

const UserMenu = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const location = useLocation();


  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (!document.getElementById("ImageDropdownToggle").contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="dropdown">
      <div className="position-relative">
        <img
          src="https://xsgames.co/randomusers/avatar.php?g=female"
          className="Avatar"
          alt="Avatar"
          id="ImageDropdownToggle"
          onClick={toggleDropdown}
        />
        <ul
          className={`dropdown-menu dropdown-menu-dark UserMenu__bg ${
            isDropdownOpen ? "show" : ""
          }`}
          aria-labelledby="ImageDropdownToggle"
          style={{
            position: "absolute",
            top: '64px',
            left: '86vw',
            width: '200px'
          }}
        >
          <li>
            <Link to="/" className={`dropdown-item ${location.pathname === '/' ? 'active': ''}`}>
              Main Page
            </Link>
          </li>
          <li>
            <Link to="/new" className={`dropdown-item ${location.pathname === '/new' ? 'active': ''}`}>
              New Event
            </Link>
          </li>
          <li>
            <Link to="/user" className={`dropdown-item ${location.pathname === '/user' ? 'active': ''}`}>
              User Info
            </Link>
          </li>
          <li>
            <a className="dropdown-item" href="#">
              Temporary
            </a>
          </li>
          <li>
            <hr className="dropdown-divider" />
          </li>
          <li>
            <Link to="/about" className={`dropdown-item ${location.pathname === '/about' ? 'active': ''}`}>
              About
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default UserMenu;
