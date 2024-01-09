import { Link } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { motion } from "framer-motion";
import { useRef } from "react";
import SortTask from "../components/SortTask";
// import HighestValueTask from "../components/HighestValueTask";
import { TaskContext } from "../context/TaskContext";

const Home = () => {
  const inputRef = useRef(null);
  const { tasks } = useContext(TaskContext);
  const { removeTask, completeTask, handleTask } = useContext(TaskContext);
  const divRef = useRef(null);
  const [showFilters, setShowFilters] = useState(false);
  const [isPowerMode, setIsPowerMode] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState("black");
  const [highestPriorityTask, setHighestPriority] = useState(null);

  const handlePower = () => {
    setIsPowerMode(!isPowerMode);
    setBackgroundColor(isPowerMode ? "black" : "#1da1f2");

    const nextHighestPriorityTask = tasks.reduce((highestTask, currentTask) => {
      const isHigherPriority =
        currentTask.priority + currentTask.complexity >=
        highestTask.priority + highestTask.complexity;

      return isHigherPriority ? currentTask : highestTask;
    });

    setHighestPriority(nextHighestPriorityTask);
  };

  const isToday = (dueDate) => {
    if (!dueDate) {
      return false;
    }
    const today = new Date();
    return (
      dueDate.getDate() === today.getDate() &&
      dueDate.getMonth() === today.getMonth() &&
      dueDate.getFullYear() === today.getFullYear()
    );
  };

  const ifDueToday = (dueDate) => {
    if (!dueDate) {
      return null;
    }

    const formattedDueDate = new Date(dueDate);
    const today = new Date();
    const differenceInTime = formattedDueDate.getTime() - today.getTime();
    const differenceInDays = differenceInTime / (1000 * 3600 * 24);

    if (isToday(formattedDueDate)) {
      return "text-red-500";
    } else if (differenceInDays <= 3 && differenceInDays > 0) {
      return "text-orange-500";
    } else {
      return "text-green-500";
    }
  };

  const handleInputFocus = () => {
    inputRef.current.style.border = "1px solid #1da1f2";
    inputRef.current.style.outlineOffset = "3px";
  };

  const handleInputBlur = () => {
    inputRef.current.style.border = "none";
  };

  const handleClick = () => {
    setShowFilters(true);
  };

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (divRef.current && !divRef.current.contains(e.target)) {
        setShowFilters(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div className="w-full pl-5">
      <div className="flex">
        <input
          className="px-4 min-w-[30rem] my-5 rounded-2xl text-sm outline-none bg-black bg-opacity-50 backdrop-blur-10 text-white"
          placeholder="Search"
          ref={inputRef}
          onChange={handleTask}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
        />

        <div className="flex">
          <Link
            to="/task/add"
            className="m-5 p-2 rounded-2xl border-none bg-white cursor-pointer no-underline text-black text-base"
          >
            Add Task
          </Link>
          <button
            className="m-5 p-2 rounded-2xl border-none cursor-pointer text-white text-base transition duration-200 ease-in-out"
            style={{ backgroundColor }}
            onClick={handlePower}
          >
            Power Mode
          </button>
          <div>
            <button
              onClick={handleClick}
              className="text-white font-light text-base mt-5 p-2 w-24 bg-black rounded-2xl border-none cursor-pointer"
            >
              Sort
            </button>

            {showFilters && (
              <div ref={divRef}>
                <SortTask />
              </div>
            )}
          </div>
        </div>
      </div>

      <h1 className="text-white font-light mt-32 text-4xl inline-block">
        All Tasks
      </h1>

      <ul className="list-none min-w-360 mt-8 flex flex-wrap gap-4">
        {isPowerMode && highestPriorityTask ? (
          // <HighestValueTask />
          <motion.li
            initial={{ y: 35 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.3 }}
            key={highestPriorityTask.id}
            style={{
              background: highestPriorityTask.completed
                ? "#1da1f2"
                : "rgb(1,1,1,0.3)",
            }}
            className="p-4 rounded-2xl backdrop-filter backdrop-blur-md h-48 w-96 flex flex-col gap-4 transition duration-200 ease-out"
          >
            <div className="flex justify-between items-center">
              <Link
                to={`/task/${highestPriorityTask.id}`}
                style={{ textDecoration: "none" }}
              >
                <strong
                  style={{
                    fontWeight: 300,
                    color: highestPriorityTask.completed
                      ? "#000517"
                      : "#E1E1E1",
                    fontSize: "20px",
                    cursor: "pointer",
                  }}
                >
                  {highestPriorityTask.value}
                </strong>
              </Link>
              <div className="flex gap-4">
                <svg
                  onClick={() => completeTask(highestPriorityTask.id)}
                  className="text-white w-6 cursor-pointer"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <Link to={`/task/edit/${highestPriorityTask.id}`}>
                  <svg
                    className="text-white w-6 cursor-pointer"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                    />
                  </svg>
                </Link>

                <svg
                  onClick={() => removeTask(highestPriorityTask.id)}
                  className="text-white w-6 cursor-pointer"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                  />
                </svg>
              </div>
            </div>
            <div
              style={{
                color: highestPriorityTask.completed ? "#000517" : "#E1E1E1",
                fontWeight: 400,
              }}
            >
              Priority: {highestPriorityTask.priority}
            </div>
            <div
              style={{
                color: highestPriorityTask.completed ? "#000517" : "#E1E1E1",
                fontWeight: 400,
              }}
            >
              Complexity: {highestPriorityTask.complexity}
            </div>

            <div
              className={`font-normal ${ifDueToday(highestPriorityTask.date)}`}
              style={{
                fontWeight: highestPriorityTask.completed ? 400 : 300,
                fontSize: "15px",
              }}
            >
              Due date: {highestPriorityTask.date}
            </div>
          </motion.li>
        ) : (
          tasks.map((task) => (
            <motion.li
              initial={{ y: 35 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.3 }}
              key={task.id}
              style={{
                background: task.completed
                  ? "rgb(200,200,200,0.1)"
                  : "rgb(1,1,1,0.3)",
                color: task.completed ? "white" : "#E1E1E1",
              }}
              className="p-4 rounded-2xl backdrop-filter backdrop-blur-md h-48 w-96 flex flex-col gap-4 transition duration-200 ease-out"
            >
              <div className="flex justify-between items-center">
                <Link
                  to={`/task/${task.id}`}
                  style={{ textDecoration: "none" }}
                >
                  <strong
                    className="cursor-pointer text-lg"
                    style={{
                      fontWeight: task.completed ? 400 : 300,
                    }}
                  >
                    {task.value}
                  </strong>
                </Link>
                <div className="flex gap-4">
                  <svg
                    onClick={() => completeTask(task.id)}
                    className="text-white w-6 cursor-pointer"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <Link to={`/task/edit/${task.id}`}>
                    <svg
                      className="text-white w-6 cursor-pointer"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                      />
                    </svg>
                  </Link>

                  <svg
                    onClick={() => removeTask(task.id)}
                    className="text-white w-6 cursor-pointer"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                    />
                  </svg>
                </div>
              </div>

              <div
                style={{
                  fontWeight: 400,
                }}
              >
                Priority: {task.priority}
              </div>
              <div
                style={{
                  fontWeight: 400,
                }}
              >
                Complexity: {task.complexity}
              </div>

              <div
                className={`font-normal ${ifDueToday(task.date)}`}
                style={{
                  fontWeight: task.completed ? 400 : 300,
                  fontSize: "15px",
                }}
              >
                Due date: {task.date}
              </div>
            </motion.li>
          ))
        )}
      </ul>
    </div>
  );
};

export default Home;
