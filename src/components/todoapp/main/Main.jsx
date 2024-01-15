import Footer from '../../footer/Footer.jsx';
import Task from '../../Task.jsx';

const Main = ({ taskState }) => (
  <>
    <Task taskState={taskState} />
    <Footer taskState={taskState} />
  </>
);

export default Main;
