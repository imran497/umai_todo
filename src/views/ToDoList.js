import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { toDoStatus } from '../common/Constants';

function ToDoList(props){
  const [updateIndices, setUpdateIndices] = useState([]);
  const pathname = window.location.pathname;

  const selectRow = (index) => {
    let updateIndicesClone = Object.assign([], updateIndices);
    let pos = updateIndicesClone.indexOf(index);
    (pos !== -1)?updateIndicesClone.splice(pos, 1):updateIndicesClone.push(index);
    setUpdateIndices(updateIndicesClone);
  }

  useEffect(() => {
    setUpdateIndices([]);
  }, [pathname])

  return(
    <div className='todolist todo-container'>
      <div className='todolist-row todolist-header'>
        <div className='todolist-column todolist-column-checkbox'></div>
        <div className='todolist-column'>ToDo Text</div>
        {
          pathname === '/' &&
          <div className='todolist-column'>Due Date</div>
        }
        {
          pathname === '/completed' &&
          <div className='todolist-column'>Completed Date</div>
        }
      </div>
      {
        props.toDoList.map((item, index) => {
          return(
            <div key={index} className='todolist-row'>
              <div className='todolist-column todolist-column-checkbox'><input type="checkbox" onChange={() => selectRow(item.id)} checked={updateIndices.indexOf(item.id) !== -1}/></div>
              <div className='todolist-column todolist-column-text'>
              {
                item.status === toDoStatus.PENDING
                ?
                <Link to={`/update?id=${item.id}`}>{item.text}</Link>
                :
                item.text
              }
              </div>
              {
                pathname === '/' &&
                <div className='todolist-column'>{item.dueDate}</div>
              }
              {
                pathname === '/completed' &&
                <div className='todolist-column'>{item.completedDate}</div>
              }
            </div>
          );
        })
      }
      {
        updateIndices.length > 0 &&
        <div className='todolist-buttons'>
          {
            pathname !== '/' && pathname !== '/deleted' &&
            <button className='bg-blue' onClick={() => (props.updateStatus(updateIndices, toDoStatus.PENDING) && setUpdateIndices([]))}>Pending</button>
          }
          {
            pathname !== '/completed' && pathname !== '/deleted' &&
            <button className='bg-green' onClick={() => (props.updateStatus(updateIndices, toDoStatus.COMPLETED) && setUpdateIndices([]))}>Completed</button>
          }
          {
            pathname !== '/deleted' &&
            <button className='bg-red' onClick={() => (props.updateStatus(updateIndices, toDoStatus.DELETED) && setUpdateIndices([]))}>Delete</button>
          }
          {
            pathname === '/deleted' &&
            <button className='bg-green' onClick={() => (props.updateStatus(updateIndices, 'RESTORE') && setUpdateIndices([]))}>Restore</button>
          }
        </div>
      }
    </div>
  );
}

export default ToDoList;
