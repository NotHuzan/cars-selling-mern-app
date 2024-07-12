import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { Link, useNavigate } from "react-router-dom";
import "../Navbar/Navbar.css";
import "./SideDrawer.css";

const linkstyle = {
  color: "black",
  textDecoration: "none",
};

const SideDrawer = () => {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();

  const toggleDrawer = (newOpen) => (e) => {
    console.log(e.target.className);
    if (e.target.parentNode.className !== "drawerSearch") setOpen(newOpen);
  };

  const searchCar = async (e) => {
    e.preventDefault();
    setOpen(false);
    navigate(`/usedcars?search=${e.target.search.value}`);
    e.target.search.value = "";
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <div className="logo">
        <div
          onClick={() => {
            navigate("/");
          }}
          style={{ cursor: "pointer", width: "10rem", margin: "2rem 1rem" }}
        >
          <img src="/headLogo.png" alt="" />
        </div>
      </div>
      <Divider />
      <List>
        <ListItem>
          <form
            className="drawerSearch"
            onSubmit={searchCar}
            style={{ width: "100%" }}
          >
            <input
              type="text"
              name="search"
              placeholder="Search Any Car"
              required
              style={{
                padding: "10px 10px",
                width: "100%",
                border: "2px solid black",
              }}
            />
            <button type="submit"></button>
          </form>
        </ListItem>
      </List>
      <Divider />
      <div className="drawerButtons">
        <List>
          <ListItem>
            <ListItemButton>
              <Link
                to="/usedcars/"
                id="two"
                style={{ linkstyle, width: "100%", height: "100%" }}
                className="shop-link"
              >
                Shop
              </Link>
              {/* <ListItemText primary={text} /> */}
            </ListItemButton>
          </ListItem>

          <ListItem>
            <ListItemButton>
              <Link
                to="/usedcars/suv"
                id="three"
                style={{ linkstyle, width: "100%", height: "100%" }}
                className="shop-link"
              >
                SUV
              </Link>
              {/* <ListItemText primary={text} /> */}
            </ListItemButton>
          </ListItem>

          <ListItem>
            <ListItemButton>
              <Link
                to="/usedcars/sedan"
                id="four"
                style={{ linkstyle, width: "100%", height: "100%" }}
                className="shop-link"
              >
                Sedan
              </Link>
              {/* <ListItemText primary={text} /> */}
            </ListItemButton>
          </ListItem>

          <ListItem>
            <ListItemButton>
              <Link
                to="/usedcars/crossover"
                id="five"
                style={{ linkstyle, width: "100%", height: "100%" }}
                className="shop-link"
              >
                CrossOver
              </Link>
              {/* <ListItemText primary={text} /> */}
            </ListItemButton>
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem>
            <ListItemButton>
              <Link to="/postad" className="postad-btn">
                Post an Ad
              </Link>
              {/* <ListItemText primary={text} /> */}
            </ListItemButton>
          </ListItem>
        </List>
      </div>
    </Box>
  );

  return (
    <div className="drawerBox">
      <Button onClick={toggleDrawer(true)}>
        <i className="fa fa-bars"></i>
      </Button>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
};

export default SideDrawer;
