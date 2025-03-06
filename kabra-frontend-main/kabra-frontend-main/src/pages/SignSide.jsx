import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Outlet } from "react-router-dom";

const defaultTheme = createTheme();

export default function SignSide() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid
        container
        component="main"
        sx={{ height: "100vh", display: "flex", alignItems: "center" }}
        direction={{ xs: "column", lg: "row" }}
      >
        <CssBaseline />
        <Grid
          item
          xs={3}
          sm={4}
          md={5}
          lg={7}
          sx={{
            backgroundImage: "url(/kabra.png)",
            backgroundRepeat: "no-repeat",
            backgroundSize: "contain",
            backgroundPosition: "center",
            height: { xs: "50vh", sm: "40vh", md: "50vh", lg: "80vh" },
            width: { xs: "70vw", sm: "60vw", md: "50vw", lg: "80vw" },
          }}
        />
        <Grid item xs={9} sm={8} md={7} lg={5}>
          <Outlet />
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
