import { Link, useNavigate } from "react-router-dom";
import { FormEvent, useState } from "react";
import "../style/authForm.css";
import { useDispatch, useSelector } from "react-redux";
import { setToken } from "../redux/slices/tokenSlice";
import { RootState } from "../redux/store";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const invalidCredentials = () => toast.error("Invalid Credentials!");

  const token = useSelector((state: RootState) => state.token);

  const handleUserLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await axios({
        headers: {
          Authorization: `bearer: ${token}`,
        },
        method: "post",
        url: `${import.meta.env.VITE_APP_API_URL}/auth/users`,
        data: {
          email,
          password,
        },
      });

      if (response.data.message === "Invalid credentials") {
        invalidCredentials();
      } else {
        dispatch(setToken(response.data));
        navigate("/home");
      }
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="mx-auto flex justify-center items-center h-screen hero-image">
        <div className="login-box rounded mx-auto login-box-mediaquery">
          <div className=" mb-10">
            <h2 className="text-white text-2xl">Have an account ?</h2>
            <div className="flex justify-between pt-6">
              <p className="text-electric-blue border-solid border-b-2 pb-1 border-electric-blue uppercase">
                Login
              </p>
              <span className="text-white">or</span>
              <Link to={"/signup"}>
                <p className="text-white uppercase">Signup</p>
              </Link>
            </div>
          </div>
          <form onSubmit={(event) => handleUserLogin(event)}>
            <div className="user-box grid md:grid-cols-2 md:gap-6">
              <div className="user-box">
                <input
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer singup-field"
                  type="text"
                  name="email"
                  id="email"
                  required={true}
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
                <label>Email</label>
              </div>
              <div className="user-box">
                <input
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer singup-field"
                  type="password"
                  name="password"
                  id="password"
                  value={password}
                  required={true}
                  onChange={(event) => setPassword(event.target.value)}
                />
                <label>Password</label>
              </div>
            </div>
            <center className="">
              <button className="signin-btn">
                Sign in
                <span></span>
              </button>
            </center>
          </form>
          <ToastContainer className="toastify--error" />
        </div>
      </div>
    </>
  );
}

export default SignIn;
