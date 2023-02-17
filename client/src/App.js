import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'; // import libraries
import HomePage from 'scenes/homePage'; // import files that we created
import LoginPage from 'scenes/loginPage'; // import files 
import ProfilePage from 'scenes/profilePage'; // import files
import { useMemo } from "react"; // library
import { useSelector } from "react-redux"; // library
import { CssBaseline, ThemeProvider } from "@mui/material"; // library
import { createTheme } from "@mui/material/styles"; // library
import { themeSettings } from "./theme"; // import file

function App() {
  const mode = useSelector((state) => state.mode); // grab the mode from our initial state
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]); // setup our theme
  const isAuth = Boolean(useSelector((state) => state.token)); // if the token exist then it is authorized to our browser

  return (
    <div className="app">
      {/* set the routing part here */}
      <BrowserRouter>
        {/* set the theme or background */}
        <ThemeProvider theme={theme}>
          {/* reset our css */}
          <CssBaseline />
          {/* url address */}
          <Routes>
            <Route path='/' element={<LoginPage />} />
            {/* <Route path='/home' element={<HomePage />} /> */}
            <Route path='/home' element={ isAuth? <HomePage /> : <Navigate to="/" />} />
            <Route path='/profile/:userId' element={ isAuth? <ProfilePage/> : <Navigate to="/" /> } />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
