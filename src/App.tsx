import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";

function App() {
  return (
    <>
      <Routes>
        <Route path="*" element={<p>Erorr 404 page not found</p>} />
        <Route path="/" element={<Landing />} />
      </Routes>
    </>
  );
}

export default App;
