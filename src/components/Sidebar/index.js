import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

function Sidebar({
}) {
  return (
    <div className="nav-bar">
      <ul className="nav-list">
        <li className="nav-list-item">
          <NavLink activeClassName="active" exact to="/" className="list-item-link">
            <div className="icon">
              <span className="icon-home"></span>
            </div>
            <div className="label">Accueil</div>
          </NavLink>
        </li>
        <li className="nav-list-item">
          <NavLink activeClassName="active" to='/users' className="list-item-link">
            <div className="icon">
              <span className="icon-user-management"></span>
            </div>
            <div className="label">Gestion des utilisateurs</div>
          </NavLink>
        </li>
        <li className="nav-list-item">
          <NavLink activeClassName="active" to="/transactions" className="list-item-link">
            <div className="icon">
              <span className="icon-payment-management"></span>
            </div>
            <div className="label">Gestion des paiements</div>
          </NavLink>
        </li>
        <li className="nav-list-item">
          <NavLink activeClassName="active" to="/orders" className="list-item-link">
            <div className="icon">
              <span className="icon-package-management"></span>
            </div>
            <div className="label">Gestion des colis</div>
          </NavLink>
        </li>
        <li className="nav-list-item">
          <NavLink activeClassName="active" to="/statistics" className="list-item-link">
            <div className="icon">
              <span className="icon-KPIs"></span>
            </div>
            <div className="label">KPIs</div>
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

Sidebar.defaultProps = {};

Sidebar.propTypes = {};

export default Sidebar;
