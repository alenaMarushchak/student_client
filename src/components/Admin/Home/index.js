import React from 'react';

import {Header, Container, Segment, Table} from 'semantic-ui-react'

import {PieChart, Pie, Cell} from 'recharts';

const Home = (props) => {
    let {data: {users, groups}} = props;
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

    return (
        <Container>
            <Segment>
                <Header content={'User Statistic'} as={'h2'}/>
                {users && users.length ? <PieChart width={300} height={200}>
                    <Pie
                        data={users}
                        cx={120}
                        cy={100}
                        innerRadius={60}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey={'value'}
                        dataName={'name'}
                        label
                    >
                        {
                            users.map((entry, index) => <Cell fill={COLORS[index % COLORS.length]} key={entry}/>)
                        }
                    </Pie>
                </PieChart> : null}
                {users && users.length ? <Table>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Type</Table.HeaderCell>
                            <Table.HeaderCell>Value</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>

                        {users.map(user => <Table.Row key={user.name}>
                            <Table.Cell>{user.name.toUpperCase()}</Table.Cell>
                            <Table.Cell>{user.value}</Table.Cell>
                        </Table.Row>)}

                    </Table.Body>
                </Table> : null}
            </Segment>
            <Segment>
                <Header content={'Group Statistic'} as={'h2'}/>
                {groups && groups.length ? <PieChart width={300} height={200}>
                    <Pie
                        data={groups}
                        cx={120}
                        cy={100}
                        innerRadius={60}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey={'value'}
                        dataName={'name'}
                        label
                    >
                        {
                            groups.map((entry, index) => <Cell fill={COLORS[index % COLORS.length]} key={entry}/>)
                        }
                    </Pie>
                </PieChart> : null}
                {groups && groups.length ? <Table>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Type</Table.HeaderCell>
                            <Table.HeaderCell>Value</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>

                        {groups.map(group => <Table.Row key={group.name}>
                            <Table.Cell>{group.name.toUpperCase()}</Table.Cell>
                            <Table.Cell>{group.value}</Table.Cell>
                        </Table.Row>)}

                    </Table.Body>
                </Table> : null}
            </Segment>
        </Container>);
};

Home.defaultProps = {
    data: {
        users : [],
        groups: []
    }
};

export default Home;
