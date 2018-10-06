import React from 'react';
import {connect} from 'react-redux';
import {Redirect, withRouter, Route, Switch} from 'react-router-dom';

import Login from '../containers/Auth/Login';

const Home = () => (<div>Home</div>);
const UsersList = () => (<div>Users list</div>);
const Profile = () => (<div>Profile</div>);

class Routes extends React.Component {
    loggedRoutes = [
        <Route component={Home} path="/" exact key={'/'}/>,
        <Route component={UsersList} path="/users" exact key={'/users'}/>,
        <Route component={Profile} path="/users/profile" exact key={'/users/profile'}/>,
        <Redirect from="/users/sign_in" to="/" key={'redirect'}/>,
    ];

    guestRoutes = [
        <Route component={Login} path="/users/sign_in" key={'/users/sign_in'}/>,
    ];

    sharedRoutes = [];

    routes = () => {
        const {
            logged
        } = this.props;
        const routes = logged ? this.loggedRoutes : this.guestRoutes;
        return ([
            ...this.sharedRoutes,
            ...routes,
            <Redirect to={this.redirectPath()} key={'redirect2'}/>
        ]);
    };

    redirectPath = () => {
        const {logged} = this.props;
        return logged ? '/' : '/users/sign_in'
    };

    render() {
        return (
            <React.Fragment>
                <Switch>
                    {this.routes()}
                </Switch>
            </React.Fragment>
        );
    }
}

const connectedRoutes = connect((store) => ({
    logged: store.session.logged,
    user  : store.session.user
}))(Routes);

export default withRouter(connectedRoutes);
