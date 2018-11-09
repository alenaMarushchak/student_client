import React from 'react';
import {connect} from 'react-redux';
import {Redirect, withRouter, Route, Switch} from 'react-router-dom';

import Login from '../containers/Auth/Login';
import UsersList from '../containers/Admin/UsersList'
import SubjectsList from '../containers/Admin/SubjectsList'
import UserProfile from '../containers/Admin/User/item';
import Subject from '../containers/Admin/Subject/item';
import Profile from '../containers/Profile'

import Group from '../containers/Admin/StudentsGroup/item';
import GroupList from '../containers/Admin/StudentsGroupList';

import {ROLES} from '../constants/custom';

const Home = () => (<div>Home There will be statistic for admin</div>);
const HomeTeacher = () => (<div>Home There will be some info for teacher </div>);
const HomeStudent = () => (<div>Home There will be some info for student</div>);

class Routes extends React.Component {
    adminRoutes = [
        <Route component={Home} path="/" exact key={'/'}/>,
        <Route path="/users/profile" component={Profile} key={'/users/profile'}/>,

        <Route path="/users/:id" component={UserProfile} key={'/users/:id'}/>,
        <Route component={UsersList} path="/users*" exact key={'/users'}/>,

        <Route path="/subjects/:id" component={Subject} key={'/subjects/:id'}/>,
        <Route component={SubjectsList} path="/subjects*" exact key={'/subjects'}/>,

        <Route path="/groups/:id" component={Group} key={'/groups/:id'}/>,
        <Route path="/groups*" component={GroupList} exact key={'/groups/:id'}/>,

        <Redirect from="/sign_in" to="/" key={'redirect'}/>
    ];

    teacherRouter = [
        <Route component={HomeTeacher} path="/" exact key={'/'}/>,
        <Route path="/users/profile" component={Profile} key={'/users/profile'}/>,
    ];

    studentRouter = [
        <Route component={HomeStudent} path="/" exact key={'/'}/>,
        <Route path="/users/profile" component={Profile} key={'/users/profile'}/>,
    ];

    guestRoutes = [
        <Route component={Login} path="/sign_in" key={'/sign_in'}/>
    ];

    sharedRoutes = [];

    routes = () => {
        const {
            logged,
            user: {
                role
            }
        } = this.props;

        let routes = this.guestRoutes;

        if (logged) {
            switch (role) {
                case ROLES.ADMIN:
                    routes = this.adminRoutes;
                    break;
                case ROLES.TEACHER:
                    routes = this.teacherRouter;
                    break;
                default:
                    routes = this.studentRouter;
                    break;
            }
        }

        return ([
            ...this.sharedRoutes,
            ...routes,
            <Redirect to={this.redirectPath()} key={'redirect2'}/>
        ]);
    };

    redirectPath = () => {
        const {logged} = this.props;
        return logged ? '/' : '/sign_in'
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
