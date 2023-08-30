import { useNavigate } from "react-router-dom";

function Page404() {
  const navigate = useNavigate();

  const prevPage = () => {
    navigate("/home");
  };

  return (
    <div className="back-img">
      <div className="text-center text-5xl font-semibold">
        <i
          className="fa-solid fa-angles-left mt-14 text-5xl hover:cursor-pointer shake-br mr-4"
          onClick={prevPage}
        ></i>
        Back Home
      </div>
    </div>
  );
}

export default Page404;
