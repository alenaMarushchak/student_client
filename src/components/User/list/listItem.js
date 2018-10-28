import React from 'react';
import {Table} from 'semantic-ui-react'

const Item = ({
                  item: {
                      _id,
                      firstName,
                      lastName,
                      email,
                      role,
                  },
                  deleteUser,
                  navigateTo
              }) => (
    <Table.Row key={_id}>

        <Table.Cell>
            {`${firstName} ${lastName}`}
        </Table.Cell>
        <Table.Cell>
            {email}
        </Table.Cell>
        <Table.Cell>
            {role === 5 ? 'Teacher' : 'Student'}
        </Table.Cell>

        <Table.Cell style={{cursor: 'pointer'}}>
            <span onClick={() => {
                deleteUser(_id);
            }}> Delete </span>
        </Table.Cell>

        <Table.Cell style={{cursor: 'pointer'}}>
            <span onClick={() => {
                navigateTo(_id);
            }}> Show </span>
        </Table.Cell>

    </Table.Row>

);

export default Item;
