import Article from "../components/Article";
import NavigationBar from "../components/NavigationBar";

function Home() {
  return (
    <>
      <NavigationBar />
      <div className="mt-24">
        <Article />
      </div>
    </>
  );
}

export default Home;
