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

export default TaskForm;
