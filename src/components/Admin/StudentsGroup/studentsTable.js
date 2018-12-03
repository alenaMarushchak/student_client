import React from 'react';
import {Table, Header, Image} from 'semantic-ui-react'

const StudentsTable = ({
                           students = [],
                       }) =>
    students && students.length ? (<Table basic='very' celled collapsing>
        <Table.Body>
            {students.map(item => <Table.Row key={item._id}>

                <Table.Cell>
                    <Header as='h4' image>
                        <Image src={`${item.avatar}`} rounded size='mini'/>
                        <Header.Content>
                            {`${item.name}`}
                            <Header.Subheader> {`${item.email}`} </Header.Subheader>
                        </Header.Content>
                    </Header>
                </Table.Cell>

            </Table.Row>)}
        </Table.Body>
    </Table>) : null;

export default StudentsTable;