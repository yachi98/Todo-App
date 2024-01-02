import { motion } from "framer-motion";
const divRef = useRef(null);

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

const SortTask = () => {
  return (
    <motion.div
      ref={divRef}
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
