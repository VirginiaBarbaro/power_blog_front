import { Link } from "react-router-dom";
import "../style/authForm.css";

function SignUp() {
  return (
    <div className="mx-auto flex justify-center items-center h-screen hero-image">
      <div className="login-box rounded mx-auto">
        <div className=" mb-10 ">
          <h2 className="text-white text-2xl">Don't have an account ?</h2>
          <div className="flex justify-between pt-6">
            <Link to={"/login"}>
              <p className="text-white uppercase">Login</p>
            </Link>
            <span className="text-white">or</span>
            <p className="text-electric-blue border-solid border-b-2 pb-1 border-electric-blue uppercase">
              Signup
            </p>
          </div>
        </div>
        <form>
          <div className="user-box grid md:grid-cols-2 md:gap-6">
            <div className="user-box">
              <input
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                type="text"
                name="firstname"
                id="firstname"
                required={true}
              />
              <label>Firstname</label>
            </div>
            <div className="user-box">
              <input
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                type="text"
                name="lastname"
                id="lastname"
                required={true}
              />
              <label>Lastname</label>
            </div>
            <div className="user-box">
              <input
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                type="text"
                name="username"
                id="username"
                required={true}
              />
              <label>Username</label>
            </div>
            <div className="user-box">
              <input
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                type="text"
                name="email"
                id="email"
                required={true}
              />
              <label>Email</label>
            </div>
            <div className="user-box">
              <input
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                type="password"
                name="password"
                id="password"
                required={true}
              />
              <label>Password</label>
            </div>
            <center>
              <button className="signin-btn">
                Sign up
                <span></span>
              </button>
            </center>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
