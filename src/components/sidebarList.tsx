import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { ReactNode } from "react";
import View from "../views/view";

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

// Define the Menu array with the correct type
export const Menu: MenuItem[] = [Data];

export default Menu;
