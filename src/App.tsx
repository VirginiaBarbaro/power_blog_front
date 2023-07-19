import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Home from "./pages/Home";
import ScrollToTop from "./components/utilities/ScrollToTop";
import FullArticle from "./pages/ArticlePage";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import FavouriteArticle from "./pages/FavouriteArticle";
import UserProfile from "./pages/UserProfile";

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/article/:id" element={<FullArticle />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/favourite/article" element={<FavouriteArticle />} />
        <Route path="/profile" element={<UserProfile />} />
        {/* 404 Page */}
        <Route path="*" element={<p>Erorr 404 page not found</p>} />
      </Routes>
    </>
  );
}

export default App;
