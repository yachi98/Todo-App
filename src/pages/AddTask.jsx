import { useState, useRef } from "react";
import Buttons from "../components/Buttons";
import { Link, useNavigate } from "react-router-dom";
import { uid } from "uid";
import { useTask } from "../context/TaskContext";

const AddTask = () => {
  const inputRef = useRef(null);
  const inputRef2 = useRef(null);
  const [value, setValue] = useState("");
  const [complexity, setComplexity] = useState(null);
  const [priority, setPriority] = useState(null);
  const [dueDate, setDueDate] = useState(null);
  const [noTaskAdded, setNoTaskAdded] = useState(false);
  const myContext = useTask();
  const [subTask, setSubTask] = useState("");
  const [subTasksList, setSubTasksList] = useState([]);
  const navigate = useNavigate();

  const handleInputFocus = () => {
    inputRef.current.style.border = "1px solid #1da1f2";
  };

  const handleInputBlur = () => {
    inputRef.current.style.border = "none";
  };

  const handleInputFocus2 = () => {
    inputRef2.current.style.border = "1px solid #1da1f2";
  };

  const handleInputBlur2 = () => {
    inputRef2.current.style.border = "none";
  };

  const checkSubmit = () => {
    if (value.trim() === "") {
      setNoTaskAdded(true);
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!checkSubmit()) {
      return;
    }

    const item = {
      value,
      completed: false,
      priority,
      complexity,
      date: dueDate,
      id: uid(),
      subTasksList: subTasksList,
    };
    myContext.addTask(item);
    console.log(item);
    setValue("");
    setDueDate("");
    setNoTaskAdded(false);
    setPriority(null);
    setComplexity(null);
    navigate("/");
  };

  const handlePriorityChange = (value) => {
    setPriority(value);
  };

  const handleComplexityChange = (value) => {
    setComplexity(value);
  };

  const handleDueDateChange = (e) => {
    setDueDate(e.target.value);
  };

  const handleSubTaskChange = (e) => {
    setSubTask(e.target.value);
  };

  const handleAddSubTask = () => {
    if (subTask.trim() !== "") {
      const newSubTask = {
        name: subTask,
        completed: false,
        id: uid(),
      };
      setSubTasksList([...subTasksList, newSubTask]);
      setSubTask("");
    }
  };

  const removeSubTask = (subTaskId) => {
    const newList = subTasksList.filter((element) => element.id !== subTaskId);
    setSubTasksList(newList);
  };

  return (
    <div className="w-full h-screen bg-black bg-opacity-50 backdrop-filter backdrop-blur-10 p-10 flex justify-left">
      <div>
        <Link
          to="/"
          className="decoration-none bg-black p-3 text-white rounded-2xl"
        >
          Home
        </Link>
      </div>
      <div>
        <h3 className="text-2xl text-gray-300 font-light mb-5 text-center">
          Add Task
        </h3>
        <form className="flex flex-col gap-30" onSubmit={handleSubmit}>
          <label className="text-22 text-gray-300 font-light mb-10">
            Task name
          </label>
          <input
            className="max-w-550px bg-blue-400 bg-opacity-10 border-none p-2 text-gray-300 font-light rounded-xl text-sm outline-none"
            value={value}
            ref={inputRef}
            onChange={(e) => setValue(e.target.value)}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            placeholder="Task..."
          />
        </form>
        {noTaskAdded && (
          <div className="text-red-500 mt-4 font-light text-22">
            No task added
          </div>
        )}

        <h3 className="text-22 text-gray-300 font-light mt-10">Priority</h3>
        <div className="flex gap-5 mt-5">
          <Buttons
            selectedValues={priority}
            clickedBtn={handlePriorityChange}
          />
        </div>
        <h3 className="text-22 text-gray-300 font-light mt-10">Complexity</h3>
        <div className="flex gap-5 mt-5">
          <Buttons
            selectedValues={complexity}
            clickedBtn={handleComplexityChange}
          />
        </div>
        <div className="flex flex-col gap-8 mt-8">
          <label
            className="text-22 text-gray-300 font-light"
            htmlFor="task-date"
          >
            Due Date:
          </label>
          <form className="bg-rgba-29-161-242-10 max-w-550px rounded-10">
            <input
              className="bg-blue-400 bg-opacity-10 border-none p-2 text-gray-300 rounded-2xl text-sm font-light outline-none flex justify-between"
              type="date"
              value={dueDate}
              onChange={handleDueDateChange}
            />
          </form>
          <div className="flex flex-col gap-8">
            <label className="text-base text-gray-300 font-light">
              Sub task
            </label>
            <div className="flex flex-1">
              <input
                className="flex-1 max-w-550px bg-blue-400 bg-opacity-10 border-none p-2 text-gray-300 font-light rounded-2xl text-sm outline-none mr-4"
                value={subTask}
                onChange={handleSubTaskChange}
                ref={inputRef2}
                onFocus={handleInputFocus2}
                onBlur={handleInputBlur2}
                placeholder="Add Task..."
              />
              <button
                className="bg-blue-400 bg-opacity-10 text-gray-300 border-none p-2 md:p-4 rounded-2xl text-base md:text-sm font-light cursor-pointer"
                onClick={handleAddSubTask}
              >
                Add
              </button>
            </div>
            <ul>
              {subTasksList.map((subTask, index) => (
                <li
                  className="list-none bg-blue-400 bg-opacity-10 rounded-2xl mt-3 max-w-450 p-2 text-white flex justify-between"
                  style={{
                    textDecoration: subTask.completed ? "line-through" : "none",
                    background: subTask.completed
                      ? "rgb(200,200,200,0.1)"
                      : "rgb(1,1,1,0.3)",
                  }}
                  key={index}
                >
                  <div className="flex items-center gap-5">{subTask.name}</div>
                  <svg
                    onClick={() => removeSubTask(subTask.id)}
                    style={{ color: "white", width: "20px", cursor: "pointer" }}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                    />
                  </svg>
                </li>
              ))}
            </ul>
            <div className="mt-4 font-light">
              <Link to="/" style={{ textDecoration: "none" }}>
                <button
                  className="text-gray-500 bg-transparent py-2 px-4 rounded-2xl border-none cursor-pointer text-lg font-light transition duration-200 ease-in-out"
                  onMouseEnter={(e) => {
                    e.target.style.background = "#1da1f2";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = "none";
                  }}
                  onClick={handleSubmit}
                  type="button"
                >
                  Add Task
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddTask;
