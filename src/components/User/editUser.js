import React from 'react';
import Input from '../../components/Input'
import {reduxForm} from 'redux-form';

const Form = ({
                  errors,
                  onSubmit,
                  initialValues
              }) => (
    <div className="form-body">
        <form onSubmit={onSubmit}>
            <Input name="firstName" type="text" placeholder="First Name"
                   containerProps={{className: 'input-field'}}
                   errors={errors.firstName}
                   value={initialValues.firstName}
            />
            <Input name="lastName" type="text" placeholder="Last Name"
                   containerProps={{className: 'input-field'}}
                   errors={errors.lastName}
                   value={initialValues.lastName}
            />
            <Input name="email" type="email" placeholder="Email"
                   containerProps={{className: 'input-field'}}
                   errors={errors.email}
                   value={initialValues.email}
            />
            <Input name="role" type="text" placeholder="role"
                   containerProps={{className: 'input-field'}}
                   errors={errors.role}
                   value={initialValues.role}
            />
            <div className="button-group">
                <button className="button button-primary" type={'submit'}>Send</button>
            </div>
        </form>
    </div>
);

export default reduxForm({form: 'editUser'})(Form);
