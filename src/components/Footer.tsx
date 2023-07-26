import { Link } from "react-router-dom";

function Footer() {
  return (
    <>
      <footer className="bg-white rounded-lg dark:bg-gray-900 m-4 bottom-0 left-0 w-full relative">
        <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
          <div className="sm:flex sm:items-center sm:justify-between">
            <Link to={"/home"}>
              <img
                src="/blog_logo.png"
                className="h-10 w-28 object-cover"
                alt="Flowbite Logo"
              />
            </Link>
            <div className="flex flex-wrap items-center mx-auto text-center max-[639px]:my-3">
              <Link to={"https://github.com/VirginiaBarbaro"} target="_blank">
                <i className="fa-brands fa-square-github text-3xl mx-2 text-dark-grey hover:text-electric-blue"></i>
              </Link>
              <Link
                to={"https://www.linkedin.com/in/virginia-barbaro/"}
                target="_blank"
              >
                <i className="fa-brands fa-linkedin text-3xl mx-2 text-dark-grey hover:text-electric-blue"></i>
              </Link>
              <Link
                to={
                  "mailto:virginiabarbaro@icloud.com?subject=&body=Hola,%20quiero%20contactarte"
                }
                target="_blank"
              >
                <i className="fa-solid fa-envelope text-3xl mx-2 text-dark-grey hover:text-electric-blue"></i>
              </Link>
            </div>
            <ul className="flex flex-wrap items-center mb-6 text-md font-medium text-dark-grey sm:mb-0">
              <li>
                <Link
                  to={"https://virginia-barbaro.vercel.app/"}
                  className="mr-4 hover:underline hover:text-electric-blue md:mr-6 "
                >
                  Portfolio
                </Link>
              </li>
            </ul>
          </div>
          <hr className="my-6 border-dark-black sm:mx-auto dark:border-gray-700 lg:my-8" />
          <span className="block text-md text-dark-grey sm:text-center dark:text-gray-400">
            © 2023{" "}
            <Link
              to={"https://www.linkedin.com/in/virginia-barbaro/"}
              className="hover:underline hover:text-electric-blue"
              target="_blank"
            >
              Virginia Barbaro
            </Link>
          </span>
        </div>
      </footer>
    </>
  );
}

export default Footer;
