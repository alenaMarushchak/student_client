import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function Home({
              }) {
  return (
    <div className="content">
      <ul className="cards-list">
        <li className="card-wrapper">
          <Link to="/users">
            <div className="small-card">
              <h3 className="card-title">Gestion des utilisateurs</h3>
              <div className="image-block">
                <img src="/img/user-management.png" alt="image" />
              </div>
              <div className="corner">
                <img src="/img/corner.png" alt="." />
              </div>
            </div>
          </Link>
        </li>
        <li className="card-wrapper">
          <Link to='/transactions'>
            <div className="small-card">
              <h3 className="card-title">Gestion des paiements</h3>
              <div className="image-block">
                <img src="/img/payment-management.png" alt="image" />
              </div>
              <div className="corner">
                <img src="/img/corner.png" alt="." />
              </div>
            </div>
          </Link>
        </li>
        <li className="card-wrapper">
          <Link to="/orders">
            <div className="small-card">
              <h3 className="card-title">Gestion des colis</h3>
              <div className="image-block">
                <img src="/img/package-management.png" alt="image" />
              </div>
              <div className="corner">
                <img src="/img/corner.png" alt="." />
              </div>
            </div>
          </Link>
        </li>
        <li className="card-wrapper">
          <Link to="/statistics">
            <div className="small-card">
              <h3 className="card-title">KPIs</h3>
              <div className="image-block">
                <img src="/img/KPIs.png" alt="image" />
              </div>
              <div className="corner">
                <img src="/img/corner.png" alt="." />
              </div>
            </div>
          </Link>
        </li>
      </ul>
    </div>
  );
}

Home.defaultProps = {};

Home.propTypes = {};

export default Home;
