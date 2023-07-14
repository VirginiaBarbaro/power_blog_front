import Navbar from "../components/NavbarHome";
import ArticleCard from "../components/ArticleCard";

function Home() {
  return (
    <>
      <Navbar />
      <div className="mt-28">
        <ArticleCard />
      </div>
    </>
  );
}

export default Home;
