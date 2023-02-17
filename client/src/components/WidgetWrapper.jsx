import { Box } from "@mui/material"; // libraries
import { styled } from "@mui/system";

const WidgetWrapper = styled(Box)(({ theme }) => ({
  padding: "1.5rem 1.5rem 0.75rem 1.5rem", // top right bottom left padding
  backgroundColor: theme.palette.background.alt, // background color
  borderRadius: "0.75rem", // box corner radius
}));

export default WidgetWrapper;