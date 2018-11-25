import React from 'react';
import {Table} from 'semantic-ui-react'

const Item = ({
                  item: {
                      _id,
                      name,
                  },
                  addSubject
              }) => (
    <Table.Row key={_id}>

        <Table.Cell>
            {`${name}`}
        </Table.Cell>

        <Table.Cell style={{cursor: 'pointer'}}>
            <span onClick={() => {
                addSubject({_id, name});
            }}> Add me to subject </span>
        </Table.Cell>


    </Table.Row>

);

export default Item;
