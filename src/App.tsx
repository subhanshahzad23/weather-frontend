import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/home";
import CitySearch from "./pages/citySearch";
import { authenticate } from "./services/auth";
import Login from "./auth/login";
import Blog from "./pages/blogs";
import News from "./pages/news";
import SignIn from "./pages/signin";
import Signup from "./pages/signup";
import BlogDetail from "./pages/blogDetail";
import NewsDetail from "./pages/newsDeatail";
import Profile from "./pages/profile";
import ResetPassword from "./pages/resetPassword";
import ForgotPassword from "./pages/forgotPassword";

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<any>(null);

  useEffect(() => {
    // Check if the user is authenticated
    const checkAuthentication = async () => {
      const authenticated = await authenticate(); // Replace with your authentication logic
      console.log("Authenticated", authenticated);
      setIsAuthenticated(authenticated);
    };

    checkAuthentication();
  }, []);

  if (isAuthenticated === null) {
    return <div></div>;
  }
  return (
    <Router >
      <Routes>
        <Route path="/" element={isAuthenticated ? <Home /> : <Navigate to="/signin" />} />
        <Route path="/blogs" element={isAuthenticated ? <Blog /> : <Navigate to="/signin" />} />
        <Route path="/blog-detail/:id" element={isAuthenticated ? <BlogDetail /> : <Navigate to="/signin" />} />
        <Route path="/news-detail/:id" element={isAuthenticated ? <NewsDetail /> : <Navigate to="/signin" />} />

        <Route path="/news" element={isAuthenticated ? <News /> : <Navigate to="/signin" />} />
        <Route path="/profile" element={isAuthenticated ? <Profile /> : <Navigate to="/signin" />} />
        <Route path="/reset-password/:email/:otp" element={<ResetPassword />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<Signup />} />

        <Route
          path="/city-search/:latitude/:longitude"
          element={isAuthenticated ? <CitySearch /> : <Navigate to="/signin" />}
        />

        {/* <Route path="/about" component={About} /> */}
        {/* <Route component={NotFound} /> */}
      </Routes>
    </Router>
  );
};

export default App;
