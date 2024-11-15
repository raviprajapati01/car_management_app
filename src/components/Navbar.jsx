// import { IconButton } from "@mui/material";
import { Person, Menu } from "@mui/icons-material";
import variables from "../styles/variables.scss";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "../styles/Navbar.scss";
import { Link } from "react-router-dom";
import { setLogout } from "../redux/state";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || "https://car-management-app-172y.onrender.com"


const Navbar = () => {
  const [dropdownMenu, setDropdownMenu] = useState(false);

  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();

  // const [search, setSearch] = useState("")

  // const navigate = useNavigate()

  return (
    <div className="navbar">
      <a href="/">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbxPC94OW09dN21sO0wbxzZiW7LViqE9OtJg&s" alt="logo" />
      </a>

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
          <Menu sx={{ color: variables.darkgrey }} />
          {!user ? (
            <Person sx={{ color: variables.darkgrey }} />
          ) : (
            <img
            src={`${BACKEND_URL}/${user.profileImagePath.replace(
                "public",
                ""
              )}`}
              alt="profile Img"
              style={{ objectFit: "cover", borderRadius: "50%" }}
            />
          )}
        </button>

        {dropdownMenu && !user && (
          <div className="navbar_right_accountmenu">
            <Link to="/login">Log In</Link>
            <Link to="/register">Sign Up</Link>
          </div>
        )}

        {dropdownMenu && user && (
          <div className="navbar_right_accountmenu">
  
            <Link to={`/${user._id}/properties`}>Product List</Link>
            <Link to="/create-listing">Become A Host</Link>

            <Link
              to="/login"
              onClick={() => {
                dispatch(setLogout());
              }}
            >
              Log Out
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
