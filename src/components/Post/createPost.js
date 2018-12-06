import React from 'react';
import Input from '../CustomElements/Input/index'
import {reduxForm} from 'redux-form';
import {Form} from "semantic-ui-react";

const FormComponent = ({
                           errors,
                       }) => (
    <Form>
        <Form.Field>
            <label>Name</label>
            <Input name="title" type="text" placeholder="name"

                   errors={errors && errors.title ? errors.title : null}

            />
        </Form.Field>
        <Form.Field>
            <label>Description</label>
            <Input name="description" type="text" placeholder="name"

                   errors={errors && errors.description ? errors.description : null}

            />
        </Form.Field>
    </Form>);

export default reduxForm({form: 'createPost'})(FormComponent);
