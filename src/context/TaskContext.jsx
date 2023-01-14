import { createContext, useState, useEffect } from 'react';

// renombramos tasks para no generar conflictos
import { tasks as data } from '../data/tasks';

// nombre del contexto
export const TaskContext = createContext();

// componente que englobará a todos
export function TaskContextProvider(props) {
  // Para poder mostrar las tareas debemos guardarlas en un estado
  const [tasks, setTasks] = useState([]);

  // Cuando el componente sea creado, asigna los datos a la variable tasks
  // la cual fue asignada iniciarlmente a un array vacío []
  useEffect(() => {
    setTasks(data);
  }, []);

  function createTask(task) {
    const newTask = {
      id: tasks.length + 1,
      title: task.title,
      description: task.description,
    };

    setTasks([...tasks, newTask]);
  }

  function deleteTask(taskID) {
    setTasks(tasks.filter((task) => task.id !== taskID));
  }

  return (
    <TaskContext.Provider
      value={{
        tasks,
        createTask,
        deleteTask,
      }}>
      {props.children}
    </TaskContext.Provider>
  );
}

export default TaskContext;
