"use client";
import { backendURL } from "./backendURL";

const URL = backendURL + "/auth";

import axios from "axios";

export const handleLogin = async (email: string, password: string) => {
  try {
    
    const response = await axios.post(URL + "/login", { email, password });
    // Save the token to local storage or handle it as needed
    localStorage.setItem("token", JSON.stringify(response.data.token));

    console.log("Login successful", response.data);

    if (response.status === 200) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.error("Error during login:", err);
    return false;
  }
};

export const handleSignup = async (
  name: string,
  email: string,
  password: string
) => {
  try {
    const response = await axios.post(URL + "/signup", {
      name,
      email,
      password,
    });
    // Save the token to local storage or handle it as needed
    localStorage.setItem("token", JSON.stringify(response.data.token));
    console.log("Signup successful", response.data);
    if (response.status === 201) {
      
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.error("Error during login:", err);
    return false;
  }
};

export const authenticate = async () => {
  try {
    const token = JSON.parse(localStorage.getItem("token") || "{}");
    if (token) {
      const response = await axios.post(URL + "/authenticate", { token });
      console.log("Authentication successful", response.data, response.status);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      if (response.status === 200) {
        return true;
      } else {
        return false;
      }
    } else {
      console.error("No token found");
      return false;
    }
  } catch (err) {
    console.error("Error during authentication:", err);
    return false;
  }
};

export const profile = async (mail: string) => {
  try {
    const response = await axios.get(URL + "/user/" + mail);
    console.log("Authentication successful", response.data, response.status);
    localStorage.setItem("user", JSON.stringify(response.data.user));
    if (response.status === 200) {
      return response.data.user;
    } else {
      return false;
    }
  } catch (err) {
    console.error("Error during authentication:", err);
    return false;
  }
};

export const sendPasswordResetEmail = async (email: string) => {
  try {
    const response = await axios.post(URL + "/passwordChangeRequest", {
      email,
    });
    console.log("Password reset email sent", response.data);
    if (response.status === 200) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.error("Error sending password reset email:", err);
    return false;
  }
};

export const resetPassword = async (
  email: string,
  otp: string,
  password: string
) => {
  try {
    const response = await axios.post(URL + "/passwordChange", {
      email,
      password,
      otp,
      
    });
    console.log("Password reset successful", response.data);
    if (response.status === 200) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.error("Error resetting password:", err);
    return false;
  }
};
