import { useEffect, useState } from "react";
import Sidebar from "../../components/Admin/Sidebar";
import axios from "axios";
import { UserProps } from "../../types/user";

import { ToastContainer, toast } from "react-toastify";
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
import useLoggedUser from "../../hooks/useLoggedUser";

function AllUsers() {
  const loggedUser = useLoggedUser();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [users, setUsers] = useState<UserProps[]>([]);
  const [deleteUserId, setDeleteUserId] = useState<string>("");

  const successDeleted = () => toast.success("User deleted!");
  const errorDeleted = () => toast.error("Error deleting user!");

  const handleDeleteUser = async (deleteUserId: string) => {
    const response = await axios({
      headers: {
        Authorization: `Bearer ${loggedUser.token}`,
      },
      method: "delete",
      url: `${import.meta.env.VITE_APP_API_URL}/users/${deleteUserId}`,
    });
    setUsers(users.filter((user: UserProps) => user.id !== +deleteUserId));

    if (response.data.message === "User deleted successfully") {
      return successDeleted();
    } else {
      return errorDeleted();
    }
  };

  useEffect(() => {
    const getUsers = async () => {
      const response = await axios({
        method: "get",
        url: `${import.meta.env.VITE_APP_API_URL}/users`,
      });

      const usersArticles = await Promise.all(
        response.data.map(async (user: UserProps) => {
          const articleResponse = await axios({
            method: "get",
            url: `${import.meta.env.VITE_APP_API_URL}/articles/user/${user.id}`,
          });
          return { ...user, articlesCount: articleResponse.data.length };
        })
      );
      setUsers(usersArticles);
    };
    getUsers();
  }, []);

  return users ? (
    <>
      <Sidebar />
      <div className="container mt-24 mx-auto mb-8">
        <h2 className="my-10 text-center text-2xl">Users managment</h2>
        <div className="flex align-top justify-between max-[639px]:flex-col max-[639px]:px-4 gap-4 mx-auto">
          <table className="text-sm text-left text-gray-500 w-full max-w-3xl max-[639px]:max-w-lg shadow-md">
            <thead className="text-xs text-gray-700 uppercase bg-light-grey">
              <tr>
                <th scope="col" className="p-4">
                  ID
                </th>
                <th scope="col" className="px-6 py-3">
                  Fullname
                </th>
                <th scope="col" className="px-6 py-3">
                  Admin
                </th>
                <th className="ml-14 py-3">Articles posted</th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => {
                return (
                  <tr
                    key={user.id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <td className="w-4 p-4">
                      <p>{user.id}</p>
                    </td>
                    <th
                      scope="row"
                      className="flex items-center px-6 py-4 text-gray-900 dark:text-white"
                    >
                      <img
                        className="w-10 h-10 rounded-full"
                        src={
                          typeof user.avatar === "object"
                            ? `${import.meta.env.VITE_APP_IMG_URL}${
                                user.avatar[0]
                              }`
                            : `${import.meta.env.VITE_APP_IMG_URL}${
                                user.avatar
                              }`
                        }
                        alt={user.firstname + user.lastname}
                      />
                      <div className="pl-3">
                        <div className="text-base font-semibold">
                          {user.firstname} {user.lastname}
                        </div>
                        <div className="font-normal text-gray-500">
                          {user.email}
                        </div>
                      </div>
                    </th>
                    <td className="text-center">
                      {user.isAdmin === true ? (
                        <i className="fa-solid fa-check text-green-500"></i>
                      ) : (
                        <i className="fa-solid fa-xmark text-red-500"></i>
                      )}
                    </td>
                    <td className="text-center">
                      <p className="text-dark-black text-lg">
                        {user.articlesCount}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <i
                        className="fa-regular fa-trash-can text-lg hover:text-red-700 max-[639px]:ml-2"
                        onClick={() => {
                          onOpen();
                          setDeleteUserId(user.id.toString());
                        }}
                      ></i>
                      <Link to={`/admin/edit/user/${user.id}`}>
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
                          Delete user ID: {deleteUserId}
                        </ModalHeader>
                        <ModalCloseButton className="hover:text-red-600 hover:bg-transparent" />
                        <ModalBody>
                          {" "}
                          Are you sure you want to delete it?
                        </ModalBody>
                        <ModalFooter>
                          <Button
                            onClick={() => {
                              handleDeleteUser(deleteUserId);
                              onClose();
                            }}
                            className="btn-confirm-delete"
                          >
                            Confirm
                          </Button>
                        </ModalFooter>
                      </ModalContent>
                    </Modal>
                    <ToastContainer className={"toastify--success"} />
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="mx-auto">
            <Link to={"/admin/create/user"}>
              <button
                type="button"
                className="text-electric-blue hover:text-white border border-electric-blue hover:bg-electric-blue focus:outline-none focus:ring-electric-blue font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 transition duration-300 ease"
              >
                Create user
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  ) : (
    <p className="text-center">Loading ...</p>
  );
}

export default AllUsers;
