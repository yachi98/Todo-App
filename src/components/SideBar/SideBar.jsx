import React, { useContext, useState } from "react";
import { TaskContext } from "../../context/TaskContext";

const SideBar = () => {
  const { priorTasks, setPriorTasks } = useContext(TaskContext);

  return (
    <div className="w-1/5 bg-black h-[100vh]">
      <h1 className="text-stone-50 text-3xl p-3.5 font-extralight">
        Priority Tasks
      </h1>
      {/* 
      <ul>
        {priorTasks.map((task, index) => (
          <li
            style={{
              background: "red",
              padding: "10px",
              width: "90%",
              borderRadius: "10px",
              display: "flex",
              alignItems: "center",
              gap: "10px",
              marginLeft: "-20px",
              marginTop: "15px",
              background: "#39c6b3",
            }}
            key={index}
          >
            {task.value}
          </li>
        ))}
      </ul> */}
    </div>
  );
};

export default SideBar;
