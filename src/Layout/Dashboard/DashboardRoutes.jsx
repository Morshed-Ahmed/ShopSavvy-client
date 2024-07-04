import { Outlet } from "react-router-dom";
import Index from "./DashboardView/Index/Index";
import { Box } from "@mui/material";

const DashboardRoutes = () => {
  return (
    <Box>
      <div>
        <Index />
      </div>
      <div></div>
    </Box>
  );
};

export default DashboardRoutes;
