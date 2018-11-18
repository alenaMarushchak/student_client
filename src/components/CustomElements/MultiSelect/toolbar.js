import React from 'react';
import Input from '../../CustomElements/Input'
import {reduxForm} from 'redux-form'
import {Button} from 'semantic-ui-react'

const Toolbar = ({
                     loadOptions,
                     onChange
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
                onChange={onChange}
            />

        </div>
        <Button onClick={loadOptions} size={'small'} content='Show'/>

    </React.Fragment>
);

export default reduxForm({
    form: 'selectToolbar'
})(Toolbar);