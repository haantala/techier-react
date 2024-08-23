/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Grid } from "@mui/material";
import { useRoutes } from "react-router-dom";
import View from "../../views/view";

export default function AppRoutes(): JSX.Element {
  const routes = useRoutes([
    { path: "/", element: <View /> },
  ]);

  return (
    <Box>
      <Grid>{routes}</Grid>
    </Box>
  );
}
