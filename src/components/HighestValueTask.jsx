// import { motion } from "framer-motion";
// import { useContext, useState } from "react";
// import { TaskContext } from "../context/TaskContext";
// import { Link } from "react-router-dom";

// const HighestValueTask = () => {
//   const [highestPriorityTask, setHighestPriority] = useState(null);
//   const { tasks } = useContext(TaskContext);
//   const { removeTask, completeTask } = useContext(TaskContext);
//   const [isPowerMode, setIsPowerMode] = useState(false);

//   const handlePower = () => {
//     setIsPowerMode(!isPowerMode);
//     setBackgroundColor(isPowerMode ? "black" : "#1da1f2");

//     const nextHighestPriorityTask = tasks.reduce((highestTask, currentTask) => {
//       const isHigherPriority =
//         currentTask.priority + currentTask.complexity >=
//         highestTask.priority + highestTask.complexity;

//       return isHigherPriority ? currentTask : highestTask;
//     });

//     setHighestPriority(nextHighestPriorityTask);
//   };
//   return (
//     <>
//     {highestPriorityTask && (
//     <motion.li
//       initial={{ y: 35 }}
//       animate={{ y: 0 }}
//       transition={{ duration: 0.3 }}
//       key={highestPriorityTask.id}
//       style={{
//         background: highestPriorityTask.completed
//           ? "#1da1f2"
//           : "rgb(1,1,1,0.3)",
//       }}
//       className="p-4 rounded-2xl backdrop-filter backdrop-blur-md h-48 w-96 flex flex-col gap-4 transition duration-200 ease-out"
//     >
//       <div className="flex justify-between items-center">
//         <Link
//           to={`/task/${highestPriorityTask.id}`}
//           style={{ textDecoration: "none" }}
//         >
//           <strong
//             style={{
//               fontWeight: highestPriorityTask.completed ? 400 : 300,
//               color: highestPriorityTask.completed ? "#000517" : "#E1E1E1",
//               fontSize: "20px",
//               cursor: "pointer",
//             }}
//           >
//             {highestPriorityTask.value}
//           </strong>
//         </Link>
//         <div className="flex gap-4">
//           <svg
//             onClick={() => completeTask(highestPriorityTask.id)}
//             className="text-white w-6 cursor-pointer"
//             xmlns="http://www.w3.org/2000/svg"
//             fill="none"
//             viewBox="0 0 24 24"
//             strokeWidth={1.5}
//             stroke="currentColor"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
//             />
//           </svg>
//           <Link to={`/task/edit/${highestPriorityTask.id}`}>
//             <svg
//               className="text-white w-6 cursor-pointer"
//               xmlns="http://www.w3.org/2000/svg"
//               fill="none"
//               viewBox="0 0 24 24"
//               strokeWidth={1.5}
//               stroke="currentColor"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
//               />
//             </svg>
//           </Link>

//           <svg
//             onClick={() => removeTask(highestPriorityTask.id)}
//             className="text-white w-6 cursor-pointer"
//             xmlns="http://www.w3.org/2000/svg"
//             fill="none"
//             viewBox="0 0 24 24"
//             strokeWidth={1.5}
//             stroke="currentColor"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
//             />
//           </svg>
//         </div>
//       </div>
//       <div
//         style={{
//           color: highestPriorityTask.completed ? "#000517" : "#E1E1E1",
//           fontWeight: 400,
//         }}
//       >
//         Priority: {highestPriorityTask.priority}
//       </div>
//       <div
//         style={{
//           color: highestPriorityTask.completed ? "#000517" : "#E1E1E1",
//           fontWeight: 400,
//         }}
//       >
//         Complexity: {highestPriorityTask.complexity}
//       </div>

//       <div
//         style={{
//           color: highestPriorityTask.completed ? "#000517" : "#E1E1E1",
//           fontWeight: highestPriorityTask.completed ? 400 : 300,
//           fontSize: "15px",
//         }}
//       >
//         Due date: {highestPriorityTask.date}
//       </div>
//     </motion.li>
//     )};
//     </>
// );

// export default HighestValueTask;