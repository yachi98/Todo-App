import { useState, useRef } from "react";
import Buttons from "../components/Buttons";
import { Link, useParams } from "react-router-dom";
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
  const [noTaskAdded, setNoTaskAdded] = useState(false);

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
    updateTask(tasks, value, priority, complexity, addTask);
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
          className="text-white no-underline bg-black p-10 rounded-2xl"
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
            className="max-w-550px bg-blue-400 bg-opacity-25 border-0 p-10 text-white font-light rounded-lg text-base outline-none"
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

        <h3 className="text-gray-300 text-lg font-light mt-10">Priority</h3>
        <div className="flex gap-4 mt-5">
          <Buttons
            selectedValues={priority}
            clickedBtn={handlePriorityChange}
          />
        </div>
        <h3
          style={{
            fontSize: "20px",
            color: "#DEDEDE",
            fontWeight: 300,
            marginTop: "40px",
          }}
        >
          Complexity
        </h3>
        <div className="flex gap-4 mt-5">
          <Buttons
            selectedValues={complexity}
            clickedBtn={handleComplexityChange}
          />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "30px",
            marginTop: "30px",
          }}
        >
          <label
            style={{ fontSize: "20px", color: "#DEDEDE", fontWeight: 300 }}
            htmlFor="task-date"
          >
            Due Date:
          </label>
          <form className="bg-rgba-29-161-242-10 max-w-550px rounded-10">
            <input
              style={{
                background: "none",
                border: "none",
                padding: "10px",
                color: "#DEDEDE",
                borderRadius: "10px",
                fontSize: "15px",
                fontWeight: 300,
                outline: "none",
              }}
              type="date"
              value={dueDate}
              onChange={handleDueDateChange}
            />
          </form>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "30px",
            }}
          >
            <label
              style={{
                fontSize: "20px",
                color: "#DEDEDE",
                fontWeight: 300,
              }}
            >
              Sub task
            </label>
            <div style={{ flex: 1, display: "flex" }}>
              <input
                style={{
                  flex: 1,
                  maxWidth: "450px",
                  background: "rgb(29, 161, 242, 0.1)",
                  border: "none",
                  padding: "10px",
                  color: "#DEDEDE",
                  fontWeight: 300,
                  borderRadius: "10px",
                  fontSize: "15px",
                  outline: "none",
                  marginRight: "10px", // Adjust margin as needed
                }}
                // value={value}
                ref={inputRef2}
                onFocus={handleInputFocus2}
                onBlur={handleInputBlur2}
                placeholder="Add Task..."
              />
              <button className="bg-rgba-29-161-242-10 text-white border-none p-2 md:p-4 rounded-10 text-base md:text-lg font-light cursor-pointer">
                Add
              </button>
            </div>
          </div>
        </div>
      </div>

      <div style={{ marginTop: "50px", fontWeight: 300 }}>
        <Link to="/" style={{ textDecoration: "none" }}>
          <button
            style={{
              color: "grey",
              background: "none",
              padding: "10px 20px",
              borderRadius: "10px",
              border: "none",
              cursor: "pointer",
              fontSize: "20px",
              fontWeight: 300,
              transition: "background-color 0.2s ease",
            }}
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
