import React from 'react';
import Item from './listItem'
import {Table} from 'semantic-ui-react'

function SubjectsList({
                          values = [],
                          navigateTo
                      }) {
    return (<Table basic='very' celled collapsing>

            <Table.Header>
                <Table.Row>

                    <Table.HeaderCell>#</Table.HeaderCell>
                    <Table.HeaderCell>Name</Table.HeaderCell>
                    <Table.HeaderCell>Actions</Table.HeaderCell>

                </Table.Row>
            </Table.Header>

            <Table.Body>
                {values.map((item, index) => (
                    <Item
                        index={index}
                        item={item}
                        key={item._id}
                        navigateTo={navigateTo}
                    />
                ))}
            </Table.Body>


        </Table>
    );
}

export default SubjectsList;
