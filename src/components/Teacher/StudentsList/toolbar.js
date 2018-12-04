import React from 'react';
import Input from '../../CustomElements/Input'
import {reduxForm} from 'redux-form'
import {Button} from 'semantic-ui-react'

const Toolbar = ({
                     loadStudentsList,
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
        <Button onClick={loadStudentsList} size={'small'} icon='search'/>

    </React.Fragment>
);

export default reduxForm({
    form: 'studentsToolbar'
})(Toolbar);