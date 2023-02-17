import { Box, useMediaQuery } from "@mui/material"; // library for layout design and responsiveness
import { useSelector } from "react-redux"; // library for state management
/** importing custom build layouts and components start */
import Navbar from "scenes/navbar";
import UserWidget from "scenes/widgets/UserWidget";
import MyPostWidget from "scenes/widgets/MyPostWidget";
import PostsWidget from "scenes/widgets/MyPostWidget";
// import AdvertWidget from "scenes/widgets/AdvertWidget";
// import FriendListWidget from "scenes/widgets/FriendListWidget";
/** importing custom build layouts and components end here */

const HomePage = () => { 
    const isNonMobileScreens = useMediaQuery("(min-width:1000px)"); // for responsiveness
    const { _id, picturePath } = useSelector((state) => state.user);
    
    return (
        <Box>
            <Navbar />
            <Box
                width="100%"
                padding="2rem 6%"
                display={isNonMobileScreens ? "flex" : "block"} // display flex if not mobile other diplay in block
                gap="0.5rem"
                justifyContent="space-between"
            >
                <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
                    {/* <UserWidget userId={_id} picturePath={picturePath} /> */}
                </Box>
                <Box
                    flexBasis={isNonMobileScreens ? "42%" : undefined}
                    mt={isNonMobileScreens ? undefined : "2rem"} // margin top undefine if not mobile otherwise set to 2rem
                >
                    <MyPostWidget picturePath={picturePath} />
                    {/* <PostsWidget userId={_id} /> */}
                </Box>

                {isNonMobileScreens && (
                  <Box flexBasis="26%">

                  </Box>
                )}
            </Box>
        </Box>
    );
};

export default HomePage;