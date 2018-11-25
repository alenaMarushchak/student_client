import React from 'react';
import Input from '../../CustomElements/Input/index'
import {reduxForm} from 'redux-form'
import {Button} from 'semantic-ui-react'

const Toolbar = ({
                     loadSubjectsList,
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
        <Button onClick={loadSubjectsList} size={'small'} icon='search'/>

    </React.Fragment>
);

export default reduxForm({
    form: 'subjectsOwnToolbar'
})(Toolbar);