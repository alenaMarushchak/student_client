import React from 'react';
import {Table} from 'semantic-ui-react'

import Item from './item';

const StudentItem = ({subject, getKey}) => {

    return (<React.Fragment>
        <Table.Row>
            <Table.Cell>{subject._id}</Table.Cell>
            <Item getKey={getKey} points={subject.points}/>
        </Table.Row>
    </React.Fragment>)
};

export default StudentItem;