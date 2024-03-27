import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../styles/navbar.scss";
import { IconButton } from "@mui/material";
import { Search, Person, Menu } from "@mui/icons-material";
import variables from "../styles/variables.scss";
import { Link } from "react-router-dom";
import { setLogOut } from "../redux/state";

const Navbar = () => {
  const [dropdownMenu, setDropdownMenu] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  return (
    <div className="navbar">
      <a href="/">
        <img src="./assests/logo.png" alt="logo" />
      </a>
      <div className="navbar_search">
        <input type="text" placeholder="Search" />
        <IconButton>
          <Search style={{ color: variables.pinkred }} />
        </IconButton>
      </div>
      <div className="navbar_right">
        {user ? (
          <a href="/create-listing" className="host">
            Become A Host
          </a>
        ) : (
          <a href="/login" className="host">
            Become A Host
          </a>
        )}

        <button
          className="navbar_right_account"
          onClick={() => setDropdownMenu(!dropdownMenu)}
        >
          <Menu style={{ color: variables.drakgrey }} />

          {!user ? (
            <Person style={{ color: variables.drakgrey }} />
          ) : (
            <img
              src={`http://localhost:6010/${user.profileImagePath.replace(
                "public",
                ""
              )}`}
              alt="profile_pic"
              style={{ objectFit: "cover", borderRadius: "50%" }}
            />
          )}
        </button>
        {dropdownMenu && !user && (
          <div className="navbar_right_accountmenu">
            <Link to={"/login"}>Login</Link>
            <Link to={"/register"}>Sign Up</Link>
          </div>
        )}
        {dropdownMenu && user && (
          <div className="navbar_right_accountmenu">
            <Link to={"/triplist"}>Trip List</Link>
            <Link to={"/wishlist"}>Wish List</Link>
            <Link to={"/reservation"}>Reservation List</Link>
            <Link to={"/"}>Become A Host</Link>

            <Link
              to={"/login"}
              onClick={() => {
                dispatch(setLogOut());
              }}
            >
              Logout
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
