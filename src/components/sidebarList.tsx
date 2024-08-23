import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { ReactNode } from "react";
import View from "../views/data/view";

// Define a type for your menu item
interface MenuItem {
  name: string;
  Icon1: ReactNode;
  Icon2: ReactNode;
  path: string;
}

// Define the menu data with the correct type
const Data: MenuItem = {
  name: "Data",
  Icon1: <InboxIcon />,
  Icon2: <MailIcon />,
  path: "/",
};
const Home: MenuItem = {
  name: "Home",
  Icon1: <InboxIcon />,
  Icon2: <MailIcon />,
  path: "/home",
};

// Define the Menu array with the correct type
const userRoute: MenuItem[] = [Data,Home];

let Menu = userRoute

export default Menu;
