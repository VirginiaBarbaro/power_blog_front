import { useEffect, useState } from "react";
import Sidebar from "../../components/Admin/Sidebar";
import { Link } from "react-router-dom";
import { ArticleProps } from "../../types/article";
import axios from "axios";
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

import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { ToastContainer, toast } from "react-toastify";
import CustomLoader from "../../components/utilities/CustomLoader";

function Article() {
  const successDeleted = () => toast.success("Article deleted successfuly!");
  const errorDeleted = () => toast.error("Error deleting article!");

  const loggedUser = useSelector((state: RootState) => state.token);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [articles, setArticles] = useState<ArticleProps[]>([]);
  const [deleteArticleId, setDeleteArticleId] = useState<string>("");

  useEffect(() => {
    const getArticles = async () => {
      const response = await axios({
        method: "get",
        url: `${import.meta.env.VITE_APP_API_URL}/articles`,
      });
      console.log(response.data);
      setArticles(response.data);
    };
    getArticles();
  }, []);

  function truncateText(text: string, limit: number) {
    const words = text.split(" ");
    if (words.length > limit) {
      return words.slice(0, limit).join(" ") + "...";
    } else {
      return text;
    }
  }

  const handleDelteArticle = async (deleteArticleId: string) => {
    const response = await axios({
      headers: {
        Authorization: `Bearer ${loggedUser.token}`,
      },
      method: "delete",
      url: `${import.meta.env.VITE_APP_API_URL}/articles/${deleteArticleId}`,
    });
    setArticles(
      articles.filter(
        (article: ArticleProps) => article.id !== +deleteArticleId
      )
    );

    if (response.data.message === "Article successfully deleted!") {
      return successDeleted();
    } else {
      return errorDeleted();
    }
  };

  return articles ? (
    <>
      <Sidebar />
      <div className="container mt-24 mx-auto mb-8">
        <h2 className="my-10 text-center text-2xl">Articles managment</h2>
        <div className="flex align-top justify-between max-[639px]:flex-col max-[639px]:px-4 gap-4 mx-auto">
          <table className="text-sm text-left text-gray-500 w-full max-w-3xl max-[639px]:max-w-lg shadow-md">
            <thead className="text-xs text-gray-700 uppercase bg-light-grey">
              <tr>
                <th scope="col" className="p-4">
                  ID
                </th>
                <th scope="col" className="px-6 py-3">
                  Title
                </th>
                <th scope="col" className="px-6 py-3">
                  Headline
                </th>
                <th scope="col" className="px-6 py-3">
                  Content
                </th>
                <th scope="col" className="px-6 py-3">
                  Image
                </th>
                <th scope="col" className="px-6 py-3">
                  Category
                </th>
                <th scope="col" className="px-6 py-3">
                  Author
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {articles.map((article) => {
                return (
                  <tr
                    key={article.id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <td className="w-4 p-4">
                      <p>{article.id}</p>
                    </td>
                    <td className="w-4 p-4">
                      <p>{article.title}</p>
                    </td>
                    <td className="w-4 p-4">
                      <p>{article.headline}</p>
                    </td>
                    <td className="w-4 p-4">
                      <p>{truncateText(article.content, 7)} </p>
                    </td>
                    <td className="text-center p-2">
                      <img
                        className="h-14 w-18 m-auto"
                        src={`${
                          import.meta.env.VITE_APP_API_URL
                        }/${article.image.replace("public", "")}`}
                      />
                    </td>
                    <td className="w-4 p-4">
                      <p>{article.category.name} </p>
                    </td>
                    <td className="w-4 p-4">
                      <p>
                        {article.user.firstname} {article.user.lastname}
                      </p>
                    </td>
                    <td className="text-center">
                      <i
                        className="fa-regular fa-trash-can text-lg hover:text-red-700 max-[639px]:ml-2"
                        onClick={() => {
                          onOpen();
                          setDeleteArticleId(article.id.toString());
                        }}
                      ></i>
                      <Link to={`/admin/edit/article/${article.id}`}>
                        <i className="fa-regular fa-pen-to-square text-lg mx-2 hover:text-electric-blue"></i>
                      </Link>
                    </td>
                    <Modal
                      onClose={onClose}
                      isOpen={isOpen}
                      isCentered
                      motionPreset="slideInBottom"
                    >
                      <ModalOverlay />
                      <ModalContent>
                        <ModalHeader>
                          Delete article ID: {deleteArticleId}
                        </ModalHeader>
                        <ModalCloseButton className="hover:text-red-600 hover:bg-transparent" />
                        <ModalBody>
                          {" "}
                          Are you sure you want to delete it?
                        </ModalBody>
                        <ModalFooter>
                          <Button
                            onClick={() => {
                              handleDelteArticle(deleteArticleId);
                              onClose();
                            }}
                            className="btn-confirm-delete"
                          >
                            Confirm
                          </Button>
                        </ModalFooter>
                      </ModalContent>
                    </Modal>
                  </tr>
                );
              })}
              <ToastContainer className={"toastify--success"} />
            </tbody>
          </table>
          <div className="mx-auto">
            <Link to={"/admin/create/article"}>
              <button
                type="button"
                className="text-electric-blue hover:text-white border border-electric-blue hover:bg-electric-blue focus:outline-none focus:ring-electric-blue font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 transition duration-300 ease"
              >
                Create article
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  ) : (
    <CustomLoader />
  );
}

export default Article;
