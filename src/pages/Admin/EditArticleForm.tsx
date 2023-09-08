import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../../components/Admin/Sidebar";
import { ToastContainer, toast } from "react-toastify";
import { useState, FormEvent } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import CustomLoader from "../../components/utilities/CustomLoader";
import useCategories from "../../hooks/useCategories";

function EditArticleForm() {
  const categories = useCategories();
  const loggedUser = useSelector((state: RootState) => state.token);

  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState<string>("");
  const [headline, setHeadline] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const [categoryId, setCategoryId] = useState<number>();

  const handleEditArticle = async (e: FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("headline", headline);
    formData.append("content", content);
    formData.append(
      "categoryId",
      categoryId !== undefined ? categoryId.toString() : ""
    );

    if (image !== null) {
      formData.append("image", image);
    }

    const response = await axios({
      headers: {
        Authorization: `Bearer ${loggedUser.token}`,
        "Content-Type": "multipart/form-data",
      },
      method: "patch",
      url: `${import.meta.env.VITE_APP_API_URL}/articles/${id}`,
      data: formData,
    });

    if (response) {
      toast.success("Article updated successfully!", {
        position: toast.POSITION.TOP_RIGHT,
      });
      setTimeout(() => {
        navigate(-1);
      }, 2000);
    } else {
      toast.error("Error updating article!", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
    }
  };

  const prevPage = () => {
    navigate(-1);
  };

  return categories ? (
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
            <h2 className="text-center text-4xl pb-12">
              Edit article ID: {id}
            </h2>
          </div>
        </div>
        <form
          className="px-4"
          onSubmit={(e) => handleEditArticle(e)}
          autoComplete="off"
        >
          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="relative z-0 w-full mb-6 group">
              <input
                type="text"
                name="title"
                id="title"
                className="block py-2.5 px-0 w-full text-md text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 focus:outline-none focus:ring-0 peer"
                placeholder=" "
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <label className="peer-focus:font-medium absolute text-md text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                Title
              </label>
            </div>
            <div className="relative z-0 w-full mb-6 group">
              <input
                type="text"
                name="headline"
                id="headline"
                className="block py-2.5 px-0 w-full text-md text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
                value={headline}
                onChange={(e) => setHeadline(e.target.value)}
              />
              <label className="peer-focus:font-medium absolute text-md text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                Headline
              </label>
            </div>
            <div className="relative z-0 w-full mb-6 group">
              <input
                type="text"
                name="content"
                id="content"
                className="block py-2.5 px-0 w-full text-md text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-electric-blue focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
              <label className="peer-focus:font-medium absolute text-md text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                Content
              </label>
            </div>
            <div className="relative z-0 w-full mb-6 group">
              <select onChange={(e) => setCategoryId(+e.target.value)}>
                {categories.map((category) => {
                  <span key={category.id}></span>;
                  return <option value={category.id}>{category.name}</option>;
                })}
              </select>
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
  ) : (
    <CustomLoader />
  );
}

export default EditArticleForm;
