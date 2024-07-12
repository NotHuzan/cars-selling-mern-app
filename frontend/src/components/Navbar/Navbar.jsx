import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store/auth";
import { snackbarActions } from "../../store/snackbar";
import UserSettings from "../UserSettings/UserSettings";
import { useMediaQuery } from "@mui/material";
import SideDrawer from "../SideDrawer/SideDrawer";

const linkstyle = {
  color: "black",
  textDecoration: "none",
};

const Navbar = ({ stock, SUV, SEDAN, CROSS }) => {
  const [hoveredLink, setHoveredLink] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openModal, setModal] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const loggedIn = useSelector((state) => state.auth.isLoggedIn);
  const [showDrawerButton, setShowDrawerButton] = useState(false);
  const matches = useMediaQuery("(max-width:1100px)");

  // const open = Boolean(anchorEl);

  const toggleDrawerButton = (open) => () => {
    setShowDrawerButton(open);
  };

  useEffect(() => {
    // if (!matches) {
    //   showDrawerButton(false);
    // }

    matches ? setShowDrawerButton(true) : setShowDrawerButton(false);
  }, [matches]);

  const handleClick = (event) => {
    loggedIn
      ? setAnchorEl(event.currentTarget)
      : navigate("/login", { state: { from: location } });
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    setAnchorEl(null);
    dispatch(authActions.logout());
    dispatch(
      snackbarActions.openSnackbar({
        text: "You are Logged Out !",
        severity: "success",
      })
    );
  };

  const handleLinkHover = (category) => {
    setHoveredLink(category);
  };

  const handleLinkLeave = () => {
    setHoveredLink(null);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const searchCar = async (e) => {
    e.preventDefault();
    navigate(`/usedcars?search=${e.target.search.value}`);
    e.target.search.value = "";
  };

  return (
    <>
      <nav>
        <div className="navbar">
          <div className="logo">
            <div
              onClick={() => {
                navigate("/");
              }}
              style={{ cursor: "pointer", width: '10rem' }}
            >
              <img src="/headLogo.png" alt="" />
            </div>
          </div>

          {!showDrawerButton && (
            <>
              <div className="links">
                <Link
                  to="/usedcars/"
                  id="two"
                  style={linkstyle}
                  onMouseEnter={() => handleLinkHover("Shop")}
                  onMouseLeave={handleLinkLeave}
                  className="shop-link"
                >
                  Shop
                </Link>

                <Link
                  to="/usedcars/suv"
                  id="three"
                  style={linkstyle}
                  onMouseEnter={() => handleLinkHover("SUV")}
                  onMouseLeave={handleLinkLeave}
                  className="shop-link"
                >
                  SUV
                </Link>

                <Link
                  to="/usedcars/sedan"
                  id="four"
                  style={linkstyle}
                  onMouseEnter={() => handleLinkHover("Sedan")}
                  onMouseLeave={handleLinkLeave}
                  className="shop-link"
                >
                  Sedan
                </Link>

                <Link
                  to="/usedcars/crossover"
                  id="five"
                  style={linkstyle}
                  onMouseEnter={() => handleLinkHover("CrossOver")}
                  onMouseLeave={handleLinkLeave}
                  className="shop-link"
                >
                  CrossOver
                </Link>
              </div>
              <div className="post-ad">
                <Link to="/postad" className="postad-btn">
                  Post an Ad
                </Link>
              </div>
            </>
          )}

          <div className="user-box">
            {showDrawerButton ? (
              <SideDrawer />
            ) : (
              <div className="search">
                <form
                  // className={`form-inline ${menuOpen ? "hide-on-mobile" : ""}`}
                  className="search-box"
                  onSubmit={searchCar}
                  style={{ marginLeft: "20px" }}
                >
                  <button class="btn-search" type="button">
                    <i class="fas fa-search"></i>
                  </button>
                  <input
                    type="text"
                    class="input-search"
                    name="search"
                    placeholder="Type to Search..."
                    required
                  />
                  {/* <input
                    className="form-control mr-sm-2"
                    type="search"
                    name="search"
                    placeholder="Search"
                    aria-label="Search"
                  />
                  <button
                    className="btn btn-outline-success my-2 my-sm-0"
                    type="submit"
                  >
                    Search
                  </button> */}
                </form>
              </div>
            )}
            <div className="user-settings">
              <UserSettings
                handleClick={handleClick}
                handleClose={handleClose}
                handleLogout={handleLogout}
                anchorEl={anchorEl}
              />
            </div>
          </div>
        </div>

        {/* <div className="left">
          {showDrawerButton && <SideDrawer />}

          <div className="logo"></div>
          <div className={`links ${menuOpen ? "show" : ""}`}></div>
          <div className="menu-icon" onClick={toggleMenu}>
            <i className="fa fa-bars"></i>
          </div>
        </div>
        <div className="icons"></div> */}
      </nav>
    </>
  );
};

Navbar.propTypes = {
  stock: PropTypes.array.isRequired,
  SUV: PropTypes.array.isRequired,
  SEDAN: PropTypes.array.isRequired,
  CROSS: PropTypes.array.isRequired,
};

export default Navbar;

// import * as React from 'react';
// import Box from '@mui/material/Box';
// import Avatar from '@mui/material/Avatar';
// import Menu from '@mui/material/Menu';
// import MenuItem from '@mui/material/MenuItem';
// import ListItemIcon from '@mui/material/ListItemIcon';
// import Divider from '@mui/material/Divider';
// import IconButton from '@mui/material/IconButton';
// import Typography from '@mui/material/Typography';
// import Tooltip from '@mui/material/Tooltip';
// import PersonAdd from '@mui/icons-material/PersonAdd';
// import Settings from '@mui/icons-material/Settings';
// import Logout from '@mui/icons-material/Logout';

// export default function AccountMenu() {
//   const [anchorEl, setAnchorEl] = React.useState(null);
//   const open = Boolean(anchorEl);
//   const handleClick = (event) => {
//     setAnchorEl(event.currentTarget);
//   };
//   const handleClose = () => {
//     setAnchorEl(null);
//   };
//   return (
//     <React.Fragment>
//       <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
//         <Tooltip title="Account settings">
//           <IconButton
//             onClick={handleClick}
//             size="small"
//             sx={{ ml: 2 }}
//             aria-controls={open ? 'account-menu' : undefined}
//             aria-haspopup="true"
//             aria-expanded={open ? 'true' : undefined}
//           >
//             <Avatar sx={{ width: 32, height: 32 }}>P</Avatar>
//           </IconButton>
//         </Tooltip>
//       </Box>
//       <Menu
//         anchorEl={anchorEl}
//         id="account-menu"
//         open={open}
//         onClose={handleClose}
//         onClick={handleClose}
//         PaperProps={{
//           elevation: 0,
//           sx: {
//             overflow: 'visible',
//             filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
//             mt: 1.5,
//             '& .MuiAvatar-root': {
//               width: 32,
//               height: 32,
//               ml: -0.5,
//               mr: 1,
//             },
//             '&::before': {
//               content: '""',
//               display: 'block',
//               position: 'absolute',
//               top: 0,
//               right: 14,
//               width: 10,
//               height: 10,
//               bgcolor: 'background.paper',
//               transform: 'translateY(-50%) rotate(45deg)',
//               zIndex: 0,
//             },
//           },
//         }}
//         transformOrigin={{ horizontal: 'right', vertical: 'top' }}
//         anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
//       >
//         <MenuItem onClick={handleClose}>
//           <Avatar /> Profile
//         </MenuItem>
//         <MenuItem onClick={handleClose}>
//           <Avatar /> My Ads
//         </MenuItem>
//         <MenuItem onClick={handleClose}>
//           <Avatar /> My Saved Ads
//         </MenuItem>
//         <Divider />
//         <MenuItem onClick={handleClose}>
//           <ListItemIcon>
//             <PersonAdd fontSize="small" />
//           </ListItemIcon>
//           Change Password
//         </MenuItem>
//         {/* <MenuItem onClick={handleClose}>
//           <ListItemIcon>
//             <Settings fontSize="small" />
//           </ListItemIcon>
//           Settings
//         </MenuItem> */}
//         <Divider/>
//         <MenuItem onClick={handleClose}>
//           <ListItemIcon>
//             <Logout fontSize="small" />
//           </ListItemIcon>
//           Logout
//         </MenuItem>
//       </Menu>
//     </React.Fragment>
//   );
// }

// old nav

// <>
//   <nav>
//     <div className="left">
//       <div className="logo">
//         <h2
//           onClick={() => {
//             navigate("/");
//           }}
//           style={{ cursor: "pointer" }}
//         >
//           CARS
//         </h2>
//       </div>
//       <div className={`links ${menuOpen ? "show" : ""}`}>
//         <Link
//           to="/usedcars/"
//           id="two"
//           style={linkstyle}
//           onMouseEnter={() => handleLinkHover("Shop")}
//           onMouseLeave={handleLinkLeave}
//           className="shop-link"
//         >
//           Shop
//         </Link>

//         <Link
//           to="/usedcars/suv"
//           id="three"
//           style={linkstyle}
//           onMouseEnter={() => handleLinkHover("SUV")}
//           onMouseLeave={handleLinkLeave}
//           className="shop-link"
//         >
//           SUV
//         </Link>

//         <Link
//           to="/usedcars/sedan"
//           id="four"
//           style={linkstyle}
//           onMouseEnter={() => handleLinkHover("Sedan")}
//           onMouseLeave={handleLinkLeave}
//           className="shop-link"
//         >
//           Sedan
//         </Link>

//         <Link
//           to="/usedcars/crossover"
//           id="five"
//           style={linkstyle}
//           onMouseEnter={() => handleLinkHover("CrossOver")}
//           onMouseLeave={handleLinkLeave}
//           className="shop-link"
//         >
//           CrossOver
//         </Link>
//       </div>
//       <div className="menu-icon" onClick={toggleMenu}>
//         <i className="fa fa-bars"></i>
//       </div>
//     </div>
//     <div className="icons">
//       <Link to="/postad" id="one">
//         Post an Ad
//       </Link>
//       <form
//         className={`form-inline ${menuOpen ? "hide-on-mobile" : ""}`}
//         onSubmit={searchCar}
//         style={{ marginLeft: "20px" }}
//       >
//         <input
//           className="form-control mr-sm-2"
//           type="search"
//           name="search"
//           placeholder="Search"
//           aria-label="Search"
//         />
//         <button
//           className="btn btn-outline-success my-2 my-sm-0"
//           type="submit"
//         >
//           Search
//         </button>
//       </form>

//       {/* <Link to="/myads">
//         <i className="fa-solid fa-1x fa-cart-shopping"></i>
//       </Link> */}
//       {/* <i className="fa-regular fa-user"></i> */}

//       <Box
//         sx={{ display: "flex", alignItems: "center", textAlign: "center" }}
//       >
//         <Tooltip title="Account settings">
//           <IconButton
//             onClick={handleClick}
//             size="small"
//             sx={{ ml: 2 }}
//             aria-controls={open ? "account-menu" : undefined}
//             aria-haspopup="true"
//             aria-expanded={open ? "true" : undefined}
//           >
//             <i className="fa-regular fa-user"></i>
//             {/* <Avatar sx={{ width: 32, height: 32 }}>P</Avatar> */}
//           </IconButton>
//         </Tooltip>
//       </Box>
//       <Menu
//         anchorEl={anchorEl}
//         id="account-menu"
//         open={open}
//         onClose={handleClose}
//         onClick={handleClose}
//         PaperProps={{
//           elevation: 0,
//           sx: {
//             overflow: "visible",
//             filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
//             mt: 1.5,
//             "& .MuiAvatar-root": {
//               width: 32,
//               height: 32,
//               ml: -0.5,
//               mr: 1,
//             },
//             "&::before": {
//               content: '""',
//               display: "block",
//               position: "absolute",
//               top: 0,
//               right: 14,
//               width: 10,
//               height: 10,
//               bgcolor: "background.paper",
//               transform: "translateY(-50%) rotate(45deg)",
//               zIndex: 0,
//             },
//           },
//         }}
//         transformOrigin={{ horizontal: "right", vertical: "top" }}
//         anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
//       >
//         <MenuItem onClick={()=>navigate('/profile')}>
//           <Avatar /> Profile
//         </MenuItem>
//         <MenuItem onClick={()=>navigate('/myads')}>
//           <Avatar /> My Ads
//         </MenuItem>
//         <MenuItem onClick={()=>navigate('/saved_ads')}>
//           <Avatar /> My Saved Ads
//         </MenuItem>
//         <MenuItem onClick={()=>navigate('/appointments')}>
//           <Avatar /> My Appointments
//         </MenuItem>
//         <Divider />
//         <MenuItem onClick={() => navigate("/profile/reset_password")}>
//           <ListItemIcon>
//             <PersonAdd fontSize="small" />
//           </ListItemIcon>
//           Change Password
//         </MenuItem>
//         {/* <FormModal openModal={openModal} closeModal={setModalClose}>
//           <MenuItem onClick={handleModal}>
//             <ListItemIcon>
//               <PersonAdd fontSize="small" />
//             </ListItemIcon>
//             Change Password
//             // <FormModal openModal={openModal} closeModal={setModalClose} />
//           </MenuItem>
//         </FormModal> */}
//         {/* <MenuItem onClick={handleClose}>
//       <ListItemIcon>
//         <Settings fontSize="small" />
//       </ListItemIcon>
//       Settings
//     </MenuItem> */}
//         <Divider />
//         <MenuItem onClick={handleLogout}>
//           <ListItemIcon>
//             <Logout fontSize="small" />
//           </ListItemIcon>
//           Logout
//         </MenuItem>
//       </Menu>
//     </div>
//   </nav>
// </>
