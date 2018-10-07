import React from 'react';
import { NavLink } from 'react-router-dom';

function Sidebar({
}) {
  return (
    <div className="nav-bar">
      <ul className="nav-list">

        <li className="nav-list-item">
          <NavLink activeClassName="active" exact to="/" className="list-item-link">
            <div className="icon">
              <span className="icon-home"/>
            </div>
            <div className="label">Home</div>
          </NavLink>
        </li>

        <li className="nav-list-item">
          <NavLink activeClassName="active" to='/users' className="list-item-link">
            <div className="icon">
              <span className="icon-user-management"/>
            </div>
            <div className="label">Users management</div>
          </NavLink>
        </li>

        <li className="nav-list-item">
          <NavLink activeClassName="active" to="/subjects" className="list-item-link">
            <div className="icon">
              <span className="icon-package-management"/>
            </div>
            <div className="label">Subject management</div>
          </NavLink>
        </li>

        <li className="nav-list-item">
          <NavLink activeClassName="active" to="/blog" className="list-item-link">
            <div className="icon">
              <span className="icon-KPIs"/>
            </div>
            <div className="label">Blog management</div>
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
