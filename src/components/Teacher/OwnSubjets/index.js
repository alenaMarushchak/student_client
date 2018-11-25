import React from 'react';
import Item from './listItem'
import {Table} from 'semantic-ui-react'

function SubjectsList({
                          values = [],
                          navigateTo,
                          deleteTeacherFromSubject
                      }) {
    return (<Table basic='very' celled collapsing>

            <Table.Header>
                <Table.Row>

                    <Table.HeaderCell>Name</Table.HeaderCell>
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
                        deleteTeacherFromSubject={deleteTeacherFromSubject}
                    />
                ))}
            </Table.Body>


        </Table>
    );
}

export default SubjectsList;
