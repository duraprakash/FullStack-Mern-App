import { createSlice } from "@reduxjs/toolkit"; // import libraries

// our initial data
const initialState = {
    // these data will be accessible to all the part of the application
    mode: "light",
    user: null,
    token: null,
    posts: [],
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: { // reducers is used to change the state values (of initialState)
        // background theme color
        setMode: (state) => {
            // if mode is light then change it into dark else change it to light
            state.mode = state.mode === "light" ? "dark" : "light";
        },
        // login part save the user info and the token
        setLogin: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        // logout part delete/reset the user info and the token
        setLogout: (state) => {
            state.user = null;
            state.token = null;
        },
        // friend part
        setFriends: (state, action) => {
            // if user already exist
            if (state.user) {
                // show the user in the friend list
                state.user.friends = action.payload.friends;
            } else {
                // otherwise show user not exist message in the console
                console.error("User friends non-existent: ")
            }
        },
        // posts part
        setPosts: (state, action) => {
            // if posts are available then show them
            state.posts = action.payload.posts;
        },
        // post upadate part
        setPost: (state, action) => {
            // update the post using post_id
            const updatePosts = state.posts.map((post) => {
                // if matched update the post
                if (post._id === action.payload.post_id) return action.payload.post;
                // otherwise just show the post
                return post;
            });
            // save the above post result
            state.posts = updatePosts;
        },
    }
});

export const { setMode, setLogin, setLogout, setFriends, setPosts, setPost } = authSlice.actions;
export default authSlice.reducer;