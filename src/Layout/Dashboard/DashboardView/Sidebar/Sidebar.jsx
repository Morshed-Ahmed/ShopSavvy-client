import { Box, Button, IconButton, Tooltip } from "@mui/material";
import StarBorder from "@mui/icons-material/StarBorder";
import { NavLinkItem, NavCollapseItem } from "../../Common/NavLinkItem";
import { MdSpaceDashboard } from "react-icons/md";
import { FaBagShopping } from "react-icons/fa6";
import { VscChromeMinimize } from "react-icons/vsc";

// Sidebar component
const Sidebar = () => {
  const role = localStorage.getItem("role");
  // console.log(role);
  return (
    <div>
      <h1>ShopSavvy</h1>
      <Box sx={{ p: 2 }}>
        <Box
          sx={{
            width: "100%",
            maxWidth: 360,
            bgcolor: "background.paper",
            color: "text.secondary",
          }}
          component="nav"
        >
          {/* Using NavLinkItem component for each navigation link */}
          <NavLinkItem to="/" icon={MdSpaceDashboard} label="Overview" />

          {/* Using NavCollapseItem for collapsible inbox item */}
          <NavCollapseItem icon={FaBagShopping} label="Product">
            {/* Using NavLinkItem for "Starred" item inside collapse */}
            <NavLinkItem
              to="/create-product"
              icon={VscChromeMinimize}
              label="Create"
            />

            {role == "seller" ? (
              <>
                <div
                // onClick={alert(
                //   "You do not have permission to view your product list"
                // )}
                >
                  <Tooltip title="You do not have permission to view your product list">
                    <Box>
                      <NavLinkItem
                        to="/"
                        icon={VscChromeMinimize}
                        label="List"
                      />
                    </Box>
                  </Tooltip>
                </div>
              </>
            ) : (
              <>
                <NavLinkItem
                  to="/products"
                  icon={VscChromeMinimize}
                  label="List"
                />
              </>
            )}
            <NavLinkItem
              to="/product-details"
              icon={VscChromeMinimize}
              label="Details"
            />
            <NavLinkItem
              to="/product-update"
              icon={VscChromeMinimize}
              label="Update"
            />
            <NavLinkItem
              to="/product-category"
              icon={VscChromeMinimize}
              label="Category"
            />
          </NavCollapseItem>
        </Box>
      </Box>
    </div>
  );
};

export default Sidebar;
