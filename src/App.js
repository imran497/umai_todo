import React, { useState } from 'react';

import { Switch, Router } from 'react-router';
import { Route } from 'react-router-dom';

import browserHistory from './common/browserHistory';

import Navigation from './views/Navigation';
import ToDoListContainer from './containers/ToDoListContainer';
import AddOrModifyToDoContainer from './containers/AddOrModifyToDoContainer';

function App(props) {
  const [listUpdated, setListUpdated] = useState(false);

  if(!listUpdated){
    props.readToDoFromLocal();
    setListUpdated(true);
  }

  return (
    <Router history={browserHistory}>
      <Navigation/>
      <Switch>
        <Route exact path="/" component={ToDoListContainer} />
        <Route exact path="/deleted" component={ToDoListContainer} />
        <Route exact path="/completed" component={ToDoListContainer} />
        <Route exact path="/add" component={AddOrModifyToDoContainer} />
        <Route exact path="/update" component={AddOrModifyToDoContainer} />
        <Route exact path="/*" component={() => <div className='todo-container text-center'><h1>Page Not Found</h1></div>} />
      </Switch>
    </Router>
  );
}

export default App;
