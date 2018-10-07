import React from 'react';
import SidebarView from '../../components/Sidebar';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

const Sidebar = ({logged}) => {
    return (
        logged ? <SidebarView/> : null
    );
};

const mapStateToProps = (store) => ({
    logged: store.session.logged
});

export default withRouter(connect(mapStateToProps)(Sidebar));
