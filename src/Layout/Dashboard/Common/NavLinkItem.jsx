import * as React from "react";
import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  List,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

// Reusable NavLinkItem component
const NavLinkItem = ({ to, icon: Icon, label }) => {
  return (
    <NavLink
      to={to}
      style={({ isActive }) => ({
        textDecoration: "none",
        color: isActive ? "#007867" : "#637381",
      })}
    >
      {({ isActive }) => (
        <ListItemButton
          sx={{
            mb: 1,
            borderRadius: "10px",
            color: isActive ? "#007867" : "#637381",
            backgroundColor: isActive ? "#D6F1E8" : "transparent",
          }}
        >
          <ListItemIcon sx={{ color: isActive ? "#007867" : "#637381" }}>
            <Icon />
          </ListItemIcon>
          <ListItemText
            primary={label}
            primaryTypographyProps={{
              fontWeight: "bold",
              fontSize: "14px",
            }}
          />
        </ListItemButton>
      )}
    </NavLink>
  );
};

// Reusable NavCollapseItem component for collapsible items
const NavCollapseItem = ({ icon: Icon, label, children }) => {
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <>
      <ListItemButton
        onClick={handleClick}
        sx={{
          mb: 1,
          borderRadius: "10px",
          color: open ? "#637381" : "#637381",
          backgroundColor: open ? "#F5F5F5" : "transparent",
        }}
      >
        <ListItemIcon sx={{ color: open ? "#637381" : "#637381" }}>
          <Icon />
        </ListItemIcon>
        <ListItemText
          primary={label}
          primaryTypographyProps={{
            fontWeight: "bold",
            fontSize: "14px",
          }}
        />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List sx={{ ml: 3 }} component="div" disablePadding>
          {children}
        </List>
      </Collapse>
    </>
  );
};

export { NavLinkItem, NavCollapseItem };
