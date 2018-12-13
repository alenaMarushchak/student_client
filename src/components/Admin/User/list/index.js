import React from 'react';
import Item from './listItem'
import {Table} from 'semantic-ui-react'

function UsersList({
                       values = [],
                       navigateTo,
                       deleteUser,
                       sortList,
                       activeSortField,
                   }) {

    let baseStyle = {cursor: 'pointer', color: 'black'};
    let activeStyle = {cursor: 'pointer', color: 'teal'};

    return (
        <React.Fragment>
            <Table basic='very' celled collapsing selectable>

                <Table.Header>
                    <Table.Row>

                        <Table.HeaderCell onClick={sortList} data-sortkey={'name'}
                                          style={activeSortField === 'name' ? activeStyle : baseStyle}
                        >Name</Table.HeaderCell>
                        <Table.HeaderCell onClick={sortList} data-sortkey={'email'}
                                          style={activeSortField === 'email' ? activeStyle : baseStyle}
                        >Email</Table.HeaderCell>
                        <Table.HeaderCell onClick={sortList} data-sortkey={'role'}
                                          style={activeSortField === 'role' ? activeStyle : baseStyle}
                        >Role</Table.HeaderCell>
                        <Table.HeaderCell>Actions</Table.HeaderCell>
                        <Table.HeaderCell/>

                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {values.map(item => (
                        <Item
                            item={item}
                            key={item._id}
                            navigateTo={navigateTo}
                            deleteUser={deleteUser}
                        />
                    ))}
                </Table.Body>


            </Table>
        </React.Fragment>
    );
}

export default UsersList;
