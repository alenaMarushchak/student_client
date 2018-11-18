import React from 'react'

import {List, Segment, Label} from 'semantic-ui-react'

const DropDownComponent = ({
                               options,
                               onAddItem,
                               onClose
                           }) => {
    const optionsComponent = options.length ? options.map(item =>
        <List.Item key={item._id} onClick={() => onAddItem(item)}>
            {item.name}
        </List.Item>
    ) : <List.Item onClick = {onClose}>
        Nothing to show...
    </List.Item>;

    return (<React.Fragment>
        <Segment>
            <List divided relaxed> {optionsComponent} </List>
        </Segment>
    </React.Fragment>)
};

export default DropDownComponent;