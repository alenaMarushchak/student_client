import React from 'react'

import {Input, Segment} from 'semantic-ui-react'

const InputComponent = ({onKeyDown, value, onChange}) => {

    return (<React.Fragment>
        <Segment>
            <Input
                placeholder="Enter tag name..."
                onChange={onChange}
                value={value}
                onKeyDown={onKeyDown}
            />
        </Segment>
    </React.Fragment>)
};

export default InputComponent;