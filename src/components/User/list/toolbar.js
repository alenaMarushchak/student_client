import React from 'react';
import Input from '../../Input'
import {reduxForm} from 'redux-form'

const Toolbar = ({
                     loadUsersList,
                 }) => (
    <React.Fragment>
        <div className="top-panel">
            <Input
                containerProps={{
                    className: 'search-block'
                }}
                inputProps={{
                    className: 'session',
                }}
                placeholder="Search..."
                name="search"
            >
                <button onClick={loadUsersList} type="button" className="button">
                    SEARCH
                </button>
            </Input>
        </div>
    </React.Fragment>
);

export default reduxForm({
    form: 'usersToolbar'
})(Toolbar);
