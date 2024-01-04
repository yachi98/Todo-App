import { useState, useRef } from "react";
import Buttons from "../components/Buttons";
import { Link, useNavigate } from "react-router-dom";
import { uid } from "uid";
import { useTodo } from "../context/TaskContext";

const AddTask = () => {
  const inputRef = useRef(null);
  const inputRef2 = useRef(null);
  const [value, setValue] = useState("");
  const [complexity, setComplexity] = useState(null);
  const [priority, setPriority] = useState(null);
  const [dueDate, setDueDate] = useState(Date || null);
  const [noTaskAdded, setNoTaskAdded] = useState(false);
  const myContext = useTodo();
  const [subTask, setSubTask] = useState("");
  const [subTasksList, setSubTasksList] = useState([]);
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

  const checkSubmit = () => {
    if (value.trim() === "") {
      setNoTaskAdded(true);
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!checkSubmit()) {
      return;
    }

    const item = {
      value,
      completed: false,
      priority,
      complexity,
      date: dueDate,
      id: uid(),
      subTasksList,
    };
    myContext.addTask(item);
    console.log(item);

    setValue("");
    setDueDate("");
    setNoTaskAdded(false);
    setPriority(null);
    setComplexity(null);
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

  const handleSubTaskChange = (e) => {
    setSubTask(e.target.value);
  };

  const handleAddSubTask = () => {
    if (subTask.trim() !== "") {
      const newSubTask = {
        name: subTask,
        isCompleted: false,
        id: uid(),
      };
      setSubTasksList([...subTasksList, newSubTask]);
      setSubTask("");
    }
  };

  const removeSubTask = (subTask) => {
    const newList = subTasksList.filter((element) => element.id !== subTask);
    setSubTasksList(newList);
  };

  const checkSubTask = (id) => {
    const newList = subTasksList.map((element) => {
      if (element.id === id) {
        element.isCompleted = !element.isCompleted;
      }
      return element;
    });
    setSubTasksList(newList);
  };

  return (
    <div className="w-full h-screen bg-opacity-50 bg-black backdrop-blur-md p-10 md:p-20 flex justify-center">
      <div style={{ marginTop: "35px" }}>
        <Link
          to="/"
          style={{
            textDecoration: "none",
            background: "black",
            padding: "10px",
            borderRadius: "10px",
            color: "white",
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
          }}
        >
          Add Task
        </h3>
        <form
          style={{ display: "flex", flexDirection: "column", gap: "30px" }}
          onSubmit={handleSubmit}
        >
          <label
            style={{
              fontSize: "20px",
              color: "#DEDEDE",
              fontWeight: 300,
            }}
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

        <h3
          style={{
            fontSize: "20px",
            color: "#DEDEDE",
            fontWeight: 300,
            marginTop: "40px",
          }}
        >
          Priority
        </h3>
        <div style={{ display: "flex", gap: "15px", marginTop: "20px" }}>
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
        <div style={{ display: "flex", gap: "15px", marginTop: "20px" }}>
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
            style={{
              fontSize: "20px",
              color: "#DEDEDE",
              fontWeight: 300,
            }}
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
                display: "flex",
                justifyContent: "space-between",
              }}
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
                value={subTask}
                onChange={handleSubTaskChange}
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
                onClick={handleAddSubTask}
              >
                Add
              </button>
            </div>
            <ul style={{ marginTop: "-30px" }}>
              {subTasksList.map((task, index) => (
                <li
                  style={{
                    listStyle: "none",
                    background: "rgb(29, 161, 242, 0.1)",
                    borderRadius: "10px",
                    marginTop: "10px",
                    maxWidth: "450px",
                    padding: "10px",
                    color: "white",
                    textDecoration: task.isCompleted ? "line-through" : "none",
                    display: "flex",
                    justifyContent: "space-between",
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
            </ul>
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
            Add Task
          </button>
        </Link>
      </div>
    </div>
  );
};

export default AddTask;
