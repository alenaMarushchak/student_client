import React from 'react';
import Input from '../../CustomElements/Input/index'
import {reduxForm} from 'redux-form'
import {Button} from 'semantic-ui-react'

const Toolbar = ({
                     loadGroupsList,
                 }) => (
    <React.Fragment>
        <div className='ui icon input'>
            <Input
                containerProps={{
                    className: 'search-block'
                }}
                inputProps={{
                    className: 'session',
                }}
                placeholder="Search..."
                name="search"
                type='text'
            />

        </div>
        <Button onClick={loadGroupsList} size={'small'} icon='search'/>

    </React.Fragment>
);

export default reduxForm({
    form: 'groupsOfSubjectToolbar'
})(Toolbar);