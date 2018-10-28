import React from 'react';
import PropTypes from 'prop-types';
import {reduxForm} from 'redux-form'
import Input from '../../Input';
import {Button, Form, Grid, Header, Image, Segment, Icon, Divider} from 'semantic-ui-react'

function Login({
                   onSubmit
               }) {
    return (
        <Grid textAlign='center' style={{height: '100%'}} verticalAlign='middle'>
            <Grid.Column style={{maxWidth: 450}}>
                <Header as='h2' color='teal' textAlign='center'>
                    <Image src='/img/logo.jpg'/> Log-in to your account
                </Header>

                <Form size='large' onSubmit={onSubmit}>
                    <Segment stacked>

                        <Header as='h5' color='teal' textAlign='center'>
                            <Icon circular name='user'/> Email
                        </Header>
                        <Input name="email" type="email" containerProps={{className: 'input-field'}}
                               placeholder={'email'}/>
                        <Header as='h5' color='teal' textAlign='center'>
                            <Icon circular name='lock'/> Password
                        </Header>
                        <Input name="password" type="password" placeholder={'password'}
                               containerProps={{className: 'input-field'}}
                        />
                        <Divider/>
                        <Button color='teal' fluid size='large'>
                            Login
                        </Button>

                    </Segment>
                </Form>

            </Grid.Column>
        </Grid>
    );
}

Login.propTypes = {
    onSubmit: PropTypes.func
};

export default reduxForm({
    form: 'login'
})(Login);
