import React from 'react'

import {Icon, Label, Segment} from 'semantic-ui-react'

const SelectedOptions = ({
                             values,
                             onDeleteItem
                         }) => {
    const selectedOptions = values.length ? values.map(item =>
        <Label key={item}>
            {item}
            <Icon name='delete' onClick={() => onDeleteItem(item)}/>
        </Label>
    ) : <p>Nothing has been selected </p>;

    return (<React.Fragment>
        <Segment>
            {selectedOptions}
        </Segment>
    </React.Fragment>)
};

export default SelectedOptions;
