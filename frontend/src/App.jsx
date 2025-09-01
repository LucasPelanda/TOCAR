import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";
import { useEffect, useState } from "react";

function App() {
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("tasks")) || []
  );

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // useEffect(()=> {

  //   async function fetchTasks() {
  //     const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=10');
  //     const data = await response.json();
  //     setTasks(data);
  //   }

  //   fetchTasks()

  // },[])

  function onTaskClick(taskID) {
    const newTasks = tasks.map((task) =>
      task.id === taskID ? { ...task, isCompleted: !task.isCompleted } : task
    );
    setTasks(newTasks);
  }

  function deleteTask(taskID) {
    const newTasks = tasks.filter((task) => task.id !== taskID);
    setTasks(newTasks);
  }

  function onAddTaskSubmit(lastID, title, description) {
    const newTask = {
      id: lastID + 1,
      title: title,
      description: description,
      isCompleted: false,
    };

    setTasks([...tasks, newTask]);
  }

  return (
    <div className="w-screen h-screen bg-slate-500 flex justify-center p-6">
      <div className="w-[500px] space-y-4">
        <h1 className="text-3xl text-slate-100 font-bold text-center">
          Gerenciador de Tarefas
        </h1>
        <AddTask onAddTaskSubmit={onAddTaskSubmit} tasks={tasks} />
        <Tasks
          tasks={tasks}
          onTaskClick={onTaskClick}
          deleteTask={deleteTask}
        />
      </div>
    </div>
  );
}

export default App;
