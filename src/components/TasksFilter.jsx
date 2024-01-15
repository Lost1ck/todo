import PropTypes from 'prop-types';

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

SelectAll.propTypes = {
  taskState: PropTypes.shape({
    filter: PropTypes.string.isRequired,
    setFilter: PropTypes.func.isRequired,
  }).isRequired,
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

SelectActive.propTypes = {
  taskState: PropTypes.shape({
    filter: PropTypes.string.isRequired,
    setFilter: PropTypes.func.isRequired,
  }).isRequired,
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

SelectCompleted.propTypes = {
  taskState: PropTypes.shape({
    filter: PropTypes.string.isRequired,
    setFilter: PropTypes.func.isRequired,
  }).isRequired,
};

export const ClearAllCompleted = ({ taskState }) => {
  const { clearAllcompleted } = taskState;
  return (
    <button type="button" className="clear-completed" onClick={clearAllcompleted}>
      Clear completed
    </button>
  );
};

ClearAllCompleted.propTypes = {
  taskState: PropTypes.shape({
    clearAllcompleted: PropTypes.func.isRequired,
  }).isRequired,
};

export default SelectAll;
