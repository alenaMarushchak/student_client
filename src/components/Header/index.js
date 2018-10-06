import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import urlJoin from 'url-join';

function Header({
  logged,
  user,
  logout,
  redirectToProfile
}) {
  return (
    <header className="main-header">
      <div className="logo-block">
        <Link to="/">
          <img src="/img/logo.png" alt="logo" />
        </Link>
      </div>
      {logged && <div className="user-block">
        <div onClick={redirectToProfile} className="user-name">{`${user.firstName} ${user.lastName}`}</div>
        <div onClick={redirectToProfile} className="user-avatar" style={{ backgroundImage: `url(${urlJoin('/', user.avatar || '')})` }}>
        </div>
        <button onClick={logout} type="button" className="button log-out">
          <span className="icon-logout"></span>
        </button>
      </div>}
    </header>

  );
}

Header.defaultProps = {};

Header.propTypes = {};

export default Header;
