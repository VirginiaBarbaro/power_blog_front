import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { ArticleProps } from "../types/article";
import NavigationBar from "../components/NavigationBar";
import { CommentProps } from "../types/comment";
import { formatDistanceToNow } from "date-fns";
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import Footer from "../components/Footer";

function ArticlePage() {
  const loggedUser = useSelector((state: RootState) => state.token);

  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(true);
  };

  const { id } = useParams();

  const [comments, setComments] = useState<CommentProps[]>([]);
  const [isFavourite, setIsFavourite] = useState<boolean>(false);
  const [article, setArticle] = useState<ArticleProps>();

  useEffect(() => {
    const getArticleInfo = async () => {
      const response = await axios({
        method: "get",
        url: `${import.meta.env.VITE_APP_API_URL}/articles/${id}`,
      });
      console.log(response.data);
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

  const handleSaveArticleAsFavourite = async (id: number) => {
    try {
      const response = await axios({
        headers: {
          Authorization: `Bearer ${loggedUser.token}`,
        },
        method: "post",
        url: `${import.meta.env.VITE_APP_API_URL}/favourites/${id}`,
      });
      console.log(response.data);
      setIsFavourite(!isFavourite);
    } catch (error) {
      console.log(error);
    }
  };

  return article && comments ? (
    <>
      <NavigationBar />
      <div className="container px-4 max-w-6xl mx-auto mt-32 pb-5 grid place-content-center">
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
                  src={`${
                    import.meta.env.VITE_APP_API_URL
                  }/${article.user.avatar.replace("public", "")}`}
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
          src={`${import.meta.env.VITE_APP_API_URL}/${article.image.replace(
            "public\\",
            ""
          )}`}
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
            <button>
              <i className="fa-solid fa-marker text-electric-blue"></i>
              <span className="ml-2 text-dark-grey hover:text-dark-black hover:font-bold">
                write
              </span>
            </button>
          </div>
          <div className="ml-auto cursor-pointer">
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
          </div>
        </div>

        <Drawer onClose={() => setIsOpen(false)} isOpen={isOpen} size="sm">
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
                              src={`${
                                import.meta.env.VITE_APP_API_URL
                              }/${comment.user.avatar.replace("public\\", "")}`}
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
                      Be te first to comment!
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
    <p className="text-center">Loading...</p>
  );
}

export default ArticlePage;
