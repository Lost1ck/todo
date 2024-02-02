import PropTypes from 'prop-types';

const TaskForm = ({ taskState }) => {
  const { newTask, handleInputChange, handleKeyPress, handleMinutesChange, handleSecondsChange, minutes, seconds } =
    taskState;
  return (
    <header className="header">
      <h1>Todos</h1>
      <form onKeyDown={handleKeyPress} className="new-todo-form">
        <input type="text" value={newTask} onChange={handleInputChange} className="new-todo" placeholder="Task" />
        <input
          type="number"
          inputMode="decimal"
          value={minutes}
          onChange={handleMinutesChange}
          className="new-todo-form__timer"
          placeholder="Min"
        />
        <input
          type="number"
          inputMode="decimal"
          value={seconds}
          onChange={handleSecondsChange}
          className="new-todo-form__timer"
          placeholder="Sec"
        />
      </form>
    </header>
  );
};

TaskForm.propTypes = {
  taskState: PropTypes.shape({
    newTask: PropTypes.string.isRequired,
    handleInputChange: PropTypes.func.isRequired,
    handleKeyPress: PropTypes.func.isRequired,
  }).isRequired,
};

export default TaskForm;
