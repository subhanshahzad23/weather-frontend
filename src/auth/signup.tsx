import { useState } from "react";
import { handleSignup } from "../services/auth";

export default function Signup(props: { setPopup: any }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleSignupClick = async () => {
    console.log("signup clicked");
    const res = await handleSignup(name, email, password);
    if (res) {
      console.log("Signup successful");
      props.setPopup("");
      window.location.href = "/";
    } else {
      alert("Signup failed");
    }
  };

  return (
    <div
      className="flex flex-col justify-center items-center w-screen h-screen schemed absolute "
      style={{
        backgroundColor: "rgba(0,0,0,0.7)",
        zIndex: 1000,
        opacity: 0.95,
      }}
    >
      <form
        action="#"
        className="flex flex-col justify-center items-center reverse-schemed p-4 pt-12 pb-12 w-1/6  rounded-lg"
        style={{
          boxShadow: "0 0 2px 2px #213547",
        }}
      >
        <h1 className="poppins-bold flex flex-row justify-between items-center w-full p-4">
          Sign-Up
          {/* <X className="" onClick={() => props.setPopup(false)} size={24} /> */}
        </h1>
        <div className="flex flex-col justify-center items-center w-full poppins-regular p-4">
          <label htmlFor="name" className="w-full poppins-regular text-lg ">
            Full Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="w-full p-2 schemed rounded-lg"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="flex flex-col justify-center items-center w-full poppins-regular p-4">
          <label htmlFor="email" className="w-full poppins-regular text-lg ">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full p-2 schemed rounded-lg"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="flex flex-col justify-center items-center w-full poppins-regular p-4">
          <label htmlFor="password" className="w-full poppins-regular text-lg">
            Password (Min 6 characters)
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="w-full p-2 schemed rounded-lg"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="flex flex-col justify-center items-center w-full p-4">
          <button
            type="submit"
            onClick={handleSignupClick}
            className="w-full p-2 schemed rounded-lg poppins-bold"
          >
            Sign Up
          </button>
        </div>
        <div className="flex flex-col justify-center items-center w-full p-4">
          Already have a account ?
          <a
            className="reverse-schemed hover:text-white "
            style={{
              cursor: "pointer",
              textDecoration: "underline",
            }}
            onClick={() => props.setPopup("login")}
          >
            Login
          </a>
        </div>
      </form>
    </div>
  );
}
