import { useState } from "react";
import image1 from "../assets/2.jpg";
import { handleLogin, sendPasswordResetEmail } from "../services/auth";
import { useNavigate } from "react-router";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [name, setName] = useState("");

  const navigate = useNavigate();
  const handleLoginClick = async (event:any) => {
    event.preventDefault();
    var res: any = await sendPasswordResetEmail(email);
    
    console.log(res);
    if (res) {
      //   props.setPopup("");
      alert("Password reset email sent");
    } else {
      alert("Failed to send password reset email");
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
        <img
          src={image1}
          loading="lazy"
          alt="background"
          className="w-9/12 rounded-l-lg h-full object-cover"
        />
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
              Forgot Passwrd
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
                className="w-full p-2 schemed rounded-lg"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="flex flex-col justify-center items-center w-full p-4">
              <button
                type="submit"
                className="w-full p-2 schemed rounded-lg poppins-bold"
              >
                Request Password Reset Email
              </button>
            </div>
            <div className="flex flex-col justify-center items-center w-full p-4">
              Remembered Password ?
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
                SignIn
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
