// // this is the just empty skeleton... starts here
// const PostsWidget = () => {
//     return (<div>MyPostsWidget</div>);
// };

// export default PostsWidget;
// // this is the just empty skeleton... ends here

import {
  EditOutlined,
  DeleteOutlined,
  AttachFileOutlined,
  GifBoxOutlined,
  ImageOutlined,
  MicOutlined,
  MoreHorizOutlined,
} from "@mui/icons-material"; // libraries
import {
  Box,
  Divider,
  Typography,
  InputBase,
  useTheme,
  Button,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import FlexBetween from "components/FlexBetween"; // component file
import Dropzone from "react-dropzone"; // library
import UserImage from "components/UserImage"; // component file
import WidgetWrapper from "components/WidgetWrapper"; // component file
import { useState } from "react"; // libraries
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";

const MyPostWidget = ({ picturePath }) => {
  const dispatch = useDispatch();
  const [isImage, setIsImage] = useState(false); // check if user has clicked on image button
  const [image, setImage] = useState(null); // acutal image droped or selected for upload
  const [post, setPost] = useState(""); // actual post content or description
  const { palette } = useTheme(); // for theme
  const { _id } = useSelector((state) => state.user); // userid
  const token = useSelector((state) => state.token); // user token
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)"); // media query
  const mediumMain = palette.neutral.mediumMain;
  const medium = palette.neutral.medium;

  const handlePost = async () => {
    const formData = new FormData();
    formData.append("userId", _id); // add user id
    formData.append("description", post); // add description
    // if image then add image and its name
    if (image) { 
      formData.append("picture", image); // add image
      formData.append("picturePath", image.name); // add image path
    }

    // api call 
    const response = await fetch(`http://localhost:3001/posts`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    }); // send the post information to the backend
    const posts = await response.json(); // api response
    dispatch(setPosts({ posts })); // keep our list of posts
    setImage(null); // reset image post
    setPost(""); // reset post details 
  };
  

    return (
      // widget that will be places in the middle post part starts here
      <WidgetWrapper>
          {/* first row user profile image and text box starts here */}
        <FlexBetween gap="1.5rem">
          <UserImage image={picturePath} />
          <InputBase
            placeholder="What's on your mind..." // hint text
            onChange={(e) => setPost(e.target.value)} // detech changes as you start typing
            value={post} // pass the entered text to post variable
            sx={{
              width: "100%",
              backgroundColor: palette.neutral.light,
              borderRadius: "2rem",
              padding: "1rem 2rem",
            }}
          />
        </FlexBetween>
          {/* first row user profile image and text box starts here */}
      
          {/* show add image box when clicked on image starts here */}
      {isImage && (
        <Box
          border={`1px solid ${medium}`}
          borderRadius="5px"
          mt="1rem"
          p="1rem"
        >
            {/* image upload box starts here */}
          <Dropzone
            acceptedFiles=".jpg,.jpeg,.png" // accept .jpg .jpeg, .png file only
            multiple={false} // doesn't support multiple images to be uploaded
            onDrop={(acceptedFiles) => setImage(acceptedFiles[0])} // setImage used (in register form setFieldValue used)
          >
            {({ getRootProps, getInputProps }) => (
                // add image outer and box for internal dash outline bordered starts here
              <FlexBetween>
                <Box
                  {...getRootProps()}
                  border={`2px dashed ${palette.primary.main}`} // show dash line around border
                  p="1rem"
                  width="100%"
                  sx={{ "&:hover": { cursor: "pointer" } }} // show hand while hovering
                >
                  <input {...getInputProps()} />
                  {!image ? ( // !image used (in register form !values.picture used)
                    <p>Add Image Here</p>
                  ) : (
                    <FlexBetween>
                      <Typography>{image.name}</Typography>
                      <EditOutlined />
                    </FlexBetween>
                  )}
                </Box>
                {/* delete icon when file selected starts here */}
                {image && (
                  <IconButton
                    onClick={() => setImage(null)}
                    sx={{ width: "15%" }}
                  >
                    <DeleteOutlined />
                  </IconButton>
                )}
                {/* delete icon when file selected ends here */}
              </FlexBetween>
                // add image outer and box for internal dash outline bordered starts here
            )}
          </Dropzone>
            {/* image upload box ends here */}
        </Box>
      )}
          {/* show add image box when clicked on image ends here */}
      

          {/* horizontal divider line */}
      <Divider sx={{ margin: "1.25rem 0" }} />

          {/* layout below horizontal divider line starts here */}
      <FlexBetween>
        {/* for image starts here and invoke function when clicked*/}
        <FlexBetween gap="0.25rem" onClick={() => setIsImage(!isImage)}>
          <ImageOutlined sx={{ color: mediumMain }} />
          <Typography
            color={mediumMain}
            sx={{ "&:hover": { cursor: "pointer", color: medium } }} // show pointer when hovered
          >
            Image
          </Typography>
        </FlexBetween>
        {/* for image ends here */}

        {/* responsiveness for clip, attatchment, audio starts here */}
        {isNonMobileScreens ? ( // show this items in larger screen
          <>
          {/* clip starts here */}
            <FlexBetween gap="0.25rem">
              <GifBoxOutlined sx={{ color: mediumMain }} />
              <Typography color={mediumMain}>Clip</Typography>
            </FlexBetween>
          {/* clip ends here */}
          
          {/* attatchment starts here */}
            <FlexBetween gap="0.25rem">
              <AttachFileOutlined sx={{ color: mediumMain }} />
              <Typography color={mediumMain}>Attachment</Typography>
            </FlexBetween>
          {/* attatchment ends here */}
          
          {/* audio starts here */}
            <FlexBetween gap="0.25rem">
              <MicOutlined sx={{ color: mediumMain }} />
              <Typography color={mediumMain}>Audio</Typography>
            </FlexBetween>
          {/* audio ends here */}
          </>
        ) : ( // else show this ... in small screen size
          <FlexBetween gap="0.25rem">
            <MoreHorizOutlined sx={{ color: mediumMain }} />
          </FlexBetween>
        )}
        {/* responsiveness for clip, attatchment, audio ends here */}

        {/* Post button and its on click function starts here */}
        <Button
          disabled={!post}
          onClick={handlePost}
          sx={{
            color: palette.background.alt,
            backgroundColor: palette.primary.main,
            borderRadius: "3rem",
          }}
        >
          POST
        </Button>
        {/* Post button and its on click function ends here */}
      </FlexBetween>
      {/* layout below horizontal divider line ends here */}
      
    </WidgetWrapper>
    // widget that will be places in the middle post part ends here
  );
};

export default MyPostWidget;
