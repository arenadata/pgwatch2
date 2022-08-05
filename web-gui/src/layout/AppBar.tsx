import { Box, Typography } from "@mui/material";
import { AppBar as MuiAppBar } from "@mui/material";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import { Link } from "react-router-dom";


import { routes } from "./Routes";

export const AppBar = () => {
  return (
    <MuiAppBar component="header">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          pgwatch2
        </Typography>
        <Box sx={{ display: { xs: "none", sm: "block" } }}>
          {routes.map((item) => (
            <Button
              key={item.link}
              to={item.link}
              component={Link}
              sx={{ color: "#fff" }}
            >
              {item.title}
            </Button>
          ))}
        </Box>
      </Toolbar>
    </MuiAppBar>
  );
};
