import { useSelector } from "react-redux/es/hooks/useSelector";
import { RootState } from "../redux/store";
import { useState, useEffect, FormEvent } from "react";
import axios from "axios";
import { ArticleProps } from "../types/article";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
} from "@chakra-ui/react";

import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react";

function InfoUserLog() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [isOpened, setIsOpened] = useState(false);

  const handleClick = () => {
    setIsOpened(true);
  };

  const handleCloseDrawer = () => {
    setIsOpened(false);
  };

  const loggedUser = useSelector((state: RootState) => state.token);
  console.log(loggedUser);

  const [userArticles, setUserArticles] = useState([]);
  const [deleteArticleId, setDeleteArticleId] = useState<string>("");
  const [updateArticleId, setUpdateArticleId] = useState<string>("");

  const [title, setTitle] = useState<string>("");
  const [headline, setHeadline] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);

  useEffect(() => {
    const getUserArticles = async () => {
      const response = await axios({
        headers: {
          Authorization: `Bearer ${loggedUser.token}`,
        },
        method: "get",
        url: `${import.meta.env.VITE_APP_API_URL}/articles/logged/${
          loggedUser.token
        }`,
      });
      setUserArticles(response.data);
    };
    getUserArticles();
  }, [loggedUser.token]);

  function truncateText(text: string, limit: number) {
    const words = text.split(" ");
    if (words.length > limit) {
      return words.slice(0, limit).join(" ") + "...";
    } else {
      return text;
    }
  }

  const handleUpdateArticle = async (e: FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("headline", headline);
    formData.append("content", content);

    if (image !== null) {
      formData.append("image", image);
    }

    await axios({
      headers: {
        Authorization: `Bearer ${loggedUser.token}`,
        "Content-Type": "multipart/form-data",
      },
      method: "patch",
      url: `${import.meta.env.VITE_APP_API_URL}/articles/${updateArticleId}`,
      data: formData,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
    }
  };

  const handleDeleteArticle = async (deleteArticleId: string) => {
    await axios({
      headers: {
        Authorization: `Bearer ${loggedUser.token}`,
      },
      method: "delete",
      url: `${import.meta.env.VITE_APP_API_URL}/articles/${deleteArticleId}`,
    });
    setUserArticles(
      userArticles.filter(
        (userArticle: ArticleProps) => userArticle.id !== +deleteArticleId
      )
    );
  };

  return (
    loggedUser &&
    userArticles && (
      <div className="sm:grid sm:grid-cols-3 px-4">
        <div className="sm:col-span-1">
          <figure className="flex flex-col items-center justify-center p-8 text-center bg-white border-gray-200 rounded-t-lg md:rounded-t-none md:rounded-tl-lg dark:bg-gray-800 dark:border-gray-700 sticky top-24 info-user-box">
            <figcaption className="flex justify-center space-x-3">
              <img
                className="rounded-full w-16 h-16 "
                src={`${import.meta.env.VITE_APP_API_URL}/${loggedUser.avatar}`}
                alt="profile picture"
              />
              <div className="font-medium dark:text-white text-left">
                <div>
                  {loggedUser.firstname} {loggedUser.lastname}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {loggedUser.username}
                </div>
                <p className="mt-4">{loggedUser.bio}</p>

                <button className="mt-4 relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-dark-grey to-semidark-grey group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:outline-none active:scale-90">
                  <span className="relative px-3 py-2 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                    Edit Profile
                  </span>
                </button>
              </div>
            </figcaption>
          </figure>
        </div>
        <div className="sm:col-span-2">
          {userArticles.map((article: ArticleProps) => {
            return (
              <div
                className="max-w-md mx-auto rounded-xl overflow-hidden md:max-w-2xl mb-8 card-user-article"
                key={article.id}
              >
                <div className="md:flex">
                  <div className="md:shrink-0">
                    <img
                      className="h-48 w-full object-cover md:h-full md:w-48"
                      src={`${
                        import.meta.env.VITE_APP_API_URL
                      }/${article.image.replace("public\\", "")}`}
                      alt="Modern building architecture"
                    />
                  </div>
                  <div className="px-4 pb-4 pt-2 w-full h-full">
                    <div className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                      {article.title}
                    </div>

                    <p className="mt-2 text-dark-grey-300">
                      {truncateText(article.content, 10)}
                    </p>
                    <div className="mt-4 p-2 flex justify-between">
                      <button
                        onClick={() => {
                          handleClick();
                          setUpdateArticleId(article.id.toString());
                        }}
                      >
                        <i className="fa-solid fa-feather-pointed text-xl hover:text-electric-blue text-semidark-grey"></i>
                      </button>

                      <Drawer
                        onClose={() => setIsOpened(false)}
                        isOpen={isOpened}
                        size="xl"
                      >
                        <DrawerOverlay />
                        <DrawerContent>
                          <DrawerCloseButton />
                          <DrawerHeader className="flex justify-between border w-96">
                            <div>Edit your article</div>
                            <div>ID: {updateArticleId}</div>
                          </DrawerHeader>
                          <DrawerBody>
                            <form onSubmit={(e) => handleUpdateArticle(e)}>
                              <div className="relative z-0 mb-8">
                                <input
                                  type="text"
                                  id="title"
                                  name="title"
                                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                  placeholder=" "
                                  value={title}
                                  onChange={(e) => setTitle(e.target.value)}
                                  required={true}
                                />
                                <label
                                  // for="floating_standard"
                                  className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                >
                                  Title
                                </label>
                              </div>
                              <div className="relative z-0 mb-8">
                                <input
                                  type="text"
                                  id="headline"
                                  name="headline"
                                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                  placeholder=" "
                                  value={headline}
                                  onChange={(e) => setHeadline(e.target.value)}
                                  required={true}
                                />
                                <label
                                  // for="floating_standard"
                                  className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                >
                                  Headline
                                </label>
                              </div>
                              <div className="relative z-0">
                                <textarea
                                  itemType="text"
                                  id="content"
                                  name="content"
                                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                  placeholder=" "
                                  value={content}
                                  onChange={(e) => setContent(e.target.value)}
                                  required={true}
                                />
                                <label
                                  // for="floating_standard"
                                  className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                >
                                  Content
                                </label>
                              </div>
                              <div className="mt-20">
                                <input
                                  type="file"
                                  name="image"
                                  id="image"
                                  required={true}
                                  onChange={handleFileChange}
                                />
                              </div>
                              <div className="flex justify-center mt-10">
                                <button
                                  className="btn-modify-article"
                                  onClick={handleCloseDrawer}
                                >
                                  Confirm
                                </button>
                              </div>
                            </form>
                          </DrawerBody>
                        </DrawerContent>
                      </Drawer>
                      {/* MODAL  */}

                      <i
                        onClick={() => {
                          onOpen();
                          setDeleteArticleId(article.id.toString());
                        }}
                        className="fa-regular fa-trash-can text-xl text-electric-blue hover:text-red-700"
                      ></i>
                      <Modal
                        onClose={onClose}
                        isOpen={isOpen}
                        isCentered
                        motionPreset="slideInBottom"
                      >
                        <ModalOverlay />
                        <ModalContent>
                          <ModalHeader>
                            Deleting article number {deleteArticleId}
                          </ModalHeader>
                          <ModalCloseButton className="hover:text-red-600 hover:bg-transparent" />
                          <ModalBody>
                            {" "}
                            Are you sure you want to delete it?
                          </ModalBody>
                          <ModalFooter>
                            <Button
                              onClick={() => {
                                handleDeleteArticle(deleteArticleId);
                                onClose();
                              }}
                              className="btn-confirm-delete"
                            >
                              Confirm
                            </Button>
                          </ModalFooter>
                        </ModalContent>
                      </Modal>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    )
  );
}

export default InfoUserLog;
