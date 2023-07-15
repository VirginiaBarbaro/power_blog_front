import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Home from "./pages/Home";
import ScrollToTop from "./components/utilities/ScrollToTop";
import FullArticle from "./pages/ArticlePage";

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/article/:id" element={<FullArticle />} />
        {/* 404 Page */}
        <Route path="*" element={<p>Erorr 404 page not found</p>} />
      </Routes>
    </>
  );
}

export default App;
