import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Home from "./pages/Home";
import ScrollToTop from "./components/utilities/ScrollToTop";
import ArticlePage from "./pages/ArticlePage";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import FavouriteArticle from "./pages/FavouriteArticle";
import UserProfile from "./pages/UserProfile";
import ProfileSettingsForm from "./pages/ProfileSettingsForm";
import DataAccessForm from "./pages/DataAccessForm";
import ArticleByCategory from "./pages/ArticleByCategory";
import Dashboard from "./pages/Admin/Dashboard";
import Users from "./pages/Admin/AllUsers";
import EditUserForm from "./pages/Admin/EditUserForm";
import CreateUserForm from "./pages/Admin/CreateUserForm";
import Article from "./pages/Admin/Articles";
import EditArticleForm from "./pages/Admin/EditArticleForm";
import CreateArticleForm from "./pages/Admin/CreateArticleForm";
import Categories from "./pages/Admin/Categories";

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/article/:id" element={<ArticlePage />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/favourite/article" element={<FavouriteArticle />} />
        <Route path="/profile/:id" element={<UserProfile />} />
        <Route path="/settings/profile/:id" element={<ProfileSettingsForm />} />
        <Route path="/settings/data/:id" element={<DataAccessForm />} />
        <Route path="/category/:name" element={<ArticleByCategory />} />
        {/* ADMIN  */}
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/users" element={<Users />} />
        <Route path="/admin/create/user" element={<CreateUserForm />} />
        <Route path="/admin/edit/user/:id" element={<EditUserForm />} />
        <Route path="/admin/articles" element={<Article />} />
        <Route path="admin/edit/article/:id" element={<EditArticleForm />} />
        <Route path="/admin/create/article" element={<CreateArticleForm />} />
        <Route path="/admin/categories" element={<Categories />} />
        {/* 404 Page */}
        <Route path="*" element={<p>Erorr 404 page not found</p>} />
      </Routes>
    </>
  );
}

export default App;
