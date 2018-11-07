import React from 'react';
import Input from '../../../Input/index'
import {reduxForm} from 'redux-form'
import {Button} from 'semantic-ui-react'

const Toolbar = ({
                     loadUsersList
                 }) => (
    <React.Fragment>
        <div className='ui icon input'>
            <Input
                containerProps={{
                    className: 'search-block'
                }}
                inputProps={{
                    className: 'search-block',
                }}
                placeholder="Search..."
                name="search"
                type='text'
            />
        </div>
        <Button onClick={loadUsersList} size={'small'} icon='search'/>

    </React.Fragment>
);

export default reduxForm({
    form: 'usersToolbar'
})(Toolbar);
