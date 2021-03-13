import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import { routes } from './Routes';

export default function App() {
  return (
    <div>
      <ul>
        <li>
          <Link to='/'>Home</Link>
        </li>
        <li>
          <Link to='/about'>About</Link>
        </li>
      </ul>
      <hr />
      {renderRoutes(routes)}
    </div>
  );
}
