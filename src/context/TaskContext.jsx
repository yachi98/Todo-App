import { createContext, useState, useContext, useEffect } from "react";

export const TaskContext = createContext();

export function useTask() {
  const value = useContext(TaskContext);
  return value;
}

export const TaskProvider = ({ children }) => {
  const storedTasks = localStorage.getItem("tasks");
  const [tasks, setTasks] = useState(JSON.parse(storedTasks) || []);
  const [value, searchValue] = useState("");
  const [sort, setSort] = useState("");

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

  const checkSubTask = (taskId, subTaskId) => {
    const newTasks = tasks.map((task) => {
      if (task.id === taskId) {
        task.subTasksList = task.subTasksList.map((subTask) => {
          if (subTask.id === subTaskId) {
            subTask.completed = !subTask.completed;
          }

          return subTask;
        });
      }
      return task;
    });

    setTasks(newTasks);
  };

  const removeSubTask = (taskId, subTaskId) => {
    const newTasks = tasks.map((task) => {
      if (task.id === taskId) {
        task.subTasksList = task.subTasksList.filter(
          (subTask) => subTask.id !== subTaskId
        );
      }
      return task;
    });
    setTasks(newTasks);
  };

  const removeTask = (taskId) => {
    const newList = tasks.filter((element) => element.id !== taskId);
    setTasks(newList);
  };

  const handleTask = (e) => {
    searchValue(e.target.value);
  };

  const updateTask = (
    taskId,
    updatedValue,
    updatedPriority,
    updatedComplexity,
    updatedDate,
    updatedSubTasks
  ) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId
        ? {
            ...task,
            value: updatedValue,
            priority: updatedPriority,
            complexity: updatedComplexity,
            dueDate: updatedDate,
            subTasks: updatedSubTasks,
          }
        : task
    );
    setTasks(updatedTasks);
  };

  const getTask = (taskId) => {
    return tasks.find((task) => task.id === taskId);
  };

  const filteredTasks = tasks.filter((task) => {
    const filterTask = task.value.includes(value.toLowerCase());
    const filterSubTask = task.subTasksList.find((subTask) =>
      subTask.name.includes(value.toLowerCase())
    );

    return filterTask || filterSubTask;
  });

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
        checkSubTask,
        removeSubTask,
        value,
        ifDueToday,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
