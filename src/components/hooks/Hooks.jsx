import { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import PropTypes from 'prop-types';

const UseTaskState = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [completedTasks, setCompletedTasks] = useState([]);
  const [filter, setFilter] = useState('all');
  const [minutes, setMinutes] = useState('');
  const [seconds, setSeconds] = useState('');

  const handleAddTask = () => {
    if (newTask.trim() && minutes.trim() && seconds.trim()) {
      setTasks([
        ...tasks,
        {
          id: Date.now(),
          text: newTask,
          createdAt: new Date(),
          duration: parseInt(minutes, 10) * 60 + parseInt(seconds, 10),
        },
      ]);
      setMinutes('');
      setSeconds('');
      setNewTask('');
    }
    console.log(minutes, seconds);
  }; // добавление в массив такски

  const clearAllcompleted = () => {
    const updatedTasks = tasks.filter((task) => !completedTasks.includes(task.id));
    setTasks(updatedTasks);
    setCompletedTasks([]);
  }; // удаление всех завершенных задач

  const counterOfTasks = () => tasks.length - completedTasks.length; // количество активных тасок

  const handleSecondsChange = (e) => {
    const eTarget = e.target.value;
    eTarget > 59 ? '' : setSeconds(eTarget);
  }; // ввод.отображение

  const handleMinutesChange = (e) => {
    const eTarget = e.target.value;

    eTarget > 59 ? '' : setMinutes(eTarget);
  }; // ввод.отображение

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
    handleSecondsChange,
    handleMinutesChange,
    minutes,
    seconds,
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

UseTaskState.propTypes = {
  setTasks: PropTypes.func.isRequired,
  formatDistanceToNow: PropTypes.func.isRequired,
  filter: PropTypes.string.isRequired,
  setFilter: PropTypes.func.isRequired,
  clearAllcompleted: PropTypes.func.isRequired,
  counterOfTasks: PropTypes.func.isRequired,
  toggleTaskCompletion: PropTypes.func.isRequired,
  completedTasks: PropTypes.arrayOf(PropTypes.number).isRequired,
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      text: PropTypes.string.isRequired,
      createdAt: PropTypes.instanceOf(Date).isRequired,
    })
  ).isRequired,
  newTask: PropTypes.string.isRequired,
  handleAddTask: PropTypes.func.isRequired,
  handleDeleteTask: PropTypes.func.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  handleKeyPress: PropTypes.func.isRequired,
};

export default UseTaskState;
