import React from 'react';
import {Table} from 'semantic-ui-react'

const Item = ({
                  item: {
                      _id,
                      name,
                  },
                  navigateTo
              }) => (
    <Table.Row key={_id}>

        <Table.Cell>
            {`${name}`}
        </Table.Cell>

        <Table.Cell style={{cursor: 'pointer'}}>
            <span onClick={() => {
                navigateTo(_id);
            }}> Show </span>
        </Table.Cell>

    </Table.Row>

);

export default Item;
