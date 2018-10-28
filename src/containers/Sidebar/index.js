import React, {Component} from 'react';
import SidebarView from '../../components/Sidebar';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

class Sidebar extends Component {

    render() {
        const {logged, user} = this.props;

        return (
            logged ? <SidebarView user={user}/> : null
        );
    }
}

const mapStateToProps = (store) => ({
    logged: store.session.logged,
    user  : store.session.user
});

export default withRouter(connect(mapStateToProps)(Sidebar));
