import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../../components/Admin/Sidebar";
import { ToastContainer, toast } from "react-toastify";
import { useState, FormEvent } from "react";
import axios from "axios";
import useLoggedUser from "../../hooks/useLoggedUser";

function EditUserForm() {
  const loggedUser = useLoggedUser();

  const { id } = useParams();
  const navigate = useNavigate();

  const [firstname, setFirstname] = useState<string>("");
  const [lastname, setLastname] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [bio, setBio] = useState<string>("");
  const [avatar, setAvatar] = useState<File | null>(null);

  const handleEditData = async (e: FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("firstname", firstname);
    formData.append("lastname", lastname);
    formData.append("username", username);
    formData.append("bio", bio);

    if (avatar !== null) {
      formData.append("avatar", avatar);
    }

    const response = await axios({
      headers: {
        Authorization: `Bearer ${loggedUser.token}`,
        "Content-Type": "multipart/form-data",
      },
      method: "patch",
      url: `${import.meta.env.VITE_APP_API_URL}/users/${id}`,
      data: formData,
    });

    if (response) {
      toast.success("Profile updated successfully!", {
        position: toast.POSITION.TOP_RIGHT,
      });
      setTimeout(() => {
        navigate(-1);
      }, 2000);
    } else {
      toast.error("Error updating profile!", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatar(file);
    }
  };

  const prevPage = () => {
    navigate(-1);
  };

  return (
    <>
      <Sidebar />
      <div className="container mx-auto mt-28 ">
        <div className="flex">
          <div className="items-center inline">
            <i
              className="fa-solid fa-arrow-left text-3xl ml-2 hover:text-electric-blue active:scale-90"
              onClick={prevPage}
            ></i>
          </div>
          <div className="mx-auto">
            <h2 className="text-center text-4xl pb-12">Edit user ID: {id}</h2>
          </div>
        </div>
        <form
          className="px-4"
          onSubmit={(e) => handleEditData(e)}
          autoComplete="off"
        >
          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="relative z-0 w-full mb-6 group">
              <input
                type="text"
                name="firstname"
                id="firstname"
                className="block py-2.5 px-0 w-full text-md text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 focus:outline-none focus:ring-0 peer"
                placeholder=" "
                required
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
              />
              <label className="peer-focus:font-medium absolute text-md text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                Firstname
              </label>
            </div>
            <div className="relative z-0 w-full mb-6 group">
              <input
                type="text"
                name="lastname"
                id="lastname"
                className="block py-2.5 px-0 w-full text-md text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
              />
              <label className="peer-focus:font-medium absolute text-md text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                Lastname
              </label>
            </div>
            <div className="relative z-0 w-full mb-6 group">
              <input
                type="text"
                name="username"
                id="username"
                className="block py-2.5 px-0 w-full text-md text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-electric-blue focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <label className="peer-focus:font-medium absolute text-md text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                Username
              </label>
            </div>
            <div className="relative z-0 w-full mb-6 group">
              <input
                type="text"
                name="bio"
                id="bio"
                className="block py-2.5 px-0 w-full text-md text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              />
              <label className="peer-focus:font-medium absolute text-md text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                Bio
              </label>
            </div>
            <div className="relative z-0 w-full mb-6 group">
              <input
                type="file"
                name="avatar"
                id="avatar"
                onChange={handleFileChange}
              />
            </div>
          </div>
          <div className="flex justify-center mt-10">
            <button className="btn-modify-article">Confirm</button>
          </div>
        </form>
        <ToastContainer />
      </div>
    </>
  );
}

export default EditUserForm;
