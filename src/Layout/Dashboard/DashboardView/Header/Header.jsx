import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import MenuIcon from "@mui/icons-material/Menu";
import AccountMenu from "../../Common/AccountMenu";
import NotificationDrawer from "../../Common/NotificationDrawer";
import SearchModal from "../../Common/SearchModal";
import CustomizedSwitches from "../../Common/CustomizedSwitches";

const Header = ({ drawerWidth, handleDrawerToggle }) => {
  return (
    <AppBar
      position="fixed"
      sx={{
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: `${drawerWidth}px` },
        bgcolor: "white",
        color: "#637381",
        boxShadow: 1,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <SearchModal />
        </Toolbar>
        <Box sx={{ mr: 2, display: "flex" }}>
          <CustomizedSwitches />
          <NotificationDrawer />
          <AccountMenu />
        </Box>
      </Box>
    </AppBar>
  );
};

export default Header;
