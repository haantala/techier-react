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
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>
          <List>
            {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  {hovered && <ListItemText primary={text} />}
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
                  {hovered && <ListItemText primary={text} />}
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
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
        <Box
          sx={{
            height: "calc(100vh - 64px)", 
            overflowY: "auto",
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default SideBar;
