// import { useTheme } from "@emotion/react";
import { Box, Typography, useTheme, useMediaQuery } from "@mui/material"; // library for layout design and responsiveness
import Form from "./Form"; // import file

const LoginPage = () => { 
    const theme = useTheme();
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)"); // determine the current screen size using material ui media query

    return <Box>
        {/* Sociopedia title starts here */}
        <Box
            width="100%"
            backgroundColor={theme.palette.background.alt}
            p="1rem 6%"
            textAlign="center"
        >
            <Typography
              fontWeight="bold"
              fontSize="clamp(1rem, 2rem, 2.25rem)"
              color="primary"
            >
              Sociopedia
            </Typography>
        </Box>
        {/* Sociopedia title ends here */}

        {/* login section starts here */}
        <Box
          width={isNonMobileScreens ? "50%" : "93%"}
          p="2rem"
          m="2rem auto"
          borderRadius="1.5rem"
          backgroundColor={theme.palette.background.alt}
        >
          <Typography fontWeight="500" variant="h5" sx={{ mb: "1.5rem" }}>
            Welcome to Socipedia, the Social Media for Sociopaths!
            </Typography>
            {/* include the ogin form from the loginForm>Form.jsx file */}
          <Form />
        </Box>
        {/* login section ends here */}
    
    </Box>
};

export default LoginPage;