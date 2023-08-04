import { useEffect, useState } from "react";
import Sidebar from "../components/Admin/Sidebar";
import axios from "axios";
import { UserProps } from "../types/user";
import { RootState } from "../redux/store";
import { useSelector } from "react-redux";
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

function Admins() {
  const loggedUser = useSelector((state: RootState) => state.token);
  console.log(loggedUser);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [admins, setAdmins] = useState<UserProps[]>([]);
  const [deleteAdminId, setDeleteAdminId] = useState<string>("");

  const successDeleted = () => toast.success("Admin deleted successfully!");
  const errorDeleted = () => toast.error("Error deleting user!");

  const handleDeleteAdmin = async (deleteAdminId: string) => {
    const response = await axios({
      headers: {
        Authorization: `Bearer ${loggedUser.token}`,
      },
      method: "delete",
      url: `${import.meta.env.VITE_APP_API_URL}/admins/${deleteAdminId}`,
    });
    setAdmins(admins.filter((admin: UserProps) => admin.id !== +deleteAdminId));

    if (response.data.message === "User deleted successfully") {
      return successDeleted();
    } else {
      return errorDeleted();
    }
  };

  useEffect(() => {
    const getAdmins = async () => {
      const response = await axios({
        method: "get",
        url: `${import.meta.env.VITE_APP_API_URL}/users`,
      });

      const notUsers = response.data.filter(
        (admin: UserProps) => !admin.isAdmin
      );

      const adminsArticles = await Promise.all(
        notUsers.map(async (admin: UserProps) => {
          const articleResponse = await axios({
            method: "get",
            url: `${import.meta.env.VITE_APP_API_URL}/articles/user/${
              admin.id
            }`,
          });
          return { ...admin, articlesCount: articleResponse.data.length };
        })
      );
      console.log(adminsArticles);
      setAdmins(adminsArticles);
    };
    getAdmins();
  }, []);

  return admins ? (
    <>
      <Sidebar />
      <div className="container mt-24 mx-auto mb-8">
        <h2 className="my-10 text-center text-2xl">Admins managment</h2>
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
                <th className="ml-14 py-3">Articles posted</th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {admins.map((admin) => {
                return (
                  <tr
                    key={admin.id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <td className="w-4 p-4">
                      <p>{admin.id}</p>
                    </td>
                    <th
                      scope="row"
                      className="flex items-center px-6 py-4 text-gray-900 dark:text-white"
                    >
                      <img
                        className="w-10 h-10 rounded-full"
                        src={`${
                          import.meta.env.VITE_APP_API_URL
                        }/${admin.avatar.replace("public", "")}`}
                        alt={admin.firstname + admin.lastname}
                      />
                      <div className="pl-3">
                        <div className="text-base font-semibold">
                          {admin.firstname} {admin.lastname}
                        </div>
                        <div className="font-normal text-gray-500">
                          {admin.email}
                        </div>
                      </div>
                    </th>
                    <td className="text-center">
                      <p className="text-dark-black text-lg">
                        {admin.articlesCount}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <i
                        className="fa-regular fa-trash-can text-lg hover:text-red-700 max-[639px]:ml-2"
                        onClick={() => {
                          onOpen();
                          setDeleteAdminId(admin.id.toString());
                        }}
                      ></i>
                      <Link to={`/admin/edit/user/${admin.id}`}>
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
                          Delete admin ID: {deleteAdminId}
                        </ModalHeader>
                        <ModalCloseButton className="hover:text-red-600 hover:bg-transparent" />
                        <ModalBody>
                          {" "}
                          Are you sure you want to delete it?
                        </ModalBody>
                        <ModalFooter>
                          <Button
                            onClick={() => {
                              handleDeleteAdmin(deleteAdminId);
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
            <Link to={"/admin/create"}>
              <button
                type="button"
                className="text-electric-blue hover:text-white border border-electric-blue hover:bg-electric-blue focus:outline-none focus:ring-electric-blue font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 transition duration-300 ease"
              >
                Create admin
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  ) : (
    <p className="text-center">Loading.. </p>
  );
}

export default Admins;
