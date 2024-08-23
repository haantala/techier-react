import React, { useState } from "react";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import LogoCollapsed from "../assets/Images/path-to-collapsed-logo.png";
import LogoExpanded from "../assets/Images/path-to-expanded-logo.jpg";
import Menu from "./sidebarList";

const drawerWidthCollapsed = 60;
const drawerWidthExpanded = 240;

interface Props {
  window?: () => Window;
  children?: React.ReactNode;
}

const SideBar: React.FC<Props> = ({ window, children }) => {
  const [hovered, setHovered] = useState(false);
  const sidebarWidth = hovered ? drawerWidthExpanded : drawerWidthCollapsed;

  return (
    <Box sx={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      <CssBaseline />
      <Drawer
        variant="permanent"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        sx={{
          width: drawerWidthCollapsed,
          flexShrink: 0,
          whiteSpace: "nowrap",
          overflowX: "hidden",
          position: "absolute",
          transition: "width 0.3s",
          [`& .MuiDrawer-paper`]: {
            width: sidebarWidth,
            boxSizing: "border-box",
            transition: "width 0.3s",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            pt: hovered ? 2 : 0,
            height: drawerWidthCollapsed,
            overflow: "hidden",
          }}
        >
          <img
            src={hovered ? LogoExpanded : LogoCollapsed}
            alt="Logo"
            style={{ width: "100%", height: "auto" }}
          />
        </Box>
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>
          <List>
            {Menu.map((data) => (
              <Link to={data.path} key={data.name} style={{ textDecoration: "none", color: "inherit" }}>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>{hovered ? data.Icon1 : data.Icon2}</ListItemIcon>
                    {hovered && <ListItemText primary={data.name} />}
                  </ListItemButton>
                </ListItem>
              </Link>
            ))}
          </List>
        </Box>
      </Drawer>

      {/* Main content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          ml: `${drawerWidthCollapsed}px`,
          transition: "margin-left 0.3s",
        }}
      >
        <AppBar
          position="fixed"
          sx={{
            width: `calc(100% - ${drawerWidthCollapsed}px)`,
            ml: `${drawerWidthCollapsed}px`,
            transition: "width 0.3s, margin-left 0.3s",
          }}
        >
          <Toolbar>
            <Typography variant="h6" noWrap component="div">
              HARSH ANTALA
            </Typography>
          </Toolbar>
        </AppBar>
        <Toolbar />
        <Box sx={{ height: "calc(100vh - 64px)", overflowY: "auto" }}>
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default SideBar;
