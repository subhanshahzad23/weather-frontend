import { useState } from "react";
import image1 from "../assets/1.jpg";
import { handleLogin, handleSignup } from "../services/auth";
import { useNavigate } from "react-router";
import CarouselSign from "../elements/carouselSign";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [checkBox, setCheckBox] = useState(false);
  const navigate = useNavigate();

  const handleSignupClick = async (event: any) => {
    event.preventDefault();
    console.log("signup clicked");
    const res = await handleSignup(name, email, password);
    if (res) {
      console.log("Signup successful");
      // props.setPopup("");
      navigate("/");
      window.location.pathname = "/";
    } else {
      alert("Please enter correct Email and Password");

    }
  };

  return (
    <div
      className=" bg-gray-300  p-24"
      style={{ height: "100vh", width: "100vw", overflowX: "hidden" }}
    >
      <div
        className="schemed  z-40 flex flex-row justify-center items-center w-full h-full shadow-lg rounded-lg p-0"
        id="parent"
        style={{
          boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.5)",
        }}
      >
        <div className="w-9/12 rounded-l-lg h-full object-cover" id="carousel">
          <CarouselSign />
        </div>
        <div
          id="signupForm"
          className="flex flex-col justify-center items-center rounded-r-lg  w-3/12 h-fit-content "
          style={{
            backgroundColor: "rgba(0,0,0,0.7)",
          }}
        >
          <form
            action="#"
            className="flex flex-col  justify-center items-center reverse-schemed p-4 h-full w-full  rounded-lg "
          >
            <h1 className="poppins-bold flex flex-row justify-between items-center w-full xl:p-4 sm:p-4 sm:text-2xl xl:text-3xl	">
              Sign-Up
              {/* <X className="" onClick={() => props.setPopup(false)} size={24} /> */}
            </h1>
            <div className="flex flex-col justify-center items-center w-full poppins-regular p-2">
              <label htmlFor="name" className="w-full poppins-regular text-lg ">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full xl:p-2 sm:p-1 schemed rounded-lg"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="flex flex-col justify-center items-center w-full poppins-regular p-2">
              <label
                htmlFor="email"
                className="w-full poppins-regular text-lg "
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full xl:p-2 sm:p-1 schemed rounded-lg"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex flex-col justify-center items-center w-full poppins-regular p-2">
              <label
                htmlFor="password"
                className="w-full poppins-regular text-lg"
              >
                Password (Min 6 characters)
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="w-full xl:p-2 sm:p-1 schemed rounded-lg"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="checkBox"
                name="checkBox"
                className="p-2"
                checked={checkBox}
                onChange={(e) => setCheckBox(e.target.checked)}
              />
              <label htmlFor="checkBox" className="poppins-regular text-sm">
                I agree to the terms and conditions
              </label>
            </div>
            <div className="flex flex-col justify-center items-center w-full xl:p-3 sm:p-2">
              <button
                type="submit"
                onClick={handleSignupClick}
                disabled={!checkBox}
                className="w-full xl:p-2 sm:p-1 schemed rounded-lg poppins-bold"
              >
                Sign Up
              </button>
            </div>
            <div className="flex flex-col justify-center items-center w-full xl:p-3 sm:p-2">
              Already have a account ?
              <a
                className="reverse-schemed hover:text-white "
                style={{
                  cursor: "pointer",
                  textDecoration: "underline",
                }}
                onClick={() => {
                  navigate("/signin");
                }}
              >
                Login
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
