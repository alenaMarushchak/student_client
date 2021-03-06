import React from 'react';
import Input from '../../CustomElements/Input/index'
import {reduxForm} from 'redux-form';
import {Form} from "semantic-ui-react";

const FormComponent = ({
                           errors,
                           initialValues
                       }) => (
    <Form>
        <Form.Field>
            <label>Name</label>
            <Input name="name" type="text" placeholder="name"

                   errors={errors.name}
                   value={initialValues.name}
            />
        </Form.Field>
    </Form>);

export default reduxForm({form: 'editSubject'})(FormComponent);
