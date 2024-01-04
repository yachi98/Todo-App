import { motion } from "framer-motion";
import { useRef, useContext, useEffect } from "react";
import { TaskContext } from "../context/TaskContext";
import SortItem from "../components/SortItem";

const SortTask = () => {
  const { sortTask } = useContext(TaskContext);

  return (
    <motion.div
      initial={{ y: 15 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-opacity-50 w-52 h-96 rounded-xl absolute top-20 z-50 flex flex-col backdrop-filter backdrop-blur-md"
    >
      <SortItem
        onClick={() => sortTask("default")}
        text="Default"
        sortBy="default"
      />
      <SortItem
        onClick={() => sortTask("priority-high")}
        text="Top Priority"
        sortBy="priority"
      />
      <SortItem
        onClick={() => sortTask("priority-low")}
        text="Low Priority"
        sortBy="priority"
      />
      <SortItem
        onClick={() => sortTask("complexity-high")}
        text="Most Complex"
        sortBy="complexity"
      />
      <SortItem
        onClick={() => sortTask("complexity-low")}
        text="Least Complex"
        sortBy="complexity"
      />
      <SortItem
        onClick={() => sortTask("ascending-high")}
        text="Date Ascending"
        sortBy="dueDate"
      />
      <SortItem
        onClick={() => sortTask("descending-low")}
        text="Date Descending"
        sortBy="dueDate"
      />
    </motion.div>
  );
};

export default SortTask;
