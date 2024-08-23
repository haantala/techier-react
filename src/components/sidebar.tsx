import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import LogoCollapsed from "../assets/Images/path-to-collapsed-logo.png"; // Update with the correct path
import LogoExpanded from "../assets/Images/path-to-expanded-logo.jpg"; // Update with the correct path

const drawerWidthCollapsed = 60; // Width when collapsed
const drawerWidthExpanded = 240; // Width when expanded

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

      {/* Sidebar */}
      <Drawer
        variant="permanent"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        sx={{
          width: drawerWidthCollapsed,
          flexShrink: 0,
          whiteSpace: "nowrap",
          overflowX: "hidden",
          position: "absolute", // Absolute positioning to overlap content
          transition: "width 0.3s",
          [`& .MuiDrawer-paper`]: {
            width: sidebarWidth,
            boxSizing: "border-box",
            transition: "width 0.3s",
          },
        }}
      >
        {/* Logo */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            pt:hovered?2:0,
            height: drawerWidthCollapsed, // Keep logo height consistent
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
            {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  {hovered && <ListItemText primary={text} />} {/* Show text only if hovered */}
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {["All mail", "Trash", "Spam"].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  {hovered && <ListItemText primary={text} />} {/* Show text only if hovered */}
                </ListItemButton>
              </ListItem>
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
          ml: `${drawerWidthCollapsed}px`, // Set the margin-left to the collapsed width
          transition: "margin-left 0.3s",
        }}
      >
        <AppBar
          position="fixed"
          sx={{
            width: `calc(100% - ${drawerWidthCollapsed}px)`, // Adjust AppBar width based on sidebar
            ml: `${drawerWidthCollapsed}px`, // Account for sidebar margin
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
        {/* Your main content goes here */}
        <Box
          sx={{
            height: "calc(100vh - 64px)", // Subtract AppBar height
            overflowY: "auto", // Enable scrolling if content overflows
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default SideBar;
