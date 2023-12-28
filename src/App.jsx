import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { TaskProvider } from "./context/TaskContext.jsx";
import Home from "./pages/Home.jsx";
import TaskDetails from "./pages/TaskDetails.jsx";
import AddTask from "./pages/AddTask.jsx";
import EditTask from "./pages/EditTask.jsx";
// import SideBar from "./components/SideBar/SideBar.jsx";
import "./App.css";

function App() {
  return (
    <Router>
      <TaskProvider>
        <div style={{ display: "flex" }}>
          {/* <SideBar /> */}
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/home" element={<Home />} />
            <Route path="/task/:id" element={<TaskDetails />} />
            <Route path="/task/add" element={<AddTask />} />
            <Route path="/task/edit/:id" element={<EditTask />} />
          </Routes>
        </div>
      </TaskProvider>
    </Router>
  );
}

export default App;
