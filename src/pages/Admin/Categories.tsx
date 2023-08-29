import { useEffect, useState } from "react";
import Sidebar from "../../components/Admin/Sidebar";
import axios from "axios";
import { Category } from "../../types/category";
import { Link } from "react-router-dom";
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
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";

function Categories() {
  const loggedUser = useSelector((state: RootState) => state.token);

  const successDeleted = () => toast.success("Category deleted successfuly!");
  const errorDeleted = () => toast.error("Error deleting category!");

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [categories, setCategories] = useState<Category[]>([]);
  const [deleteCategoryId, setDeleteCategoryId] = useState<string>("");

  useEffect(() => {
    const getCategories = async () => {
      const response = await axios({
        method: "get",
        url: `${import.meta.env.VITE_APP_API_URL}/categories`,
      });
      console.log(response.data);
      setCategories(response.data);
    };
    getCategories();
  }, []);

  const handleDeleteCategory = async (deleteCategoryId: string) => {
    const response = await axios({
      headers: {
        Authorization: `Bearer ${loggedUser.token}`,
      },
      method: "delete",
      url: `${import.meta.env.VITE_APP_API_URL}/categories/${deleteCategoryId}`,
    });
    setCategories(
      categories.filter(
        (category: Category) => category.id !== +deleteCategoryId
      )
    );

    if (response.data.message === "Category successfully deleted!") {
      return successDeleted();
    } else {
      return errorDeleted();
    }
  };

  return categories ? (
    <>
      <Sidebar />
      <div className="container mt-24 mx-auto mb-8">
        <h2 className="my-10 text-center text-2xl">Categories managment</h2>
        <div className="flex align-top justify-between max-[639px]:flex-col max-[639px]:px-4 gap-4 mx-auto">
          <table className="text-sm text-left text-gray-500 w-full max-w-3xl max-[639px]:max-w-lg shadow-md">
            <thead className="text-xs text-gray-700 uppercase w-full bg-light-grey justify-between">
              <tr>
                <th scope="col" className="p-4">
                  ID
                </th>
                <th scope="col" className="px-6 py-3 w-full text-center">
                  Name
                </th>
                <th scope="col" className="px-6 py-3 text-right">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category) => {
                return (
                  <tr
                    key={category.id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <td className="w-4 p-4">
                      <p>{category.id}</p>
                    </td>
                    <td className="w-4 p-4 text-center">
                      <p>{category.name}</p>
                    </td>
                    <td className="text-center">
                      <i
                        className="fa-regular fa-trash-can text-lg hover:text-red-700 max-[639px]:ml-2"
                        onClick={() => {
                          onOpen();
                          setDeleteCategoryId(category.id.toString());
                        }}
                      ></i>
                      {/* <Link to={`/admin/edit/article/${article.id}`}> */}
                      <i className="fa-regular fa-pen-to-square text-lg mx-2 hover:text-electric-blue"></i>
                      {/* </Link> */}
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
                          Delete category ID: {deleteCategoryId}
                        </ModalHeader>
                        <ModalCloseButton className="hover:text-red-600 hover:bg-transparent" />
                        <ModalBody>
                          {" "}
                          Are you sure you want to delete it?
                        </ModalBody>
                        <ModalFooter>
                          <Button
                            onClick={() => {
                              handleDeleteCategory(deleteCategoryId);
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
                Create category
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  ) : (
    <p>Loading...</p>
  );
}

export default Categories;
