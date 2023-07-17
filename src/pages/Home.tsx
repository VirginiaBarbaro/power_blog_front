import Article from "../components/Article";
import Navbar from "../components/NavigationBar";

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
