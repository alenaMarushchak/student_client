import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form'
import Input from '../../Input';

function Login({
  onSubmit
}) {
  return (
    <form onSubmit={onSubmit}>
      <div className="form-body">
        <Input name="email" type="email" placeholder="Email"
          containerProps={{className: 'input-field'}}
        />
        <Input name="password" type="password" placeholder="Password"
          containerProps={{className: 'input-field'}}
        />
      </div>
      <div className="button-group">
        <button className="button button-primary">Sign In</button>
      </div>
    </form>
  );
}

Login.propTypes = {
  onSubmit: PropTypes.func
};

export default reduxForm({
  form: 'login'
})(Login);
