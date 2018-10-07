import React from 'react';
import Input from '../../components/Input'
import {reduxForm} from 'redux-form';

const Form = ({
                  errors
              }) => (
    <div className="form-body">
        <Input name="firstName" type="text" placeholder="First Name"
               containerProps={{className: 'input-field'}}
               errors={errors.firstName}
        />
        <Input name="lastName" type="text" placeholder="Last Name"
               containerProps={{className: 'input-field'}}
               errors={errors.lastName}
        />
        <Input name="email" type="email" placeholder="Email"
               containerProps={{className: 'input-field'}}
               errors={errors.email}
        />

        <div className="button-group">
            <button className="button button-primary">Send</button>
        </div>
    </div>
);

export default reduxForm({form: 'profile'})(Form);
