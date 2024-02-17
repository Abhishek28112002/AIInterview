import React, { useState,useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import SignIn from './components/SignIn.tsx';
import SignUp from './components/SignUp.tsx';
import Home from './components/Home.tsx';
import NavigationBar from './components/NavigationBar.tsx';
import Interview from './components/Interview.tsx';
import store from './store/ConfigureStore.js';
import { Provider } from 'react-redux'
function App() {
  // Get the current location using the useLocation hook
  // const location = useLocation();
  // const [showNavigationBar,setshowNavigationBar]=useState();

  // // Define an array of paths where the NavigationBar should not be shown
  // const hiddenPaths = ['/SignIn', '/SignUp'];

  // useEffect(()=>{
  //   // Check if the current path is in the hiddenPaths array
  //   const x = !hiddenPaths.includes(location.pathname);
  //   setshowNavigationBar(x);
  // },[location.pathname])
  
  

  return (
    <Provider store={store}>
    <Router>
      {/* Conditionally render the NavigationBar */}
      {/* {showNavigationBar && <NavigationBar />} */}
      
      <Routes>
        <Route path="/SignIn" element={<SignIn />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/" exact element={<Home />} />
        <Route path="/Interview" exact element={<Interview />} />
      </Routes>
    </Router>
    </Provider>
  );
}

export default App;
