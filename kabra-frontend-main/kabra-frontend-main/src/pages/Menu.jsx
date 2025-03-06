import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Outlet, useNavigate } from "react-router-dom";

import Menu from "@mui/material/Menu";
import Tooltip from "@mui/material/Tooltip";
import HomeIcon from "@mui/icons-material/Home";
import HelpIcon from "@mui/icons-material/Help";

import UserMenu from "../components/UserMenu";
import devboxLogo from "../img/logo-devbox.png";
import kabraLogo from "../img/logo-kabra.png";

const drawerWidth = 240;

const pages = ["Home", "Ajuda"];

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  backgroundColor: "#AC79FA",
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function MiniDrawer() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const navigate = useNavigate();

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
    setOpenNestedList(false);
  };

  const handleButtonClick = (path) => {
    navigate(path);
  };

  const drawer = (
    <div className="bg-[#AC79FA] grow flex flex-col justify-between">
      <div>
        <Divider />
        <List>
          {pages.map((text, index) => (
            <div key={text}>
              <ListItem disablePadding className="hover:bg-[#9367d6]">
                <Tooltip title={text}>
                  <ListItemButton
                    onClick={() => {
                      handleButtonClick(`/${text.toLowerCase()}`);
                      handleDrawerClose();
                    }}
                  >
                    <ListItemIcon>
                      {text === "Home" && (
                        <HomeIcon style={{ color: "white" }} />
                      )}
                      {text === "Ajuda" && (
                        <HelpIcon style={{ color: "white" }} />
                      )}
                    </ListItemIcon>
                    <ListItemText primary={text} style={{ color: "white" }} />
                  </ListItemButton>
                </Tooltip>
              </ListItem>
            </div>
          ))}
        </List>
      </div>
      <div>
        <a href="devbox" className="flex mr-1 items-center justify-center">
          <img
            src={devboxLogo}
            alt="devbox"
            className="h-auto w-auto max-h-20"
          />
        </a>
      </div>
    </div>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "flex", md: "flex" },
              justifyContent: "space-between",
            }}
          >
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            ></Menu>
            <Box
              sx={{ display: "flex", justifyContent: "center", width: "100%" }}
            >
              <IconButton
                onClick={() => handleButtonClick("")}
                sx={{
                  display: { xs: "none", md: "flex" },
                  height: "4rem",
                  gap: 1,
                }}
              >
                <img src={kabraLogo} alt="kabra" className="h-full w-auto" />
                <Typography
                  variant="h5"
                  noWrap
                  sx={{
                    fontFamily: "monospace",
                    fontWeight: 700,
                    letterSpacing: ".3rem",
                    color: "white",
                    textDecoration: "none",
                  }}
                >
                  Kabra
                </Typography>
              </IconButton>
              <IconButton
                onClick={() => handleButtonClick("")}
                sx={{
                  display: { xs: "flex", md: "none" },
                  height: "3rem",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 1,
                }}
              >
                <img src={kabraLogo} alt="kabra" className="h-full w-auto" />
                <Typography
                  variant="h5"
                  noWrap
                  sx={{
                    fontFamily: "monospace",
                    fontWeight: 700,
                    letterSpacing: ".3rem",
                    color: "white",
                    textDecoration: "none",
                  }}
                >
                  Kabra
                </Typography>
              </IconButton>
            </Box>
          </Box>
          <UserMenu />
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        open={open}
        ModalProps={{ keepMounted: true }}
        sx={{ display: { xs: "block", sm: "none" } }}
      >
        <DrawerHeader className="bg-[#AC79FA]">
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon style={{ color: "white" }} />
            ) : (
              <ChevronLeftIcon style={{ color: "white" }} />
            )}
          </IconButton>
        </DrawerHeader>
        {drawer}
      </Drawer>
      <Drawer
        variant="permanent"
        open={open}
        ModalProps={{ keepMounted: true }}
        sx={{ display: { xs: "none", sm: "block" } }}
      >
        <DrawerHeader className="bg-[#AC79FA]">
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon style={{ color: "white" }} />
            ) : (
              <ChevronLeftIcon style={{ color: "white" }} />
            )}
          </IconButton>
        </DrawerHeader>
        {drawer}
      </Drawer>
      <Box
        component="main"
        className="h-full flex flex-col justify-center items-center grow m-4"
      >
        <DrawerHeader />
        <Outlet />
      </Box>
    </Box>
  );
}
