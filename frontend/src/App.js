import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from './components/SignIn.tsx';
import SignUp from './components/SignUp.tsx';
import Home from './components/Home.tsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/SignIn" element={<SignIn />}/>
      <Route path="/SignUp"  element={<SignUp />}  />
      <Route path="/" exact element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
