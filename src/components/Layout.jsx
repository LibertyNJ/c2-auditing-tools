import { Link, NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';
import SVGIcon from '../components/SVGIcon';

const getDatabaseStatusClass = databaseStatus => {
  switch (databaseStatus) {
    case 'Ready':
      return 'text-success';
    case 'Error':
    case 'Unknown':
      return 'text-danger';
    default:
      return 'text-warning';
  }
};

const Layout = props => {
  const databaseStatusClass = getDatabaseStatusClass(props.databaseStatus);

  return (
    <div className="d-flex flex-column vh-100">
      <header className="container-fluid flex-shrink-0 sticky-top bg-white p-0 mb-3">
        <nav className="d-flex justify-content-between">
          <div className="border-bottom flex-grow-1">
            <Link className="navbar-brand px-3" to="/">
              C2 Auditing Tools
            </Link>
          </div>
          <ul className="nav nav-tabs d-flex justify-content-end">
            <li className="nav-item">
              <NavLink
                className="nav-link"
                activeClassName="active"
                to="/ledger"
              >
                Ledger
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link"
                activeClassName="active"
                to="/transaction"
              >
                Transactions
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link"
                activeClassName="active"
                to="/administration"
              >
                Administrations
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link"
                activeClassName="active"
                to="/provider"
              >
                Providers
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" activeClassName="active" to="/data">
                Data
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>
      <main className="container-fluid d-flex flex-column">
        {props.children}
      </main>
      <footer className="container-fluid flex-shrink-0 d-flex justify-content-between text-light bg-dark px-3 py-1 mt-auto">
        <div className="mb-0">Version: {props.version}</div>
        <div className="mb-0">
          <SVGIcon
            className="align-baseline"
            type="database"
            width="1em"
            height="1em"
            fill="white"
          />{' '}
          Database:{' '}
          {databaseStatusClass === 'text-warning' && (
            <React.Fragment>
              <div
                className="spinner-grow text-warning align-baseline"
                role="status"
                style={{ width: '1em', height: '1em' }}
              >
                <span className="sr-only">{props.databaseStatus}</span>
              </div>{' '}
            </React.Fragment>
          )}
          <span className={databaseStatusClass}>{props.databaseStatus}</span>
        </div>
      </footer>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  databaseStatus: PropTypes.string.isRequired,
  version: PropTypes.string.isRequired,
};

export default Layout;
