import React from 'react';
import {Table, Header} from 'semantic-ui-react'

const SubjectsTable = ({
                           subjects = [],
                       }) =>
    subjects && subjects.length ? (<Table basic='very' celled collapsing>
        <Table.Body>
            {subjects.map(item => <Table.Row key={item._id}>

                <Table.Cell>
                    <Header as='h4' image>
                        <Header.Content>
                            {`${item.name}`}
                        </Header.Content>
                    </Header>
                </Table.Cell>

            </Table.Row>)}
        </Table.Body>
    </Table>) : null;

export default SubjectsTable;