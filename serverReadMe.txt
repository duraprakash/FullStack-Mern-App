
 01. mkdir serve
 02. cd server
 03. npm i -g nodemon
 04. npm i express body-parser bcrypt cors dotenv gridfs-stream multer multer-gridfs-storage helmet morgan jsonwebtoken mongoose
 05. npm init -y
 06. setup mongoose db connection and database
    ==> Add your mongodb connection string into your application code in a separate file .env
    MONGO_URL=your_mongodb
    PORT=3001

    example:
    
    MONGO_URL=mongodb+srv://username:password@cluster1.tv7cp.mongodb.net/<dbname>?retryWrites=true&w=majority"
    PORT=3001

    Note: ==> replace username and password with your mongodb username and password

    run ==> nmp start [ at this time  your mongodb should be connected to port: 3001 or 6001 ]

 07. create a separate model folder where your models are kept -> User.js [model]
 08. create an auth.js under controllers folder
 09. create a separate public\assets folder to store you images
 10. create a front-end UI [not done]
 11. edit index.js [entry point]]
 12. create a separate routes folder and add auth.js file [route]
 13. create a separate middleware folder and add auth.js file [token]
 14. dummy data located in index.js of data folder [dummy data]


// client part
 01. npx create-react-app client
 02. npm i -g npx [if npx is not installed]
 03. cd client
 04. npm i react-redux @reduxjs/toolkit redux-persist react-dropzone dotenv formik yup react-router-dom@6  @mui/material @emotion/react @emotion/styled
    // libraries 
    react-redux => state management tool
    @reduxjs/toolkit => easy use of redux, wrapper
    redux-persiste => store the state in local storage like storing token in local storage
    react-dropzone => handle file upload/download in the front-end and send it to backend
    dotenv => environment variable // highly sensitive info
    formik => form handeling
    yup => validation
    react-router-dom@6 => handle react routing, route/pages
    @mui/material @emotion/react @emotion/styled => for front-end design icon, style, etc
 
      run ==> npm start 

 05. inside public folder add assest folder containing your images
 06. delete setupTests.js, reportWebVitals.js, logo.svg, App.test.js, App.css
 07. inside src folder in index.js
    remove ==> reportWebVitals();
    remove ==> import reportWebVitals from './reportWebVitals';
 08. inside src folder in App.js
    remove ==> <header>Every inside header....</header>
    lowercase ==> className="App"; to className="app";
    remove ==> import logo from './logo.svg';
    remove ==> import './App.css';
 09. inside src folder in index.css
    remove ==> remove everything
    add ==> rubik fonts from google fonts [this one is tricky]
      like this => @import url("https://fonts.googleapis.com/css2?family=Rubik:wght@400;500;700&display=swap");
    add ==> html, body, #root, .app { height: 100%; width: 100%; font-family: "Rubik", sans-serif; }
 10. add jsonfig.json file
    add => 
    {
      "compilerOptions": {
        "baseUrl": "src"
      },
      "include": ["src"]
    }
   
 11. inside src folder
    add folder ==> components
    add folder ==> scenes [add folders => homePage, loginPage, navbar, profilePage, widgets]
    add folder ==> state
    add file ==> theme.js 


