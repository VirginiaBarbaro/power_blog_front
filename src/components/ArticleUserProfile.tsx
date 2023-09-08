import { useEffect, useState, FormEvent } from "react";
import axios from "axios";
import { Article, ArticleProps } from "../types/article";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { toast } from "react-toastify";
import truncateText from "./utilities/truncateText";
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
import { Link } from "react-router-dom";
import { Category } from "../types/category";
import CustomLoader from "./utilities/CustomLoader";

interface ArticleUserProfileProps {
  userId: string;
}

function ArticleUserProfile({ userId }: ArticleUserProfileProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [isOpened, setIsOpened] = useState(false);

  const handleClick = () => {
    setIsOpened(true);
  };

  const handleCloseDrawer = () => {
    setIsOpened(false);
  };

  const loggedUser = useSelector((state: RootState) => state.token);

  const [userArticles, setUserArticles] = useState<ArticleProps[]>([]);

  const [deleteArticleId, setDeleteArticleId] = useState<string>("");
  const [updateArticleId, setUpdateArticleId] = useState<string>("");
  const [categories, setCategories] = useState<Category[]>([]);

  const [title, setTitle] = useState<string>("");
  const [headline, setHeadline] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [categoryId, setCategoryId] = useState<number>();
  const [image, setImage] = useState<File | null>(null);

  useEffect(() => {
    const getCategories = async () => {
      const response = await axios({
        method: "get",
        url: `${import.meta.env.VITE_APP_API_URL}/categories`,
      });
      setCategories(response.data);
    };
    getCategories();
  }, []);

  useEffect(() => {
    const getUserArticles = async () => {
      const response = await axios({
        method: "get",
        url: `${import.meta.env.VITE_APP_API_URL}/articles/user/${userId}`,
      });
      const sortedArticles = response.data.sort((a: Article, b: Article) => {
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);
        return dateB.getTime() - dateA.getTime();
      });
      setUserArticles(sortedArticles);
    };
    getUserArticles();
  }, [userId]);

  const handleUpdateArticle = async (e: FormEvent) => {
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
      url: `${import.meta.env.VITE_APP_API_URL}/articles/${updateArticleId}`,
      data: formData,
    });

    if (response) {
      toast.success("Article updated successfully!", {
        position: toast.POSITION.TOP_RIGHT,
      });
      setTimeout(() => {
        handleCloseDrawer();
        window.location.reload();
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

  return loggedUser && userArticles ? (
    <div className="sm:col-span-2">
      {userArticles.map((article: ArticleProps) => {
        return (
          <div
            className="max-w-md mx-auto rounded-xl overflow-hidden md:max-w-2xl mb-8 card-user-article "
            key={article.id}
          >
            <div className="md:flex">
              <div className="md:shrink-0">
                <Link to={`/article/${article.id}`}>
                  <img
                    className="h-48 w-full object-cover md:h-48 md:w-48"
                    src={
                      typeof article.image === "object"
                        ? `${import.meta.env.VITE_APP_IMG_URL}${
                            article.image[0]
                          }`
                        : `${import.meta.env.VITE_APP_IMG_URL}${article.image}`
                    }
                    alt="Modern building architecture"
                  />
                </Link>
              </div>
              <div className="px-4 pt-1 w-full flex flex-col justify-around">
                <Link to={`/article/${article.id}`}>
                  <div className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white pb-2">
                    {article.title}
                  </div>
                  <div className="">
                    <p className="text-dark-grey-300">
                      {truncateText(article.content, 10)}
                    </p>
                  </div>
                </Link>
                {article.userId === loggedUser.id ? (
                  <div className="mt-4 p-2 flex justify-between">
                    <button
                      onClick={() => {
                        handleClick();
                        setUpdateArticleId(article.id.toString());
                      }}
                    >
                      <i className="fa-solid fa-feather-pointed text-xl hover:text-electric-blue text-semidark-grey"></i>
                    </button>

                    {/* DRAWER EDIT ARTICLE */}

                    <Drawer
                      onClose={() => setIsOpened(false)}
                      isOpen={isOpened}
                      size="xl"
                    >
                      <DrawerOverlay />
                      <DrawerContent>
                        <DrawerCloseButton />
                        <DrawerHeader className="flex justify-between w-96">
                          <div>Edit your article ID: {updateArticleId}</div>
                        </DrawerHeader>
                        <DrawerBody>
                          <form
                            onSubmit={(e) => handleUpdateArticle(e)}
                            autoComplete="off"
                          >
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
                              <label className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
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
                              <label className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
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
                              <label className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                Content
                              </label>
                            </div>
                            <div className="relative z-0 w-full group mt-6">
                              Category:
                              <select
                                onChange={(e) => setCategoryId(+e.target.value)}
                                className="ml-3"
                              >
                                {categories.map((category) => {
                                  <span key={category.id}></span>;
                                  return (
                                    <option value={category.id}>
                                      {category.name}
                                    </option>
                                  );
                                })}
                              </select>
                            </div>
                            <div className="mt-10">
                              <input
                                type="file"
                                name="image"
                                id="image"
                                required={true}
                                onChange={handleFileChange}
                              />
                            </div>
                            <div className="flex justify-center mt-10">
                              <button className="btn-modify-article">
                                Confirm
                              </button>
                            </div>
                          </form>
                        </DrawerBody>
                      </DrawerContent>
                    </Drawer>

                    <button
                      onClick={() => {
                        onOpen();
                        setDeleteArticleId(article.id.toString());
                      }}
                    >
                      <i className="fa-regular fa-trash-can text-xl text-electric-blue hover:text-red-700"></i>
                    </button>

                    {/* MODAL CONFIRM DELETE ARTICLE */}

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
                ) : null}
              </div>
            </div>
          </div>
        );
      })}
      {userArticles.length === 0 && (
        <div className="no-favourite-article mx-8 rounded">
          <h2 className="no-favourite-article-title text-center">
            You haven't published any article yet!
          </h2>
          <h2 className="no-favourite-article-message text-center">
            Start writing articles now!
          </h2>
        </div>
      )}
    </div>
  ) : (
    <CustomLoader />
  );
}

export default ArticleUserProfile;
