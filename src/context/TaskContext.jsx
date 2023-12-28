import { createContext, useState, useContext, useEffect } from "react";
import { uid } from "uid";

export const TaskContext = createContext();

export function useTodo() {
  const value = useContext(TaskContext);
  return value;
}

export const TaskProvider = ({ children }) => {
  const storedTasks = localStorage.getItem("tasks");
  const [tasks, setTasks] = useState(JSON.parse(storedTasks));
  const [value, searchValue] = useState("");
  const [sort, setSort] = useState("");

  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const completeTask = (id) => {
    const completedTasks = tasks.map((task) => {
      if (task.id === id) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });

    setTasks(completedTasks);
  };

  const addTask = (newTodo) => {
    const newTask = [...tasks, newTodo];
    setTasks(newTask);
  };

  const removeTask = (task) => {
    const newList = tasks.filter((element) => element.id !== task);
    setTasks(newList);
  };

  const priorityTask = () => {
    if (newTask.trim() !== "") {
      const priorTaskItem = {
        id: uid(),
        value: newTask,
      };

      setTasks([...tasks, priorTaskItem]);
      setNewTask("");
    }
  };

  const handleTask = (e) => {
    searchValue(e.target.value);
  };

  const updateTask = (taskId, updatedValue) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, value: updatedValue } : task
    );

    setTasks(updatedTasks);
    setEditTaskId(null);
  };

  const getTask = (taskId) => {
    return tasks.find((task) => task.id === taskId);
  };

  const filteredTasks = tasks.filter((task) =>
    task.value.toLowerCase().includes(value.toLowerCase())
  );

  const sortTask = (sortBy) => {
    setSort(sortBy);
  };

  if (sort === "priority-high") {
    filteredTasks.sort((a, b) => b.priority - a.priority);
  } else if (sort === "priority-low") {
    filteredTasks.sort((a, b) => a.priority - b.priority);
  } else if (sort === "complexity-high") {
    filteredTasks.sort((a, b) => b.complexity - a.complexity);
  } else if (sort === "complexity-low") {
    filteredTasks.sort((a, b) => a.complexity - b.complexity);
  } else if (sort === "ascending-high") {
    filteredTasks.sort((a, b) => {
      const dateA = new Date(a.dueDate);
      const dateB = new Date(b.dueDate);

      if (isNaN(dateA) || isNaN(dateB)) {
        if (isNaN(dateA)) return 1;
        if (isNaN(dateB)) return -1;
      }

      return dateA - dateB;
    });
  } else if (sort === "descending-low") {
    filteredTasks.sort((a, b) => {
      const dateA = new Date(a.dueDate);
      const dateB = new Date(b.dueDate);

      if (isNaN(dateA) || isNaN(dateB)) {
        if (isNaN(dateA)) return -1;
        if (isNaN(dateB)) return 1;
      }

      return dateB - dateA;
    });
  }

  return (
    <TaskContext.Provider
      value={{
        tasks: filteredTasks,
        addTask,
        completeTask,
        removeTask,
        handleTask,
        sortTask,
        getTask,
        updateTask,
        priorityTask,
        value,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
