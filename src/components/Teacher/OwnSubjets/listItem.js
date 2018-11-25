import React from 'react';
import {Table} from 'semantic-ui-react'

const Item = ({
                  item: {
                      _id,
                      name,
                  },
                  deleteTeacherFromSubject,
                  navigateTo
              }) => (
    <Table.Row key={_id}>

        <Table.Cell>
            {`${name}`}
        </Table.Cell>

        <Table.Cell style={{cursor: 'pointer'}}>
            <span onClick={() => {
                deleteTeacherFromSubject({_id, name});
            }}> Remove me from subject </span>
        </Table.Cell>

        <Table.Cell style={{cursor: 'pointer'}}>
            <span onClick={() => {
                navigateTo(_id);
            }}> Show </span>
        </Table.Cell>

    </Table.Row>

);

export default Item;
