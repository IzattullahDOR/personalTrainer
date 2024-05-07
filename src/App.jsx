import { AppBar, Toolbar, Typography } from "@mui/material";
import { Link, Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <AppBar >
        <Toolbar style={{ display: 'flex', gap: '20px' }}>
          <Typography variant="h6" component={Link} to={"/"} style={{ color: 'white' }}>
            Customer
          </Typography>
          <Typography variant="h6" component={Link} to={"/training"} style={{ color: 'white' }}>
            Training
          </Typography>
        </Toolbar>
      </AppBar>
      <Outlet />
    </>
  );
}

export default App;
