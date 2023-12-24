import { useState, useRef, useEffect } from "react";
import Buttons from "../components/Buttons/Buttons";
import { Link, useParams } from "react-router-dom";
import { TaskContext, useTodo } from "../context/TaskContext";

const EditTask = () => {
  const { tasks, getTask, updateTask } = useTodo();
  const { id } = useParams();
  const task = getTask(id);
  const inputRef = useRef(null);
  const inputRef2 = useRef(null);
  const [value, setValue] = useState(task ? task.value : "");
  const [dueDate, setDueDate] = useState(Date || null);
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
    updateTask(tasks, value, priority, complexity);
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
    <div
      style={{
        width: "80%",
        height: "100vh",
        background: "rgb(1,1,1,0.5)",
        backdropFilter: " blur(10px)",
        padding: "10px 20px",
      }}
    >
      <div style={{ marginTop: "35px" }}>
        <Link
          to="/"
          style={{
            textDecoration: "none",
            color: "grey",
            background: "black",
            padding: "10px",
            borderRadius: "10px",
            background: "linear-gradient(to right, #0074D9, #7FDBFF)",
            WebkitBackgroundClip: "text",
            color: "transparent",
          }}
        >
          Home
        </Link>
      </div>
      <div style={{ marginTop: "70px" }}>
        <h3
          style={{
            fontSize: "22px",
            color: "#DEDEDE",
            fontWeight: 300,
            background: "linear-gradient(to left, #0074D9, #7FDBFF)",
            WebkitBackgroundClip: "text",
            color: "transparent",
          }}
        >
          Add Task
        </h3>
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
            style={{
              maxWidth: "550px",
              background: "rgb(29, 161, 242, 0.1)",
              border: "none",
              padding: "10px",
              color: "#DEDEDE",
              fontWeight: 300,
              borderRadius: "10px",
              fontSize: "15px",
              outline: "none",
            }}
            value={value}
            ref={inputRef}
            onChange={(e) => setValue(e.target.value)}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            placeholder="Task..."
          />
        </form>
        {noTaskAdded && (
          <div
            style={{
              color: "#EE4D4D",
              marginTop: "10px",
              fontWeight: 300,
              fontSize: "20px",
            }}
          >
            No task added
          </div>
        )}

        <h3 style={{ fontSize: "20px", color: "#DEDEDE", fontWeight: 300 }}>
          Priority
        </h3>
        <div style={{ display: "flex", gap: "8px" }}>
          <Buttons
            selectedValues={priority}
            clickedBtn={handlePriorityChange}
          />
        </div>
        <h3 style={{ fontSize: "20px", color: "#DEDEDE", fontWeight: 300 }}>
          Complexity
        </h3>
        <div style={{ display: "flex", gap: "8px" }}>
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
          <form
            style={{
              background: "rgb(29, 161, 242, 0.1)",
              maxWidth: "550px",
              borderRadius: "10px",
            }}
          >
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
              //   id="task-date"
              type="date"
              value={dueDate}
              onChange={handleDueDateChange}
            />
          </form>
          <div
            style={{
              display: "flex",
              //   alignItems: "center",
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
              <button
                style={{
                  background: "rgb(29, 161, 242, 0.1)",
                  color: "#DEDEDE",
                  border: "none",
                  padding: "10px 20px",
                  borderRadius: "10px",
                  fontSize: "15px",
                  fontWeight: 300,
                  cursor: "pointer",
                }}
              >
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
