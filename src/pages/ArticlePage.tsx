import { useEffect, useState, FormEvent } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { ArticleProps, FavouriteArticle } from "../types/article";
import NavigationBar from "../components/NavigationBar";
import { CommentProps } from "../types/comment";
import { formatDistanceToNow } from "date-fns";
import { ToastContainer, toast } from "react-toastify";
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import Footer from "../components/Footer";
import CustomLoader from "../components/utilities/CustomLoader";

function ArticlePage() {
  const loggedUser = useSelector((state: RootState) => state.token);

  const [isOpening, setIsOpening] = useState(false);

  const commentCreated = () => toast.success("Comment published successfully!");

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleClick = () => {
    setIsOpening(true);
  };

  const { id } = useParams();

  const [comments, setComments] = useState<CommentProps[]>([]);
  const [isFavourite, setIsFavourite] = useState<boolean>(false);
  const [article, setArticle] = useState<ArticleProps>();
  const [content, setContent] = useState<string>("");

  useEffect(() => {
    const getArticleInfo = async () => {
      const response = await axios({
        method: "get",
        url: `${import.meta.env.VITE_APP_API_URL}/articles/${id}`,
      });
      setArticle(response.data);
    };
    getArticleInfo();
  }, [id]);

  useEffect(() => {
    const getComments = async () => {
      const response = await axios({
        method: "get",
        url: `${import.meta.env.VITE_APP_API_URL}/comments/article/${id}`,
        params: {
          articleId: id,
        },
      });
      setComments(response.data);
    };
    getComments();
  }, [id]);

  const navigate = useNavigate();
  const saved = () => toast.success("Article save as a favourite!");
  const unsaved = () =>
    toast.success("Article has been removed as a favourite!");

  const handleSaveArticleAsFavourite = async (id: number) => {
    try {
      const response = await axios({
        headers: {
          Authorization: `Bearer ${loggedUser.token}`,
        },
        method: "post",
        url: `${import.meta.env.VITE_APP_API_URL}/favourites/${id}`,
      });
      setIsFavourite(!isFavourite);

      if (response.data.message === "Article succesffully saved!") {
        saved();
        setTimeout(() => {
          navigate("/favourite/article");
        }, 3000);
      } else if (
        response.data.message ===
        "The article has already been cancelled as a favorite"
      ) {
        return unsaved();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const checkIfArticleIsFavourite = async () => {
      try {
        const response = await axios({
          headers: {
            Authorization: `Bearer ${loggedUser.token}`,
          },
          method: "get",
          url: `${import.meta.env.VITE_APP_API_URL}/favourites`,
        });
        const isInFavourite = response.data.some(
          (favourite: FavouriteArticle) => favourite.articleId === article?.id
        );
        setIsFavourite(isInFavourite);
      } catch (error) {
        console.log(error);
      }
    };
    checkIfArticleIsFavourite();
  }, [article?.id, loggedUser.token]);

  const handleCreateComment = async (e: FormEvent) => {
    e.preventDefault();

    const response = await axios({
      headers: {
        Authorization: `Bearer ${loggedUser.token}`,
      },
      method: "post",
      url: `${import.meta.env.VITE_APP_API_URL}/comments/${id}`,
      data: {
        content,
      },
    });

    if (response.data.message === "Comment successfully created!") {
      commentCreated();
      setTimeout(() => {
        onClose();
        window.location.reload();
      }, 3000);
    }
  };

  return article && comments ? (
    <>
      <NavigationBar />
      <div className="container px-4 max-w-6xl mx-auto mt-32 pb-5 grid place-content-center">
        <ToastContainer className="toastify--success" />
        <h2 className="text-4xl font-extrabold dark:text-white">
          {article.title}
        </h2>
        <p className="my-4 text-xl text-dark-grey">
          {article.headline.toUpperCase()}
        </p>
        <ul
          role="list"
          className="divide-gray-200 dark:divide-gray-700 flex justify-between"
        >
          <li className="py-3 sm:py-4">
            <div className="flex items-center space-x-3 mt-4">
              <div className="flex-shrink-0">
                <img
                  className="w-12 h-12 rounded-full mr-5"
                  src={
                    typeof article.image === "object"
                      ? `${import.meta.env.VITE_APP_IMG_URL}${
                          article.user.avatar[0]
                        }`
                      : `${import.meta.env.VITE_APP_IMG_URL}${
                          article.user.avatar
                        }`
                  }
                  alt="Neil image"
                />
              </div>
              <div className="flex-1 min-w-0 ">
                <p className="text-lg font-semibold mb-2 text-gray-900 truncate dark:text-white">
                  {article.user.firstname} {article.user.lastname}
                </p>

                <small className="text-md text-dark-grey truncate dark:text-gray-400 align">
                  Published {formatDistanceToNow(new Date(article.createdAt))}
                </small>
              </div>
            </div>
          </li>
          <Link to={`/profile/${article.user.id}`}>
            <div className="flex items-center space-x-3 mt-4 btn-profile-box text-sm">
              <div className="to-profile">
                <button className="btn-to-profile px-4">Profile</button>
              </div>
            </div>
          </Link>
        </ul>
        <img
          src={
            typeof article.image === "object"
              ? `${import.meta.env.VITE_APP_IMG_URL}${article.image[0]}`
              : `${import.meta.env.VITE_APP_IMG_URL}${article.image}`
          }
          className="w-full h-auto max-w-4xl rounded-lg mt-10"
          alt="image description"
        />

        <p className="mt-8 max-w-4xl text-black">{article.content}</p>
        <div className="border-y-2 border-semidark-grey flex gap-x-10 mt-8 py-3">
          <div>
            <button onClick={handleClick}>
              <i className="fa-regular fa-comment text-electric-blue"></i>
              <span className="ml-2 text-dark-grey hover:text-dark-black hover:font-bold">
                {comments.length}
              </span>
            </button>
          </div>
          <div>
            {loggedUser.token ? (
              <button onClick={onOpen}>
                <i className="fa-solid fa-marker text-electric-blue"></i>
                <span className="ml-2 text-dark-grey hover:text-dark-black hover:font-bold">
                  write comment
                </span>
              </button>
            ) : null}
          </div>

          <Modal
            isCentered
            blockScrollOnMount={false}
            isOpen={isOpen}
            onClose={onClose}
            size={"3xl"}
          >
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>
                Write a comment for article ID: {article.id}
              </ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <form
                  onSubmit={(e) => handleCreateComment(e)}
                  autoComplete="off"
                >
                  <div>
                    <div className="relative z-0 w-full mb-8 group">
                      <textarea
                        name="content"
                        id="content"
                        className="block py-2.5 px-0 w-full text-md text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 focus:outline-none focus:ring-0 peer"
                        placeholder=" "
                        required
                        onChange={(e) => setContent(e.target.value)}
                      />
                      <label className="peer-focus:font-medium absolute text-md text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                        Content
                      </label>
                    </div>
                    <div className="flex justify-center my-10">
                      <button className="btn-modify-article">Confirm</button>
                    </div>
                  </div>
                </form>
              </ModalBody>
            </ModalContent>
          </Modal>

          <div className="ml-auto cursor-pointer">
            {loggedUser.token ? (
              <>
                <span className="mr-2 text-dark-grey hover:text-dark-black hover:font-bold">
                  {" "}
                  save
                </span>
                <i
                  className={`fa-${
                    isFavourite ? "solid" : "regular"
                  } fa-bookmark text-electric-blue`}
                  onClick={() => handleSaveArticleAsFavourite(article.id)}
                ></i>
              </>
            ) : null}
          </div>
        </div>

        <Drawer
          onClose={() => setIsOpening(false)}
          isOpen={isOpening}
          size="sm"
        >
          <>
            <DrawerOverlay />
            <DrawerContent>
              <DrawerCloseButton />
              <DrawerHeader>Comments</DrawerHeader>
              <DrawerBody>
                {comments.map((comment: CommentProps) => {
                  return (
                    <ul
                      role="list"
                      className="divide-gray-200 dark:divide-gray-700 py-3"
                      key={comment.id}
                    >
                      <li>
                        <div className="flex items-center space-x-3 mt-4">
                          <div className="flex-shrink-0">
                            <img
                              className="w-10 h-10 rounded-full mr-1"
                              src={
                                typeof comment.user.avatar === "object"
                                  ? `${import.meta.env.VITE_APP_IMG_URL}${
                                      comment.user.avatar[0]
                                    }`
                                  : `${import.meta.env.VITE_APP_IMG_URL}${
                                      comment.user.avatar
                                    }`
                              }
                              alt="Neil image"
                            />
                          </div>
                          <div className="flex">
                            <p className="text-md font-semibold mb-2 text-gray-900 truncate dark:text-white">
                              {comment.user.firstname} {comment.user.lastname} ·{" "}
                            </p>
                            <div className="">
                              <p className="text-semidark-grey ml-2 text-sm">
                                {formatDistanceToNow(
                                  new Date(article.createdAt)
                                )}{" "}
                              </p>
                            </div>
                          </div>
                        </div>
                        <p className="text-md text-dark-grey truncate dark:text-gray-400 align ml-14">
                          {comment.content}
                        </p>
                      </li>
                    </ul>
                  );
                })}
                {comments.length === 0 && (
                  <div className="no-comments rounded mx-auto">
                    <h2 className="no-comments-title text-center">
                      This article haven't comments yet!
                    </h2>
                    <h2 className="no-comments-message text-center">
                      Be the first to comment!
                    </h2>
                  </div>
                )}
              </DrawerBody>
            </DrawerContent>
          </>
        </Drawer>
      </div>
      <Footer />
    </>
  ) : (
    <CustomLoader />
  );
}

export default ArticlePage;
