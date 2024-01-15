import { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';

const UseTaskState = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [completedTasks, setCompletedTasks] = useState([]);
  const [filter, setFilter] = useState('all');

  const handleAddTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { id: Date.now(), text: newTask, createdAt: new Date() }]);
      setNewTask('');
    }
  }; // добавление в массив такски

  const clearAllcompleted = () => {
    const updatedTasks = tasks.filter((task) => !completedTasks.includes(task.id));
    setTasks(updatedTasks);
    setCompletedTasks([]);
  }; // удаление всех завершенных задач

  const counterOfTasks = () => tasks.length - completedTasks.length; // количество активных тасок

  const handleInputChange = (e) => {
    setNewTask(e.target.value);
  }; // ввод.отображение

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddTask();
      e.preventDefault();
    }
  }; // ввод таски через enter

  const handleDeleteTask = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    setCompletedTasks((p) => p.filter((id) => id !== taskId));
  }; // удаление таски

  const toggleTaskCompletion = (taskId) => {
    if (completedTasks.includes(taskId)) {
      setCompletedTasks(completedTasks.filter((id) => id !== taskId));
    } else {
      setCompletedTasks([...completedTasks, taskId]);
    }
  }; // переключение состояния таски

  return {
    setTasks,
    formatDistanceToNow,
    filter,
    setFilter,
    clearAllcompleted,
    counterOfTasks,
    toggleTaskCompletion,
    completedTasks,
    tasks,
    newTask,
    handleAddTask,
    handleDeleteTask,
    handleInputChange,
    handleKeyPress,
  };
};

export default UseTaskState;
