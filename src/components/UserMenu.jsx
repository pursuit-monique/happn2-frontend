import { useEffect } from "react";
import { Link } from "react-router-dom";
import { logout } from "../firebase/auth";
import "./UserMenu.css";

const UserMenu = () => {
  useEffect(() => {
    const dropdownToggle = document.getElementById("ImageDropdownToggle");
    const dropdownMenu = document.getElementById("imageDropdownMenu");

    dropdownToggle.addEventListener("click", () => {
      dropdownMenu.classList.toggle("show");
    });

    document.addEventListener("click", (e) => {
      if (
        !dropdownToggle.contains(e.target) &&
        !dropdownMenu.contains(e.target)
      ) {
        dropdownMenu.classList.remove("show");
      }
    });
  }, []);

  return (
    <div className="dropdown">
      <img
        src="https://xsgames.co/randomusers/avatar.php?g=female"
        className="Avatar"
        alt="Avatar"
        id="ImageDropdownToggle"
        data-bs-toggle="dropdown"
      />
      <ul
        className="dropdown-menu dropdown-menu-dark UserMenu__bg"
        aria-labelledby="ImageDropdownToggle"
        id="imageDropdownMenu"
      >
        <li>
          <Link to="/new" className="dropdown-item active">
            New Event
          </Link>
        </li>
        <li>
          <Link to="/user" className="dropdown-item">
            User Info
          </Link>
        </li>
        <li className="dropdown-item" onClick={logout}>
          <span> Logout</span>
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
          <a className="dropdown-item" href="#">
            Temporary
          </a>
        </li>
      </ul>
    </div>
  );
};

export default UserMenu;
