import { useState } from "react";
import { handleLogin } from "../services/auth";
import { X } from "lucide-react";

export default function Login(props: { setPopup: any }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [name, setName] = useState("");
  const handleLoginClick = async () => {
    var res: any = await handleLogin(email, password);
    setTimeout(async() => {
      res = await handleLogin(email, password);
    }, 2000);

    console.log(res);
    if (res) {
      props.setPopup("");
      window.location.href = "/";
    } else {
      alert("Login failed");
    }

    setShowPopup(true);
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
        onSubmit={handleLoginClick}
      >
        <h1 className="poppins-bold flex flex-row justify-between items-center w-full p-4">
          Login
          {/* <X className="" onClick={() => props.setPopup(false)} size={24} /> */}
        </h1>
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
            Password
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
            className="w-full p-2 schemed rounded-lg poppins-bold"
          >
            Login
          </button>
        </div>
        <div className="flex flex-col justify-center items-center w-full p-4">
          Want to create a account ?
          <a
            className="reverse-schemed hover:text-white "
            style={{
              cursor: "pointer",
              textDecoration: "underline",
            }}
            onClick={() => props.setPopup("signup")}
          >
            Signup
          </a>
        </div>
      </form>
    </div>
  );
}
