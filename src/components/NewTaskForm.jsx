import PropTypes from 'prop-types';

const TaskForm = ({ taskState }) => {
  const { newTask, handleInputChange, handleKeyPress } = taskState;
  return (
    <form onKeyDown={handleKeyPress} className="header">
      <h1>Todos</h1>
      <input
        type="text"
        value={newTask}
        onChange={handleInputChange}
        onKeyDown={handleKeyPress}
        className="new-todo"
        placeholder="What needs to be done?"
      />
    </form>
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
