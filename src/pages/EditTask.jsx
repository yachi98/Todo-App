import { useState, useRef } from "react";
import Buttons from "../components/Buttons";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useTodo } from "../context/TaskContext";

const EditTask = () => {
  const { tasks, getTask, updateTask, addTask } = useTodo();
  const { id } = useParams();
  const task = getTask(id);
  const inputRef = useRef(null);
  const inputRef2 = useRef(null);
  const [value, setValue] = useState(task.value);
  const [dueDate, setDueDate] = useState(task.date);
  const [priority, setPriority] = useState(task.priority);
  const [complexity, setComplexity] = useState(task.complexity);
  const [subTasksList, setSubTasksList] = useState(task.subTasks);
  const [noTaskAdded, setNoTaskAdded] = useState(false);
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value.trim() === "") {
      setNoTaskAdded(true);
      return;
    }
    updateTask(id, value, priority, complexity);
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

  return (
    <div className="w-full h-screen bg-black bg-opacity-50 backdrop-filter backdrop-blur-10 p-10 flex justify-center">
      <div style={{ marginTop: "35px" }}>
        <Link
          className="decoration-none bg-black p-3 text-white rounded-xl"
          to="/"
        >
          Home
        </Link>
      </div>
      <div style={{ marginTop: "70px" }}>
        <h3 className="text-gray-300 text-lg font-light">Add Task</h3>
        <form
          style={{ display: "flex", flexDirection: "column", gap: "30px" }}
          onSubmit={handleSubmit}
        >
          <label
            style={{ fontSize: "20px", color: "#DEDEDE", fontWeight: 300 }}
          >
            Task name
          </label>
          <input
            className="max-w-550px bg-blue-400 bg-opacity-10 border-none p-3 text-gray-300 font-light rounded-lg text-base outline-none"
            value={value}
            ref={inputRef}
            onChange={(e) => setValue(e.target.value)}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            placeholder="Task..."
          />
        </form>
        {noTaskAdded && (
          <div className="text-red-500 mt-4 font-light text-lg">
            No task added
          </div>
        )}

        <h3 className="text-lg text-gray-300 font-light mt-10">Priority</h3>
        <div className="flex gap-5 mt-5">
          <Buttons
            selectedValues={priority}
            clickedBtn={handlePriorityChange}
          />
        </div>
        <h3 className="text-lg text-gray-300 font-light mt-10">Complexity</h3>
        <div className="flex gap-4 mt-5">
          <Buttons
            selectedValues={complexity}
            clickedBtn={handleComplexityChange}
          />
        </div>
        <div className="flex flex-col gap-8 mt-8">
          <label
            className="text-lg text-gray-300 font-light"
            htmlFor="task-date"
          >
            Due Date:
          </label>
          <form className="bg-rgba-29-161-242-10 max-w-550px rounded-10">
            <input
              className="bg-transparent border-none p-4 text-gray-300 rounded-md text-base font-light outline-none flex justify-between"
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
                className="flex-1 max-w-450px bg-blue-400 bg-opacity-10 border-none py-2 px-4 text-gray-300 font-light rounded-lg text-base outline-none mr-4"
                ref={inputRef2}
                onFocus={handleInputFocus2}
                onBlur={handleInputBlur2}
                placeholder="Add Task..."
              />
              <button className="bg-rgba-29-161-242-10 text-white border-none p-2 md:p-4 rounded-10 text-base md:text-lg font-light cursor-pointer">
                Add
              </button>
            </div>
            {/* <ul style={{ marginTop: "-30px" }}>
              {subTasksList.map((task, index) => (
                <li
                  className="list-none bg-blue-400 bg-opacity-10 rounded-lg mt-10 max-w-450 p-3 text-white flex justify-between"
                  style={{
                    textDecoration: task.isCompleted ? "line-through" : "none",
                  }}
                  key={index}
                >
                  <svg
                    onClick={() => checkSubTask(task.id)}
                    style={{ color: "white", width: "20px", cursor: "pointer" }}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    dataSlot="icon"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>

                  {task.name}
                  <svg
                    onClick={() => removeSubTask(task.id)}
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
            </ul> */}
          </div>
        </div>
      </div>

      <div className="mt-16 font-light">
        <Link to="/" style={{ textDecoration: "none" }}>
          <button
            className="text-gray-500 bg-transparent py-2 px-4 rounded-lg border-none cursor-pointer text-lg font-light transition duration-200 ease-in-out"
            onMouseEnter={(e) => {
              e.target.style.background = "#7FDBFF";
              e.target.style.color = "#000517";
            }}
            onMouseLeave={(e) => {
              e.target.style.background = "none";
              e.target.style.color = "#7FDBFF";
            }}
            onClick={handleSubmit}
            type="button"
          >
            Save Task
          </button>
        </Link>
      </div>
    </div>
  );
};

export default EditTask;
