import React from 'react';
import Input from '../../Input/index'
import {reduxForm} from 'redux-form';
import {Form} from 'semantic-ui-react'

const FormComponent = ({
                           errors,
                       }) => (
    <Form>
        <Form.Field>
            <label>First Name</label>
            <Input name="firstName" type="text" placeholder="First Name"
                   containerProps={{className: 'input-field'}}
                   errors={errors.firstName}
            />
        </Form.Field>
        <Form.Field>
            <label>Last Name</label>
            <Input name="lastName" type="text" placeholder="Last Name"
                   containerProps={{className: 'input-field'}}
                   errors={errors.lastName}
            />
        </Form.Field>
        <Form.Field>
            <label>Email</label>
            <Input name="email" type="email" placeholder="Email"
                   containerProps={{className: 'input-field'}}
                   errors={errors.email}
            />
        </Form.Field>
        <Form.Field>
            <label>Role</label>
            <Input name="role" type="text" placeholder="role"
                   containerProps={{className: 'input-field'}}
                   errors={errors.role}
            />
        </Form.Field>
    </Form>
);

export default reduxForm({form: 'createUser'})(FormComponent);
