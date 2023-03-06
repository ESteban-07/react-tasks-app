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

  useEffect(() => {
    localStorage.setItem('data', JSON.stringify(tasks));
  }, [tasks]);

  function generateRandomUniqueID() {
    const generateID = () => {
      return Math.floor(Math.random() * 1000);
    };

    let ID = generateID();

    if (tasks.length) {
      for (let i = 0; i < tasks.length; i++) {
        while (tasks[i].id === ID) {
          ID = generateID();
          i = 0;
        }

        if (i === tasks.length - 1) {
          return ID;
        }
      }
    }

    return ID;
  }

  function createTask(task) {
    const newTask = {
      id: generateRandomUniqueID(),
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
