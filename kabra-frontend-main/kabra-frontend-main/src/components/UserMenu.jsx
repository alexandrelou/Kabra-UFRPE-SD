import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/userSlice";
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import LoginIcon from "@mui/icons-material/Login";
import { useNavigate } from "react-router-dom";

const settings = ["Perfil", "Sair"];

function UserMenu() {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const dispatch = useDispatch();
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const navigate = useNavigate();

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleSign = (sign) => {
    if (sign === "Sair") {
      dispatch(logout());
      handleCloseUserMenu();
    } else {
      navigate(`/${sign}`);
    }
  };

  if (isLoggedIn) {
    return (
      <Box sx={{ flexGrow: 0 }}>
        <Tooltip title="Configurações">
          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
          </IconButton>
        </Tooltip>
        <Menu
          sx={{ mt: "45px" }}
          id="menu-appbar"
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
        >
          {settings.map((setting) => (
            <MenuItem key={setting} onClick={() => handleSign(setting)}>
              <Typography textAlign="center">{setting}</Typography>
            </MenuItem>
          ))}
        </Menu>
      </Box>
    );
  } else {
    return (
      <div className="flex space-x-4">
        <Tooltip title="Login">
          <IconButton onClick={() => handleSign("login")}>
            <LoginIcon style={{ color: "white" }} />
          </IconButton>
        </Tooltip>
      </div>
    );
  }
}

export default UserMenu;
