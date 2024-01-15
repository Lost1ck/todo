const SelectAll = ({ taskState }) => {
  const { filter, setFilter } = taskState;

  return (
    <li>
      <button type="button" className={filter === 'all' ? 'selected' : null} onClick={() => setFilter('all')}>
        All
      </button>
    </li>
  );
};

export const SelectActive = ({ taskState }) => {
  const { filter, setFilter } = taskState;

  return (
    <li>
      <button type="button" className={filter === 'active' ? 'selected' : null} onClick={() => setFilter('active')}>
        Active
      </button>
    </li>
  );
};

export const SelectCompleted = ({ taskState }) => {
  const { filter, setFilter } = taskState;

  return (
    <li>
      <button
        type="button"
        className={filter === 'completed' ? 'selected' : null}
        onClick={() => setFilter('completed')}
      >
        Completed
      </button>
    </li>
  );
};

export const ClearAllCompleted = ({ taskState }) => {
  const { clearAllcompleted } = taskState;
  return (
    <button type="button" className="clear-completed" onClick={clearAllcompleted}>
      Clear completed
    </button>
  );
};

export default SelectAll;
