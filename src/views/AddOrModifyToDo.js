import React, { useState, useEffect } from 'react';
import * as qs from 'query-string';
import moment from 'moment';

function AddOrModifyToDo(props){
  const [id, setId] = useState('');
  const [text, setText] = useState('');
  const [date, setDate] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // UPDATING INPUT FIELDS WHEN EDITING A TASK
  if(window.location.pathname === '/update' && window.location.search !== '' && id === ''){
    let urlId = (qs.parse(window.location.search)).id?JSON.parse((qs.parse(window.location.search)).id):'';
    let itemExist = false;
    setId(urlId);
    props.toDoList.map(item => {
      if(item.id === urlId){
        itemExist = true;
        setText(item.text);
        setDate(item.dueDate);
      }
      return null;
    });
    if(!itemExist)setError('Todo item not found');
  }

  // ADDING/UPDATING THE NEW TASK
  const addToDo = (e) => {
    e.preventDefault();
    if(e.target.text.value === '' || e.target.dueDate.value === ''){
      setError('Enter all values');
      return;
    }
    if(!moment().isBefore(moment(e.target.dueDate.value, "YYYY-MM-DD"))){
      setError('Enter future date');
      return;
    }
    props.addToDo({
      id,
      text: e.target.text.value,
      dueDate: e.target.dueDate.value
    });
    setText('');
    setDate('');
    setTimeout(() => {
      setSuccess('Activity Added');
    }, 500);
  };

  // TO RESET THE MESSAGE FIELDS ON UPDATES
  useEffect(() => {
    setError('');
    setSuccess('');
  }, [text, date]);

  return(
    <div className='todo-container'>
      <form onSubmit={addToDo} className='todo-form' autoComplete='off'>
        <div className='todo-form-row'>
          <input className='todo-form-input' type="text" name='text' value={text} onChange={(e) => setText(e.target.value)}/>
        </div>
        <div className='todo-form-row'>
          <input className='todo-form-input' type="date" name='dueDate' value={date} onChange={(e) => setDate(e.target.value)}/>
        </div>
        {
          error !== '' &&
          <p className='todo-form-error'>*{error}</p>
        }
        {
          success !== '' &&
          <p className='todo-form-success'>*{success}</p>
        }
        <div className='todo-form-row'>
          <button  className='todo-form-button bg-blue' type='submit' disabled={error !== ''}>{window.location.pathname === '/update'?'UPDATE':'ADD'}</button>
        </div>
      </form>
    </div>
  )
}

export default AddOrModifyToDo;
