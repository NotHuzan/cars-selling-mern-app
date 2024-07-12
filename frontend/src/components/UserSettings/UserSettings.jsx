import React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import PersonAdd from "@mui/icons-material/PersonAdd";
import CampaignIcon from "@mui/icons-material/Campaign";
import SaveIcon from "@mui/icons-material/Save";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import EventIcon from "@mui/icons-material/Event";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import ScheduleIcon from "@mui/icons-material/Schedule";
import PostAddIcon from '@mui/icons-material/PostAdd';

import AssignmentIcon from "@mui/icons-material/Assignment";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import PersonIcon from "@mui/icons-material/Person";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";

const UserSettings = ({ handleClick, handleClose, handleLogout, anchorEl }) => {
  const navigate = useNavigate();
  const open = Boolean(anchorEl);
  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <i className="fa-regular fa-user" style={{ color: "black" }}></i>
            {/* <Avatar sx={{ width: 32, height: 32 }}>P</Avatar> */}
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&::before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={() => navigate("/profile")}>
          <ListItemIcon>
            <AccountCircleIcon />
          </ListItemIcon>
          Profile
        </MenuItem>
        <MenuItem onClick={() => navigate("/profile/reset_password")}>
          <ListItemIcon>
            <VpnKeyIcon fontSize="small" />
          </ListItemIcon>
          Change Password
        </MenuItem>
        <Divider />
        <MenuItem onClick={() => navigate("/myads")}>
          <ListItemIcon>
            <AssignmentIcon />
          </ListItemIcon>
          My Ads
        </MenuItem>
        <MenuItem onClick={() => navigate("/saved_ads")}>
          <ListItemIcon>
            <BookmarkIcon />
          </ListItemIcon>
          My Saved Ads
        </MenuItem>
        <MenuItem onClick={() => navigate("/appointments")}>
          <ListItemIcon>
            <ScheduleIcon />
          </ListItemIcon>
          My Appointments
        </MenuItem>

        {/* <FormModal openModal={openModal} closeModal={setModalClose}>
          <MenuItem onClick={handleModal}>
            <ListItemIcon>
              <PersonAdd fontSize="small" />
            </ListItemIcon>
            Change Password
            // <FormModal openModal={openModal} closeModal={setModalClose} />
          </MenuItem>
        </FormModal> */}
        {/* <MenuItem onClick={handleClose}>
      <ListItemIcon>
        <Settings fontSize="small" />
      </ListItemIcon>
      Settings
    </MenuItem> */}
        <Divider />
        <MenuItem onClick={() => navigate("/postad")}>
          <ListItemIcon>
            <PostAddIcon />
          </ListItemIcon>
          Post Ad
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </>
  );
};

export default UserSettings;
