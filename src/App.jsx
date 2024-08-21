import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addTask } from './redux/slices/tasksSlice';

function App() {
  const tasks = useSelector(state => state.tasks.tasks);
  const categories = useSelector(state => state.categories.categories);
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();

  //Redux store is correctly set-up along with the state, actions and reducers
  console.log(tasks, 'tasks');
  console.log(categories, 'categories');
  console.log(user, 'user');

  const newTask = {
    id: 7,
    title: 'Get a haircut',
    category: 'Personal',
    completed: false
  }

  return (
    <div className="App">
      Task Master App
      {tasks.length && tasks.map((task) => <li key={task.id}>{task.title}</li>)}
      <button onClick={() => dispatch(addTask(newTask))}>Add Task</button>
    </div>
  );
}

export default App;
