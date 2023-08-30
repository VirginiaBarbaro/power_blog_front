import { Link, useNavigate } from "react-router-dom";
import "../style/authForm.css";
import { useState, FormEvent } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function SignUp() {
  const [firstname, setFirstname] = useState<string>("");
  const [lastname, setLastname] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [bio, setBio] = useState<string>("");
  const [avatar, setAvatar] = useState<File | null>(null);
  const [password, setPassword] = useState<string>("");

  const existingEmail = () => toast.error("This email already exist!");
  const userCreated = () => toast.success("User successfully created");

  const navigate = useNavigate();

  const handleCreateUser = async (e: FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("firstname", firstname);
    formData.append("lastname", lastname);
    formData.append("username", username);
    formData.append("bio", bio);
    formData.append("email", email);
    formData.append("password", password);

    if (avatar !== null) {
      formData.append("avatar", avatar);
    }

    const response = await axios({
      headers: {
        "Content-Type": "multipart/form-data",
      },
      method: "post",
      url: `${import.meta.env.VITE_APP_API_URL}/users`,
      data: formData,
    });

    if (response.data.message === "Email already exist!") {
      return existingEmail();
    } else if (response.data.message === "User successfully created") {
      userCreated();
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    }
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatar(file);
    }
  };

  return (
    <>
      <ToastContainer className="toastify--error" />
      <div className="mx-auto flex justify-center items-center h-screen hero-image">
        <div className="login-box rounded mx-auto w-full container">
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
          <form onSubmit={(e) => handleCreateUser(e)}>
            <div className="user-box grid md:grid-cols-2 md:gap-6">
              <div className="user-box">
                <input
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer singup-field"
                  type="text"
                  name="firstname"
                  id="firstname"
                  value={firstname}
                  onChange={(e) => setFirstname(e.target.value)}
                  required
                />
                <label>Firstname</label>
              </div>
              <div className="user-box">
                <input
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer singup-field"
                  type="text"
                  name="lastname"
                  id="lastname"
                  onChange={(e) => setLastname(e.target.value)}
                  value={lastname}
                  required
                />
                <label>Lastname</label>
              </div>
              <div className="user-box">
                <input
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer singup-field"
                  type="text"
                  name="username"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
                <label>Username</label>
              </div>
              <div className="user-box">
                <input
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer singup-field"
                  type="text"
                  name="bio"
                  id="bio"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  required
                />
                <label>Bio</label>
              </div>
              <div className="user-box">
                <input
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer singup-field"
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
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
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <label>Password</label>
              </div>
              <div>
                <input
                  type="file"
                  name="avatar"
                  id="avatar"
                  onChange={handleFileChange}
                  style={{ color: "white" }}
                ></input>
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
    </>
  );
}

export default SignUp;
