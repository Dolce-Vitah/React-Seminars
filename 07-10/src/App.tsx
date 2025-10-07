import React, { useState, useRef } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import type { Task } from './types/task';
import './styles/App.css'

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [currentTask, setCurrentTask] = useState<Task | null>(null);
  const previousTaskRef = useRef<Task | null>(null);

  const addTask = (title: string) => {
    const newTask: Task = {
      id: Date.now(),
      title,
      completed: false,
    };
    previousTaskRef.current = currentTask;
    setCurrentTask(newTask);
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  const deleteTask = (id: number) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  const toggleComplete = (id: number) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <div className='app'>
      <h1>Список задач</h1>
      <TaskForm onAddTask={addTask} />
      <TaskList
        tasks={tasks}
        onDeleteTask={deleteTask}
        onToggleComplete={toggleComplete}
      />
      <div className="task-info" style={{ marginTop: '20px', fontStyle: 'italic' }}>
        <p>
          <strong>Текущая задача:</strong>{' '}
          {currentTask ? currentTask.title : 'Нет'}
        </p>
        <p>
          <strong>Предыдущая задача:</strong>{' '}
          {previousTaskRef.current ? previousTaskRef.current.title : 'Нет'}
        </p>
      </div>
    </div>
  );
};

export default App;