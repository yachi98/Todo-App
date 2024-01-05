import { Link } from "react-router-dom";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useTodo } from "../context/TaskContext";
import { motion } from "framer-motion";
import React from "react";

const TaskDetails = () => {
  const { getTask, removeTask } = useTodo();
  const { id } = useParams();
  const task = getTask(id);
  const [value, setValue] = useState(task ? task.value : "");

  const progress = Math.floor(
    (task.subTasksList.filter((item) => item.isCompleted === true).length /
      task.subTasksList.length) *
      100
  );

  // let progress = 0;
  // if (task && task.checklist && task.checklist.length > 0) {
  //   const completedCount = task.checklist.filter(
  //     (item) => item.isCompleted
  //   ).length;
  //   progress = Math.floor((completedCount / task.checklist.length) * 100);
  // }

  console.log(progress);

  return (
    <div className="w-full min-h-screen bg-black bg-opacity-50 backdrop-filter backdrop-blur-md p-2 md:p-4">
      <div className="mt-9 flex gap-5 items-center">
        <Link
          to="/"
          className="no-underline text-white bg-black py-2 px-4 rounded-lg"
        >
          Home
        </Link>
        <div className="text-white text-2xl">{value}</div>
        <div className="text-white border-none p-2 rounded-lg bg-purple-400 w-28">
          Priority: {task.priority}
        </div>
        <div className="text-black border-none p-2 rounded-lg bg-white w-36">
          Complexity: {task.complexity}
        </div>
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
        <div>
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
        <span className="text-white">Due date: {task.date}</span>
        <span className="text-white">Subtask Checklist {task.subValue}</span>
        {task.subTasksList.map((subTask, index) => (
          <span
            className="list-none bg-blue-400 bg-opacity-10 rounded-lg mt-10 max-w-450 p-3 text-white flex justify-between"
            key={index}
          >
            {subTask.name}
          </span>
        ))}
        {task.subTasksList.length > 0 && (
          <div>
            <p className="text-white">Progress</p>
            <div className="w-full h-1 relative my-1">
              <span
                className={`w-full h-1 absolute right-0 top-0 rounded-sm opacity-20`}
              ></span>
              <motion.span
                className={`rounded-sm h-1 block bg-red-500 opacity-100 relative`}
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5 }}
              ></motion.span>
            </div>
            <p className="float-right text-white">{progress}%</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskDetails;
