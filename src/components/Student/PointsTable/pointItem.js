import React from 'react';
import {Table} from 'semantic-ui-react'

const PointItem = ({subject}) => {
    let module1, module2, exam;

    let points = subject && subject.points;

    if (points && points.length) {
        let module1Obj = points.find(item => item.pointName === 'MODULE1');
        let module2Obj = points.find(item => item.pointName === 'MODULE2');
        let examObj = points.find(item => item.pointName === 'EXAM');

        module1 = module1Obj ? module1Obj.value : 0;
        module2 = module2Obj ? module2Obj.value : 0;
        exam = examObj ? examObj.value : 0;
    }

    return (<React.Fragment>
        <Table.Row>
            <Table.Cell>{subject._id}</Table.Cell>

            <Table.Cell>
                {module1}
            </Table.Cell>

            <Table.Cell>
                {module2}
            </Table.Cell>

            <Table.Cell>
                {exam}
            </Table.Cell>

        </Table.Row>
    </React.Fragment>)
};

export default PointItem;