import Sidebar from "../../components/Admin/Sidebar";
import CategoriesCard from "../../components/Admin/CategoriesCard";

function Dashboard() {
  return (
    <>
      <Sidebar />
      <div className="container border mx-auto mt-24">
        <CategoriesCard />
      </div>
    </>
  );
}

export default Dashboard;
