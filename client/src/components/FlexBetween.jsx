import { Box } from "@mui/material"; // library
import { styled } from "@mui/system"; // library

// style for flex box
const FlexBetween = styled(Box)({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
});

export default FlexBetween;