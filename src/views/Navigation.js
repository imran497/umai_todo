import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { pathToStatusMapping } from '../common/Constants';
import browserHistory from '../common/browserHistory';

function Navigation(){
  const [page, setPage] = useState(pathToStatusMapping[window.location.pathname]);

  browserHistory.listen((location) => {
    setPage(pathToStatusMapping[window.location.pathname]);
  });

  return(
    <ul className='navigation'>
      <li className='navigation-li'>
        <Link className={`navigation-link ${page === 'ADD'?'active':''}`} to='/add'>Add</Link>
      </li>
      <li className='navigation-li'>
        <Link className={`navigation-link ${page === 'PENDING'?'active':''}`} to='/'>Pending</Link>
      </li>
      <li className='navigation-li'>
        <Link className={`navigation-link ${page === 'COMPLETED'?'active':''}`} to='/completed'>Completed</Link>
      </li>
      <li className='navigation-li'>
        <Link className={`navigation-link ${page === 'DELETED'?'active':''}`} to='/deleted'>Deleted</Link>
      </li>
    </ul>
  );
}

export default Navigation;
