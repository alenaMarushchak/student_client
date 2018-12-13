import React, {Component} from 'react';
import {connect} from 'react-redux';
import actions from '../../../actions';

import {Table} from 'semantic-ui-react'

import PointInput from './pointInput';

import {POINT_TYPES} from '../../../constants/custom';

const {
    addPointToStudentSaga,
} = actions;


class StudentLineItem extends Component {
    constructor(props) {
        super(props);

        const {student: {points}} = this.props;

        let module1;
        let module2;

        if (points && points.length > 0) {
            let module1Obj = points.find(item => item && item.pointName === 'MODULE1');
            let module2Obj = points.find(item => item && item.pointName === 'MODULE2')

            module1 = module1Obj ? module1Obj.value : 0;
            module2 = module2Obj ? module2Obj.value : 0;
        }

        this.state = {
            avg: module1 && module2 ? Math.ceil((module1 + module2) / 2) : 0,
        }
    }

    handleSaveChanges = (opts) => {
        const {subjectId, student: {_id: studentId, points}} = this.props;

        let {value, type} = opts;

        let module1Obj = points.find(item => item.pointName === 'MODULE1');
        let module2Obj = points.find(item => item.pointName === 'MODULE2');

        let module1 = module1Obj ? module1Obj.value : 0;
        let module2 = module2Obj ? module2Obj.value : 0;

        if (type === POINT_TYPES.MODULE1) {
            this.setState({
                avg: Math.ceil((value + module2) / 2)
            });
        }

        if (type === POINT_TYPES.MODULE2) {
            this.setState({
                avg: Math.ceil((module1 + value) / 2)
            });
        }

        this.props.addPoint({studentId, subjectId, point: value, pointType: type});
    };

    render() {
        const {
            number,
            student: {
                name,
                points
            }
        } = this.props;

        const {avg} = this.state;

        let module1;
        let module2;
        let exam;

        if (points && points.length) {
            let module1Obj = points.find(item => item.pointName === 'MODULE1');
            let module2Obj = points.find(item => item.pointName === 'MODULE2');
            let examObj = points.find(item => item.pointName === 'EXAM');

            module1 = module1Obj ? module1Obj.value : 0;
            module2 = module2Obj ? module2Obj.value : 0;
            exam = examObj ? examObj.value : 0;
        }

        let colors = {positive: false, warning: false, negative: false};


        switch (avg) {
            case avg < 35:
                colors.negative = true;
                break;
            case avg > 35 && avg < 60:
                colors.warning = true;
                break;
            case avg > 60:
                colors.positive = true;
                break;
        }

        return (
            <Table.Row {...colors}>

                <Table.Cell>
                    {number}
                </Table.Cell>

                <Table.Cell>
                    {name}
                </Table.Cell>

                <Table.Cell>
                    <PointInput value={module1} type={POINT_TYPES.MODULE1} saveChanges={this.handleSaveChanges}/>
                </Table.Cell>

                <Table.Cell>
                    <PointInput value={module2} type={POINT_TYPES.MODULE2} saveChanges={this.handleSaveChanges}/>
                </Table.Cell>

                <Table.Cell>
                    {avg}
                </Table.Cell>

                <Table.Cell>
                    <PointInput value={exam} type={POINT_TYPES.EXAM} saveChanges={this.handleSaveChanges}/>
                </Table.Cell>
            </Table.Row>
        );
    }
}

const connectedStudentLineItem = connect(
    null,
    dispatch => (
        {
            addPoint: ({studentId, subjectId, point, pointType}) => dispatch(addPointToStudentSaga({
                studentId,
                subjectId,
                point,
                pointType
            })),
            dispatch
        }
    ))(StudentLineItem);

export default connectedStudentLineItem;