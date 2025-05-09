import { useEffect, useState } from "react";
import LeftPage from "./LeftPage";
import { Link, useNavigate } from "react-router-dom";
import LoginRegisterTab from "./LoginRegisterTab";
import TextField from "@mui/material/TextField";
import "./login.css";
import { axiosRequest } from "../../axios";
import { Loader } from "./Loader";
import { useIsUserAuthenticated } from "./useIsUserAuthenticated";
import { useGlobalContext } from "../Context";
import login_Logo from "../../../public/login_Logo.png";
import login_forLogout from "../../../public/login_forLogout.png";
import Swal from "sweetalert2";

const Login = () => {
  const [loading, setLoading] = useState(true);

  const [email, setEmail] = useState("demo@doggo.com");
  const [password, setPassword] = useState("test1234");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const { setUserData } = useGlobalContext();

  const navigate = useNavigate();
  const isUserAuthenticated = useIsUserAuthenticated();

  const handleEmailChange = (event) => {
    const inputValue = event.target.value;
    setEmail(inputValue);
    setEmailError(!isValidEmail(inputValue));
  };

  const handlePasswordChange = (event) => {
    const inputValue = event.target.value;
    setPassword(inputValue);
    setPasswordError(inputValue.length < 6);
  };

  const isValidEmail = (email) => {
    // ตรวจสอบว่า email มีรูปแบบที่ถูกต้องหรือไม่
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
  };
  const handleSubmit = (e) => {
    // ตรวจสอบ validation ก่อนที่จะทำการ submit หรือต้องการทำอย่างอื่น
    setEmailError(!isValidEmail(email));
    setPasswordError(password.length < 6);
    e.preventDefault();

    if (!isValidEmail(email) || password.length < 6) {
      // ไม่ผ่าน validation
      // สามารถทำอย่างอื่นที่ต้องการ, เช่น alert('Please enter valid inhtmlFormation');
    } else {
      // ผ่าน validation
      axiosRequest
        .post("/login", {
          email,
          password,
        })
        .then((res) => {
          setUserData(res.data);
          navigate("/home");
        })
        .catch((err) => {
          console.log(err);
          const response = err.response.data;
          Swal.fire({
            iconHtml: `<img src=${login_forLogout}>`,
            text: response.error.message,
            customClass: {
              icon: "no-border",
            },
            confirmButtonColor: "#3085d6",
            confirmButtonText: "OK",
          });
        });
    }
  };

  if (isUserAuthenticated === undefined) {
    return <Loader />;
  } else if (isUserAuthenticated) {
    navigate("/home");
    return <></>;
  }

  return (
    <div className="flex">
      <LeftPage />
      <div className="flex-1 max-md:bg-none md:bg-cover bg-theme-right">
        <form action="#" className="flex flex-col h-dvh md:flex-none">
          <div className="my-5 md:mt-auto flex-1 md:flex-none">
            <div className="md:hidden">
              <img className="w-1/3 mx-auto" src={login_Logo} />
            </div>

            <LoginRegisterTab currentUrl={"/login"} />

            <div className="text-center text-blue-950 hidden md:block">
              <h1 className="font-semibold text-2xl mb-5">Login</h1>
            </div>

            <div className="m-auto flex-1 w-4/5 mt-10">
              <label className="font-semibold mx-3 " htmlFor="input-email">
                Email address
              </label>
              <TextField
                className="w-full bg-white"
                id="input-email"
                variant="outlined"
                type="email"
                placeholder="SiberianWhisky@gmail.com"
                error={emailError}
                value={email}
                helperText={
                  emailError ? "Please enter a valid email address." : ""
                }
                sx={{ marginBottom: 2, borderRadius: 1 }}
                onChange={handleEmailChange}
              />
              <label className="font-semibold mx-3" htmlFor="input-password">
                Password
              </label>
              <TextField
                className="w-full bg-white "
                id="input-password"
                variant="outlined"
                type="password"
                placeholder="**********"
                error={passwordError}
                value={password}
                helperText={passwordError ? "Please enter a  password." : ""}
                sx={{ marginBottom: 2, borderRadius: 1 }}
                onChange={handlePasswordChange}
              />

              <Link
                to={"/forget-password"}
                className="forget-password text-sky-400 hover:text-[#4ccee8] font-semibold flex justify-end mt-3"
              >
                Forget Password?
              </Link>
              <br />
            </div>
          </div>
          <div className="mb-10 md:mb-auto">
            <div>
              <button
                onClick={handleSubmit}
                type="submit"
                className="w-4/5 block m-auto p-3 rounded-xl bg-[#66d2e8] hover:bg-[#39bad4] font-bold text-md text-white text-center"
              >
                Login
              </button>
            </div>
            <div className="hidden md:block mt-10 mx-10 text-sm text-blue-950 text-center">
              <p>
                Not a registered user yet?
                <Link to={"/register"} className="font-semibold ml-1">
                  Sign up now!
                </Link>
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
