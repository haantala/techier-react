/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Grid } from "@mui/material";
import { useRoutes } from "react-router-dom";
import View from "../../views/data/view";
import Home from "../../views/Home";

export default function AppRoutes(): JSX.Element {
  const routes = useRoutes([
    { path: "/", element: <View /> },
    { path: "/home", element: <Home /> },
  ]);

  return (
    <Box>
      <Grid>{routes}</Grid>
    </Box>
  );
}
