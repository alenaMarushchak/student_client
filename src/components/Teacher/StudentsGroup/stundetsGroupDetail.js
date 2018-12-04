import React from 'react';
import {Header, Image, Table} from 'semantic-ui-react'

const StudentsGroupDetail = ({students = [], navigateTo}) => {

    let content = students.map((item, index) => <Table.Row key={item._id}>
        <Table.Cell>{index + 1}</Table.Cell>
        <Table.Cell>
            <Header as='h4' image>
                <Image src={item.avatar} rounded size='mini'/>
                <Header.Content>
                    {item.name}
                    <Header.Subheader>{item.email}</Header.Subheader>
                </Header.Content>
            </Header>
        </Table.Cell>
        <Table.Cell onClick={() => {
            navigateTo(item._id);
        }}>Show points</Table.Cell>
    </Table.Row>);

    return (students && students.length ? <Table basic='very' celled collapsing>
        <Table.Header>
            <Table.Row>
                <Table.HeaderCell>#</Table.HeaderCell>
                <Table.HeaderCell>Student</Table.HeaderCell>
                <Table.HeaderCell>Action</Table.HeaderCell>
            </Table.Row>
        </Table.Header>

        <Table.Body>
            {content}
        </Table.Body>
    </Table> : <Header> Not found data ...</Header>);
};

export default StudentsGroupDetail;