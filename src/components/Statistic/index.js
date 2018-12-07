import React from 'react'

import {Segment, Container, Header} from 'semantic-ui-react';
import {Cell, Pie, PieChart, Tooltip} from "recharts";


let GroupItem = (props) => {
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

    let {item} = props;

    return <React.Fragment>
        <Segment>
            <Header as={'h2'} content={item.name}/>
            {item && item.students.length ? <PieChart width={300} height={200}>
                <Pie
                    data={item.students}
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
                        item.students.map((entry, index) => <Cell fill={COLORS[index % COLORS.length]} key={entry}/>)
                    }
                </Pie>
                <Tooltip/>
            </PieChart> : null}
        </Segment>
    </React.Fragment>
};

const StatisticComponent = (props) => {
    const {statistic} = props;


    return (<Container>
        {statistic && statistic.length ? statistic.map(item => <GroupItem item={item} key={item._id}/>) : null}
    </Container>)
};

export default StatisticComponent;