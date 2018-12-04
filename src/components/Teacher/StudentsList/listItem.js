import React from 'react';
import {Image, Table, Header} from 'semantic-ui-react'
const Item = ({
                  item: {
                      _id,
                      name,
                      avatar,
                      email
                  },
                  index,
                  navigateTo
              }) => (
    <Table.Row key={_id}>

        <Table.Cell>{index + 1}</Table.Cell>

        <Table.Cell>
            <Header as='h4' image>
                <Image src={avatar} rounded size='mini'/>
                <Header.Content>
                    {`${name}`}
                    <Header.Subheader>{email}</Header.Subheader>
                </Header.Content>
            </Header>

        </Table.Cell>

        <Table.Cell style={{cursor: 'pointer'}}>
            <span onClick={() => {
                navigateTo(_id);
            }}> Show </span>
        </Table.Cell>

    </Table.Row>

);

export default Item;
