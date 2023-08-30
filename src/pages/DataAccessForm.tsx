import axios from "axios";
import NavigationBar from "../components/NavigationBar";
import { useState, FormEvent } from "react";
import { RootState } from "../redux/store";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

function DataAccessForm() {
  const loggedUser = useSelector((state: RootState) => state.token);

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const { id } = useParams();

  const successUpdated = () => toast.success("Successfully updated!");
  const failUpdated = () => toast.error("Error on unpdate!");

  const handleUpdateCredentials = async (e: FormEvent) => {
    e.preventDefault();
    const response = await axios({
      headers: {
        Authorization: `Bearer ${loggedUser.token}`,
      },
      method: "patch",
      url: `${import.meta.env.VITE_APP_API_URL}/users/credentials/${id}`,
      data: {
        password,
        email,
      },
    });
    if (response.data.message === "Updated successfully!") {
      successUpdated();
      setTimeout(() => {
        navigate(-1);
      }, 3000);
    } else if (response.data.message === "Impossible to update information!") {
      failUpdated();
      setTimeout(() => {
        navigate(-1);
      }, 3000);
    }
  };

  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <>
      <NavigationBar />
      <div className="container mx-auto mt-28 ">
        <ToastContainer className="toastify--success" />
        <div className="flex">
          <div className="items-center inline">
            <i
              className="fa-solid fa-arrow-left text-3xl ml-2 hover:text-electric-blue active:scale-90"
              onClick={handleBack}
            ></i>
          </div>
          <div className="mx-auto">
            <h2 className="text-center text-4xl pb-12 mb-14">
              Edit your credentials
            </h2>
          </div>
        </div>
        <form className="px-4" onSubmit={(e) => handleUpdateCredentials(e)}>
          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="relative z-0 w-full mb-6 group">
              <input
                type="email"
                name="email"
                id="email"
                className="block py-2.5 px-0 w-full text-md text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 focus:outline-none focus:ring-0 peer"
                placeholder=" "
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label className="peer-focus:font-medium absolute text-md text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                Email
              </label>
            </div>
            <div className="relative z-0 w-full mb-6 group">
              <input
                type="password"
                name="password"
                id="password"
                className="block py-2.5 px-0 w-full text-md text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label className="peer-focus:font-medium absolute text-md text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                Password
              </label>
            </div>
          </div>
          <div className="flex justify-center mt-10">
            <button className="btn-modify-article">Confirm</button>
          </div>
        </form>
      </div>
    </>
  );
}

export default DataAccessForm;
