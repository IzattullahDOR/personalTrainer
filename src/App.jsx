import { AppBar, Toolbar, Typography } from "@mui/material"
import Customer from "./components/Customer"


function App() {
  

  return (
    <>
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6">Customer</Typography>
      </Toolbar>
    </AppBar>
      <Customer />
    </>
  )
}

export default App
