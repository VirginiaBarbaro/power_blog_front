import Article from "../components/Article";
import Navbar from "../components/NavigationBar";
// import ArticleCard from "../components/ArticleCard";

function Home() {
  return (
    <>
      <Navbar />
      <div className="mt-24">
        <Article />
      </div>
    </>
  );
}

export default Home;
