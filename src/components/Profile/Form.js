import React from 'react';
import PropTypes from 'prop-types';
import Input from 'components/Input/Input'
import { reduxForm } from 'redux-form';

function Form({
  errors
}) {
  return (
    <div className="form-body">
      <Input name="firstName" type="text" placeholder="Prénom"
        containerProps={{className: 'input-field'}}
        errors={errors.firstName}
      />
      <Input name="lastName" type="text" placeholder="Nom"
        containerProps={{className: 'input-field'}}
        errors={errors.lastName}
      />
      <Input name="email" type="email" placeholder="Adresse email"
        containerProps={{className: 'input-field'}}
        errors={errors.email}
      />
      {/* <Input name="phone" type="text" placeholder="Téléphone"
          containerProps={{className: 'input-field'}}
        />
     <Input name="position" type="text" placeholder="Poste"
       containerProps={{className: 'input-field'}}
     />*/}
      <div className="button-group">
        <button className="button button-primary">VALIDER</button>
      </div>
    </div>
  );
}

export default reduxForm({ form: 'profile' })(Form);
