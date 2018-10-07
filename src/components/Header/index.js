import React from 'react';
import { Link } from 'react-router-dom';

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
        <div onClick={redirectToProfile} className="user-avatar"> There will be your avatar </div>
        <button onClick={logout} type="button" className="button log-out">
            <span className="icon-logout">Log out</span>
        </button>
      </div>}
    </header>

  );
}

export default Header;
