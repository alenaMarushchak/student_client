import React from 'react';
// import Input from '../../CustomElements/Input'
// import {reduxForm} from 'redux-form'
import {Button} from 'semantic-ui-react'

const Toolbar = ({
                     loadOptions,
                     onChange,
                     value
                 }) => (
    <React.Fragment>
        <div className='ui icon input'>
            <input
                className='search-block'
                placeholder="Search..."
                name="search"
                type='text'
                onChange={onChange}
                value={value}
            />

        </div>
        <Button onClick={loadOptions} size={'small'} content='Show'/>

    </React.Fragment>
);

export default Toolbar;