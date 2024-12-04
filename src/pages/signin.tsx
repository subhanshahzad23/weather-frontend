import { useState } from "react";
import image1 from "../assets/2.jpg";
import { handleLogin } from "../services/auth";
import { useNavigate } from "react-router";
import Carousel from "../elements/carousel";
import CarouselSign from "../elements/carouselSign";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [name, setName] = useState("");

  const navigate = useNavigate();
  const handleLoginClick = async (event: any) => {
    event.preventDefault();
    var res: any = await handleLogin(email, password);
    setTimeout(async () => {
      res = await handleLogin(email, password);
    }, 2000);

    console.log(res);
    if (res) {
      //   props.setPopup("");
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
        style={{
          boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.5)",
        }}
      >
        <div className="w-9/12 rounded-l-lg h-full object-cover">
          <CarouselSign />
        </div>
        <div
          className="flex flex-col justify-center items-center rounded-r-lg  w-3/12 h-full"
          style={{
            backgroundColor: "rgba(0,0,0,0.7)",
            opacity: 0.95,
          }}
        >
          <form
            action="#"
            className="flex flex-col justify-center p-4 pt-8 pb-8  items-center reverse-schemed w-full h-full  rounded-lg"
            onSubmit={handleLoginClick}
          >
            <h1 className="poppins-bold flex flex-row justify-between items-center w-full p-4">
              Login
              {/* <X className="" onClick={() => props.setPopup(false)} size={24} /> */}
            </h1>
            <div className="flex flex-col justify-center items-center w-full poppins-regular p-4">
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
            <div className="flex flex-col justify-center items-center w-full poppins-regular p-4">
              <label
                htmlFor="password"
                className="w-full poppins-regular text-lg"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="w-full xl:p-2 sm:p-1 schemed rounded-lg"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <a
                className="reverse-schemed hover:text-white text-left w-full"
                href="/forgot-password"
              >
                Forgot Password ?
              </a>
            </div>
            <div className="flex flex-col justify-center items-center w-full pl-4 pr-4 xl:pt-2 sm:pt-1">
              <button
                type="submit"
                className="w-full p-2 schemed rounded-lg poppins-bold"
              >
                Login
              </button>
            </div>
            <div className="flex flex-col justify-center items-center pl-4 pr-4 xl:pt-3 sm:pt-1">
              Want to create a account ?
              <a
                className="reverse-schemed hover:text-white "
                style={{
                  cursor: "pointer",
                  textDecoration: "underline",
                }}
                onClick={() => {
                  navigate("/signup");
                }}
              >
                Signup
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
