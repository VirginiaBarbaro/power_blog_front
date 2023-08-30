import { FormEvent, useEffect, useState } from "react";
import Sidebar from "../../components/Admin/Sidebar";
import axios from "axios";
import { Category } from "../../types/category";
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
import CustomLoader from "../../components/utilities/CustomLoader";

function Categories() {
  const loggedUser = useSelector((state: RootState) => state.token);

  const successCreated = () => toast.success("Category created!");
  const errorCreated = () => toast.error("Error creating category!");
  const successDeleted = () => toast.success("Category deleted successfuly!");
  const errorDeleted = () => toast.error("Error deleting category!");
  const successEdited = () => toast.success("Category edited!");
  const errorEdited = () => toast.error("Error editing category!");

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [categories, setCategories] = useState<Category[]>([]);
  const [deleteCategoryId, setDeleteCategoryId] = useState<string>("");
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const [opened, setOpened] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [updateCategoryId, setUpdateCategoryId] = useState<string>("");

  const openEditModal = () => {
    setOpened(true);
  };

  const closeEditModal = () => {
    setOpened(false);
  };

  const handleOpenModal = () => {
    setIsOpened(true);
  };

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

  const handleCreateCategory = async (e: FormEvent) => {
    e.preventDefault();

    const response = await axios({
      headers: {
        Authorization: `Bearer ${loggedUser.token}`,
      },
      method: "post",
      url: `${import.meta.env.VITE_APP_API_URL}/categories`,
      data: { name },
    });

    if (response.data.message === "New category has been created!") {
      successCreated();
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } else {
      return errorCreated();
    }
  };

  const handleEditCategory = async (e: FormEvent) => {
    e.preventDefault();

    const response = await axios({
      headers: {
        Authorization: `Bearer ${loggedUser.token}`,
      },
      method: "patch",
      url: `${import.meta.env.VITE_APP_API_URL}/categories/${updateCategoryId}`,
      data: { name },
    });

    if (response.data.message === "Category edited!") {
      successEdited();
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } else {
      return errorEdited();
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
                      <i
                        className="fa-regular fa-pen-to-square text-lg mx-2 hover:text-electric-blue"
                        onClick={() => {
                          openEditModal();
                          setUpdateCategoryId(category.id.toString());
                        }}
                      ></i>
                    </td>
                    <Modal
                      onClose={() => closeEditModal()}
                      isOpen={opened}
                      isCentered
                      motionPreset="slideInBottom"
                    >
                      <ModalOverlay />
                      <ModalContent>
                        <ModalHeader>
                          Edit category {updateCategoryId}
                        </ModalHeader>
                        <ModalCloseButton className="hover:text-red-600 hover:bg-transparent" />
                        <ModalBody>
                          <form
                            onSubmit={(e) => {
                              handleEditCategory(e);
                              setIsOpened(false);
                            }}
                          >
                            <div>
                              <div className="relative z-0 w-full mb-8 group">
                                <input
                                  type="text"
                                  name="name"
                                  id="name"
                                  className="block py-2.5 px-0 w-full text-md text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 focus:outline-none focus:ring-0 peer"
                                  placeholder=" "
                                  required
                                  value={name}
                                  onChange={(e) => setName(e.target.value)}
                                />
                                <label className="peer-focus:font-medium absolute text-md text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                  Name
                                </label>
                              </div>
                            </div>
                          </form>
                        </ModalBody>
                        <ModalFooter>
                          <Button
                            className="btn-confirm-delete"
                            onClick={(e) => {
                              handleEditCategory(e);
                              closeEditModal();
                            }}
                          >
                            Confirm
                          </Button>
                        </ModalFooter>
                      </ModalContent>
                    </Modal>
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
            </tbody>
            <ToastContainer className={"toastify--success"} />
          </table>
          <div className="mx-auto">
            <button
              type="button"
              className="text-electric-blue hover:text-white border border-electric-blue hover:bg-electric-blue focus:outline-none focus:ring-electric-blue font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 transition duration-300 ease"
              onClick={() => handleOpenModal()}
            >
              Create category
            </button>
          </div>
          <Modal
            onClose={() => setIsOpened(false)}
            isOpen={isOpened}
            isCentered
            motionPreset="slideInBottom"
          >
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Create category</ModalHeader>
              <ModalCloseButton className="hover:text-red-600 hover:bg-transparent" />
              <ModalBody>
                <form
                  onSubmit={(e) => {
                    handleCreateCategory(e);
                    setIsOpened(false);
                  }}
                >
                  <div>
                    <div className="relative z-0 w-full mb-8 group">
                      <input
                        type="text"
                        name="name"
                        id="name"
                        className="block py-2.5 px-0 w-full text-md text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 focus:outline-none focus:ring-0 peer"
                        placeholder=" "
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                      <label className="peer-focus:font-medium absolute text-md text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                        Name
                      </label>
                    </div>
                  </div>
                </form>
              </ModalBody>
              <ModalFooter>
                <Button
                  className="btn-confirm-delete"
                  onClick={(e) => {
                    handleCreateCategory(e);
                    setIsOpened(false);
                  }}
                >
                  Confirm
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
          <ToastContainer className={"toastify--success"} />
        </div>
      </div>
    </>
  ) : (
    <CustomLoader />
  );
}

export default Categories;
