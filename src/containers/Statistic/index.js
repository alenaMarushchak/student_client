import React, {Component} from "react";
import StatisticComponent from '../../components/Statistic'
import connect from "react-redux/es/connect/connect";
import constants from "../../constants";

import actions from '../../actions';

const {
    loadStudentStatisticSaga,
    cleanData
} = actions;

class StatisticContainer extends Component {

    componentDidMount() {
        this.props.loadStatistic();
    }

    componentWillUnmount() {
        this.props.clean();
    }

    render() {
        const {statistic} = this.props;

        return (<StatisticComponent data={statistic}/>);
    }
}

const connectedStatisticContainer = connect(
    store => ({
        statistic: store.statistic.student.groups,
    }),
    dispatch => (
        {
            loadStatistic: () => dispatch(loadStudentStatisticSaga()),
            clean        : () => dispatch(cleanData(constants.LOAD_STUDENT_STATISTIC)),
            dispatch
        }
    ))(StatisticContainer);

export default connectedStatisticContainer;