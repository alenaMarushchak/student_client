import React, {Component} from "react";
import HomeComponent from '../../../components/Admin/Home'
import connect from "react-redux/es/connect/connect";
import constants from "../../../constants";

import actions from '../../../actions/index';

const {
    loadAdminStatisticSaga,
    cleanData
} = actions;

class AdminHomeContainer extends Component {

    componentDidMount() {
        this.props.loadStatistic();
    }

    componentWillUnmount() {
        this.props.clean();
    }

    render() {
        const {statistic} = this.props;

        return (<HomeComponent data={statistic}/>);
    }
}

const connectedAdminHomeContainer = connect(
    store => ({
        statistic: store.statistic.admin.values,
    }),
    dispatch => (
        {
            loadStatistic: () => dispatch(loadAdminStatisticSaga()),
            clean        : () => dispatch(cleanData(constants.LOAD_ADMIN_STATISTIC)),
            dispatch
        }
    ))(AdminHomeContainer);

export default connectedAdminHomeContainer;