import { Facebook, Github, Twitter, User } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SearchBox from "./searchComponent";

export default function Navbar(props: {
  setSelectedCountry: any;
  setCoordinates: any;
  setFinalPropData: any;
  selectedCountry: any;
  coordinates: { latitude: any; longitude: any };
}) {
  const isHome = window.location.pathname === "/";
  const homeClass = isHome ? "poppins-regular" : "poppins-regular";
  const citySearchClass = isHome ? "poppins-regular" : "poppins-regular";
  const [isUserOpen, setIsUserOpen] = useState(false);

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const navigate = useNavigate();

  const logout = () => {
    console.log("logout");
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div className="min-w-screen mb-4">
      <div
        className="flex flex-col justify-between items-center w-full p-8 md:pl-16 md:pr-16 xl:pl-40 xl:pr-40 2xl:pl-60 2xl:pr-60 reverse-schemed  "
        style={{
          backgroundImage: "linear-gradient(to right, #213547, #426179)",
        }}
      >
        <div className="flex flex-row justify-between items-center w-full ">
          <div className="flex flex-row justify-between items-center gap-4 ">
            <img src="/images/logo.png" alt="logo" className="w-12 h-12" />
            <h1 className="text-3xl  poppins-semibold cursor-pointer" onClick={()=> navigate("/")}>Weather Map</h1>
          </div>
          <nav>
            <ul className="flex flex-row justify-between items-center gap-4 ">
              {/* <li>
            <Link className={`aTag ${homeClass}`} to="/">
              Home
            </Link>
          </li>
          <hr className="rotate-90 border w-6" />
          <li>
            <Link className={`aTag ${citySearchClass}`} to="/city-search/0/0">
              City Search
            </Link>
          </li> */}
              <li className="w-full">
                <div className="w-full flex flex-row justify-between gap-4 items-center ">
                  <div className="w-9/12">
                    <SearchBox
                      setSelectedCountry={props.setSelectedCountry}
                      setCoordinates={props.setCoordinates}
                    />
                  </div>
                  <button
                    className="reverse-schemed p-2 w-3/12"
                    onClick={() => {
                      // Extract the current pathname
                      const pathname = window.location.pathname;

                      const isStaticPath = [
                        "/blogs",
                        "/news",
                        "/profile",
                      ].includes(pathname);

                      const isDynamicPath =
                        /^\/blog-detail\/.+/.test(pathname) ||
                        /^\/news-detail\/.+/.test(pathname);

                      if (isStaticPath || isDynamicPath) {
                        navigate("/");
                      }

                      props.setFinalPropData({
                        selectedLocation: props.selectedCountry,
                        latitude: props.coordinates.latitude,
                        longitude: props.coordinates.longitude,
                      });
                    }}
                  >
                    Search
                  </button>
                </div>
              </li>
              <li>
                <a
                  href="https://www.facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Facebook
                    size={30}
                    className="text-white "
                    style={{
                      opacity: 0.9,
                    }}
                  />
                </a>
              </li>
              <li>
                <a
                  href="https://www.github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github
                    size={30}
                    className="text-white "
                    style={{
                      opacity: 0.9,
                    }}
                  />{" "}
                </a>
              </li>
              <li>
                <a
                  href="https://www.twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Twitter
                    size={30}
                    className="text-white "
                    style={{
                      opacity: 0.9,
                    }}
                  />{" "}
                </a>
              </li>
            </ul>
          </nav>
          <div className="flex flex-row justify-between items-center gap-4 relative ">
            <div
              className="flex flex-col justify-between items-center gap-4"
              onMouseEnter={() => setIsUserOpen(true)}
              onMouseLeave={() => setIsUserOpen(false)}
            >
              <button className="user-button ml-8">
                <User
                  size={55}
                  className="border-2 border-white rounded-full p-2"
                />
              </button>
              {isUserOpen && (
                <div
                  className="flex flex-col justify-between items-center gap-2 absolute schemed rounded-lg p-2 mt-14 mr-4"
                  style={{
                    zIndex: 1000,
                  }}
                >
                  <button className="poppins-regular text-lg schemed w-full">
                    {user.name || "User"}
                  </button>
                  <button
                    className="poppins-regular text-lg w-full bg-red-500 text-white"
                    onClick={logout}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="w-full min-w-screen schemed  sticky top-1/2  ">
        <div
          className="flex flex-row justify-center  items-center w-full bg-white p-2 schemed scale-75  "
          style={{
            // borderBottom: "1px solid #213547",
          }}
        >
          <nav className="  ">
            <ul className="flex flex-row justify-between items-center gap-4 	">
              <li>
                <Link className={`aTagSub ${homeClass}`} to="/">
                  Home
                </Link>
              </li>
              <hr className="border-current rotate-90 border w-6" />
              <li>
                <Link
                  className={`aTagSub ${citySearchClass}`}
                  to="/city-search/0/0"
                >
                  City Search
                </Link>
              </li>
              <hr className="border-current rotate-90 border w-6" />

              <li>
                <Link className={`aTagSub ${citySearchClass}`} to="/blogs">
                  Blogs
                </Link>
              </li>

              <hr className="border-current rotate-90 border w-6" />

              <li>
                <Link className={`aTagSub ${citySearchClass}`} to="/news">
                  News
                </Link>
              </li>
              <hr className="border-current rotate-90 border w-6" />

              <li>
                <Link className={`aTagSub ${citySearchClass}`} to="/profile">
                  Profile
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}
