import { Link } from "react-router-dom";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useTask } from "../context/TaskContext";
import { motion } from "framer-motion";
import React from "react";

const TaskDetails = () => {
  const { getTask, removeTask } = useTask();
  const { id } = useParams();
  const task = getTask(id);
  const [value, setValue] = useState(task ? task.value : "");
  const { checkSubTask, removeSubTask } = useTask();
  const [subTasksList, setSubTasksList] = useState(task.subTasksList || []);

  const calculateProgress = (subTasksList) => {
    if (subTasksList.length === 0) {
      return 0;
    }

    const completedCount = subTasksList.filter((item) => item.completed).length;
    const progress = Math.floor((completedCount / subTasksList.length) * 100);
    return progress;
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

  return (
    <div className="w-full min-h-screen bg-black bg-opacity-50 backdrop-filter backdrop-blur-md p-2 md:p-4">
      <div className="w-1/3">
        <div className="mt-9 gap-5 items-center">
          <div className="mb-10">
            <Link
              to="/"
              className="no-underline text-white bg-black py-2 px-4 rounded-2xl"
            >
              Home
            </Link>
          </div>
          <div className="text-white text-3xl mb-8">{value}</div>
          <div className="flex gap-10 mb-10">
            <h2 className="text-2xl border-none p-3 rounded-2xl bg-black bg-opacity-30 text-blue-400 w-52">
              Priority: {task.priority}
            </h2>
            <h2 className="text-white text-2xl border-none p-3 rounded-2xl bg-black bg-opacity-30 w-52">
              Complexity: {task.complexity}
            </h2>
            <Link to={`/task/edit/${task.id}`}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-9 h-9 text-white cursor-pointer bg-opacity-30 p-2 rounded-3xl"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                />
              </svg>
            </Link>

            <Link to="/">
              <svg
                onClick={() => removeTask(task.id)}
                xmlns="http://www.w3.org/2000/svg"
                fill="white"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-9 h-9 text-white cursor-pointer bg-opacity-30 p-2 rounded-3xl"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                />
              </svg>
            </Link>
          </div>
        </div>
        <div className="flex flex-col">
          {task.date && (
            <span
              className={`font-normal bg-black bg-opacity-50 p-5 rounded-2xl mb-10 ${ifDueToday(
                task.date
              )}`}
              style={{
                fontSize: "25px",
              }}
            >
              Due date: {task.date}
            </span>
          )}
          <span className="text-white text-2xl mb-8">
            Subtask Checklist {task.subValue}
          </span>
        </div>
        {task.subTasksList.map((subTask, index) => (
          <li
            className="list-none bg-blue-400 bg-opacity-10 rounded-2xl mt-3 max-w-450 p-3 text-white flex justify-between"
            style={{
              textDecoration: subTask.completed ? "line-through" : "none",
              background: subTask.completed
                ? "rgb(200,200,200,0.1)"
                : "rgb(1,1,1,0.3)",
            }}
            key={index}
          >
            <div className="flex items-center gap-5">
              <svg
                onClick={() => checkSubTask(task.id, subTask.id)}
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

              {subTask.name}
            </div>
            <svg
              onClick={() => removeSubTask(task.id, subTask.id)}
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
        {subTasksList.length > 0 && (
          <div>
            <div className="w-full h-1 relative my-1">
              <span
                className={`w-full h-1 absolute right-0 top-0 rounded-sm opacity-20`}
              ></span>
              <p className="text-white text-2xl mb-10">Progress</p>
              <motion.span
                className={`rounded-sm h-1 block bg-blue-400 opacity-100 relative `}
                initial={{ width: "0%" }}
                animate={{
                  width: `${calculateProgress(task.subTasksList)}%`,
                }}
                transition={{ duration: 0.5 }}
              ></motion.span>
            </div>
            <p className="float-right text-white text-2xl">
              {calculateProgress(task.subTasksList)}%
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskDetails;
