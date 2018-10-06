import React from 'react';
import PropTypes from 'prop-types';

function Success({
  children
}) {
  return (
    <div>
      {children}
    </div>
  );
}


function Info({
  children
}) {
  return (
    <div>
      {children}
    </div>
  );
}


function Warning({
  children
}) {
  return (
    <div>
      {children}
    </div>
  );
}


function Error({
  children
}) {
  return (
    <div>
      {children}
    </div>
  );
}

const propTps = {
  children: PropTypes.node
};

Error.propTypes = propTps;
Success.propTypes = propTps
Warning.propTypes = propTps;
Info.propTypes = propTps;

export { Success, Info, Warning, Error };
