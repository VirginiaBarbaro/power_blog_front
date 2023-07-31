import Sidebar from "../../components/Admin/Sidebar";
import CategoriesCard from "../../components/Admin/dashboard/CategoriesCard";
import RecentArticle from "../../components/Admin/dashboard/RecentArticles";
import LatestUsers from "../../components/Admin/dashboard/LatestUsers";
import TopCategories from "../../components/Admin/dashboard/TopCategories";

function Dashboard() {
  return (
    <>
      <Sidebar />
      <div className="container mb-8 mx-auto mt-20">
        <CategoriesCard />
        <div className="grid grid-cols-3 max-[639px]:grid-cols-1 mt-8 gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-4">
          <div className="grid col-span-1 max-[639px]:mx-auto mx-auto shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px]">
            <LatestUsers />
          </div>
          <div className="grid col-span-1 max-[639px]:mx-auto mx-auto shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px]">
            <TopCategories />
          </div>
          <div className="grid col-span-1 max-[639px]:mx-auto mx-auto shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px]">
            <RecentArticle />
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
