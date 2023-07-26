import { useState, useEffect, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Avatar, Dropdown } from "flowbite-react";
import { Navbar } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { setToken } from "../redux/slices/tokenSlice";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

function NavigationBar() {
  const [isScrolling, setIsScrolling] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [headline, setHeadline] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);

  const loggedUser = useSelector((state: RootState) => state.token);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(setToken({ token: null, user: null }));
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScroll = () => {
    if (window.scrollY === 0) {
      setIsScrolling(false);
    } else {
      setIsScrolling(true);
    }
  };

  const { isOpen, onOpen, onClose } = useDisclosure();

  const articleCreated = () => toast.success("The article has been created!");

  const handleCreateArticle = async (e: FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("headline", headline);
    formData.append("content", content);

    if (image !== null) {
      formData.append("image", image);
    }

    const response = await axios({
      headers: {
        Authorization: `Bearer ${loggedUser.token}`,
        "Content-Type": "multipart/form-data",
      },
      method: "post",
      url: `${import.meta.env.VITE_APP_API_URL}/articles`,
      data: formData,
    });
    if (response.data.message === "Article successflly created") {
      articleCreated();
      setTimeout(() => {
        navigate(`/profile/${loggedUser.id}`);
      }, 3000);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
    }
  };

  return (
    loggedUser && (
      <>
        <Navbar
          className={`dark:bg-gray-900 fixed w-full z-20 top-0 left-0 py-1  ${
            isScrolling ? "navbar-dynamic" : "bg-navbar"
          } navbar navbar-expand-md bg-dark-blue flex justify-between`}
        >
          <ToastContainer className="toastify--success" />
          <div className="container max-w-screen-xl flex flex-wrap p-1 justify-between">
            <Link to={"/home"} className="flex mt-3">
              <img
                src="/blog_logo.png"
                className="h-10 w-28 object-cover"
                alt="Power Blog Logo"
              />
            </Link>
            <div className="flex">
              <Navbar.Collapse>
                <div
                  className="items-center justify-between w-full md:flex md:w-auto mt-1"
                  id="navbar-sticky"
                >
                  <ul className="text-lg flex flex-col p-4 md:p-0 font-semibold rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700 text-dark-blue">
                    <Link
                      to="/home"
                      className="element-navbar block md:bg-transparent py-2 pl-3 pr-4 md:p-0"
                    >
                      Home
                    </Link>
                    <Link
                      to="#"
                      className="element-navbar block md:bg-transparent py-2 pl-3 pr-4 md:p-0"
                    >
                      Categories
                    </Link>
                    <li
                      onClick={onOpen}
                      className="element-navbar block md:bg-transparent py-2 pl-3 pr-4 md:p-0 cursor-pointer"
                    >
                      Post
                    </li>
                    <Modal
                      blockScrollOnMount={false}
                      isOpen={isOpen}
                      onClose={onClose}
                      size={"3xl"}
                    >
                      <ModalOverlay />
                      <ModalContent>
                        <ModalHeader>Create Article</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                          <form onSubmit={(e) => handleCreateArticle(e)}>
                            <div>
                              <div className="relative z-0 w-full mb-8 group">
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
                              <div className="relative z-0 w-full mb-8 group">
                                <input
                                  type="text"
                                  name="headline"
                                  id="headline"
                                  className="block py-2.5 px-0 w-full text-md text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 focus:outline-none focus:ring-0 peer"
                                  placeholder=" "
                                  required
                                  value={headline}
                                  onChange={(e) => setHeadline(e.target.value)}
                                />
                                <label className="peer-focus:font-medium absolute text-md text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                  Headline
                                </label>
                              </div>
                              <div className="relative z-0 w-full mb-8 group">
                                <textarea
                                  name="content"
                                  id="content"
                                  className="block py-2.5 px-0 w-full text-md text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 focus:outline-none focus:ring-0 peer"
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
                                <input
                                  type="file"
                                  name="image"
                                  id="image"
                                  onChange={handleFileChange}
                                />
                              </div>
                              <div className="flex justify-center my-10">
                                <button className="btn-modify-article">
                                  Confirm
                                </button>
                              </div>
                            </div>
                          </form>
                        </ModalBody>
                      </ModalContent>
                    </Modal>
                  </ul>
                </div>
              </Navbar.Collapse>
            </div>
            <div className="flex justify-center">
              <div className="mt-3">
                <Navbar.Toggle />
              </div>
              <Dropdown
                // inline
                label={
                  <Avatar
                    alt="User avatar"
                    img={
                      loggedUser.token
                        ? `${
                            import.meta.env.VITE_APP_API_URL
                          }${loggedUser.avatar.replace("public", "")}`
                        : "/no_login.png"
                    }
                    rounded
                  />
                }
              >
                {loggedUser.token ? (
                  <>
                    <Dropdown.Header>
                      <span className="block text-sm">
                        {loggedUser.username}
                      </span>
                      <span className="block truncate text-sm font-medium">
                        {loggedUser.email}
                      </span>
                    </Dropdown.Header>
                    <Link to={`/profile/${loggedUser.id}`}>
                      <Dropdown.Item>Profile</Dropdown.Item>
                    </Link>
                    <Link to={"/favourite/article"}>
                      <Dropdown.Item>Saved</Dropdown.Item>
                    </Link>
                    <Dropdown.Divider />
                    <Dropdown.Item onClick={handleLogout}>
                      Sign out
                    </Dropdown.Item>
                  </>
                ) : (
                  <>
                    <Link to={"/login"}>
                      <Dropdown.Item>Login</Dropdown.Item>
                    </Link>
                    <Link to={"/signup"}>
                      <Dropdown.Item>Sign up</Dropdown.Item>
                    </Link>
                  </>
                )}
              </Dropdown>
            </div>
          </div>
        </Navbar>
      </>
    )
  );
}

export default NavigationBar;
