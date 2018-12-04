import React from 'react';
import Item from './pointItem'
import {Table} from 'semantic-ui-react'

function SubjectsList({
                          values = [],
                      }) {
    return (<Table basic='very' celled collapsing>

            <Table.Header>
                <Table.Row>

                    <Table.HeaderCell>Subject name</Table.HeaderCell>
                    <Table.HeaderCell>Module 1</Table.HeaderCell>
                    <Table.HeaderCell>Module 2</Table.HeaderCell>
                    <Table.HeaderCell>Exam</Table.HeaderCell>

                </Table.Row>
            </Table.Header>

            <Table.Body>
                {values.map(item => (
                    <Item
                        item={item}
                        key={item._id}
                    />
                ))}
            </Table.Body>


        </Table>
    );
}

export default SubjectsList;