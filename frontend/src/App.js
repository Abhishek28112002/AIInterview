import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Outlet, Route } from "react-router-dom";
import SignIn from "./pages/SignIn";
import Home from "./pages/Home";
import Answers from "./pages/Answers";
import Interview from "./pages/Interview";
import store from "./store";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ErrorModal, LoadingModal } from "./components/Modal";
import { GuestRoute, ProtectedRoute } from "./components/RouteGuards";
function App() {
  const queryClient = new QueryClient();

  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <LoadingModal />
          <ErrorModal />
          <Routes>
            <Route
              path="/"
              element={
                <GuestRoute>
                  <Outlet />
                </GuestRoute>
              }
            >
              <Route path="/login" index element={<SignIn />} />
            </Route>
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Outlet />
                </ProtectedRoute>
              }
            >
              <Route path="/home" element={<Home />} />
              <Route path="/interview" element={<Interview />} />
              <Route path="/answers" element={<Answers />} />
            </Route>
          </Routes>
        </Provider>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
