import { Link } from "react-router-dom";

function Landing() {
  return (
    <div>
      <section className="bg-gray-500 bg-blend-multiply landing-hero-image">
        <div className="px-4 mx-auto max-w-screen-xl text-center py-24 lg:py-56">
          <h1 className="mb-4 text-4xl font-bold tracking-tight leading-none text-light-grey md:text-5xl lg:text-6xl landing-title">
            Power blog
          </h1>
          <p className="mb-8 text-lg font-normal text-light-grey lg:text-xl sm:px-16 lg:px-48 subtitle-landing">
            A space to read, write, comment, and preserve your favorite
            articles, all in one place.
          </p>
          <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4 justify-center">
            <Link to={"/home"} className="text-light-grey get-started rounded">
              <span className="span-get-started"></span>
              <span className="span-get-started"></span>
              <span className="span-get-started"></span>
              <span className="span-get-started"></span>
              Get started
              <i className="fa-solid fa-arrow-right fa-bounce mx-2"></i>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Landing;
