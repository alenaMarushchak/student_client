import React from 'react';
import {connect} from 'react-redux';
import {Redirect, withRouter, Route, Switch} from 'react-router-dom';

import HomeAdmin from '../containers/Admin/Home';

import Login from '../containers/Auth/Login';
import UsersList from '../containers/Admin/UsersList'
import SubjectsList from '../containers/Admin/SubjectsList'
import UserProfile from '../containers/Admin/User/item';
import Subject from '../containers/Admin/Subject/item';
import Profile from '../containers/Profile'

import Group from '../containers/Admin/StudentsGroup/item';
import GroupList from '../containers/Admin/StudentsGroupList';

import HomeTeacher from '../containers/Teacher/Home';
import OwnSubjectDetail from '../containers/Teacher/OwnSubjectDetail'
import StudentsGroupList from '../containers/Teacher/StudentsGroupList';
import StudentsGroup from '../containers/Teacher/StudentsGroup';
import StudentsGroupWithPoints from '../containers/Teacher/StudentsGroupWithPoints';
import StudentItemAllPoints from '../containers/Teacher/StudentItemAllPoints'
import StudentsList from '../containers/Teacher/StudentsList'

import HomeStudent from '../containers/Student/Home';
import OwnGroup from '../containers/Student/Group'

import Blog from '../containers/Blog';
import Post from '../containers/Post'

import Statistic from '../containers/Statistic'

import {ROLES, ROUTE_PARAMS} from '../constants/custom';

class Routes extends React.Component {
    adminRoutes = [
        <Route component={HomeAdmin} path="/" exact key={'/'}/>,
        <Route path="/users/profile" component={Profile} key={'/users/profile'}/>,

        <Route path="/users/:id" component={UserProfile} key={'/users/:id'} params={{id: ROUTE_PARAMS.ID}}/>,
        <Route component={UsersList} path="/users*" exact key={'/users'} params={{id: ROUTE_PARAMS.ID}}/>,

        <Route path="/subjects/:id" component={Subject} key={'/subjects/:id'} params={{id: ROUTE_PARAMS.ID}}/>,
        <Route component={SubjectsList} path="/subjects*" exact key={'/subjects'}/>,

        <Route path="/groups/:id" component={Group} key={'/groups/:id'} params={{id: ROUTE_PARAMS.ID}}/>,
        <Route path="/groups*" component={GroupList} exact key={'/groups/:id'} params={{id: ROUTE_PARAMS.ID}}/>,

        <Route path="/blog/:id/posts" component={Post}
               key={"/blog/:id/posts"}
               params={{id: ROUTE_PARAMS.ID}}/>,

        <Route path="/blog" component={Blog} key={"/blog"}/>,

        <Route path="/statistic" component={Statistic} key={"/statistic"}/>,

        <Redirect from="/sign_in" to="/" key={'redirect'}/>
    ];

    teacherRouter = [
        <Route component={HomeTeacher} path="/" exact key={'/'}/>,
        <Route path="/users/profile" component={Profile} key={'/users/profile'}/>,

        <Route path="/subjects/:id/groups/:groupId" component={StudentsGroupWithPoints}
               key={'/subjects/:id/groups/:groupId'}
               params={{id: ROUTE_PARAMS.ID, groupId: ROUTE_PARAMS.ID}}
        />,

        <Route path="/subjects/:id/groups" component={OwnSubjectDetail} key={'/subjects/:id/groups'}
               params={{id: ROUTE_PARAMS.ID}}/>,

        <Route path="/students/:id" component={StudentItemAllPoints} key={"/students/:id"}
               params={{id: ROUTE_PARAMS.ID}}/>,
        <Route path="/students" component={StudentsList} key={'/students'}/>,


        <Route path="/groups/:id/student/:studentId" component={StudentItemAllPoints} key={"/students/:id"}/>,
        <Route path="/groups/:id" component={StudentsGroup} key={"/groups/:id"} params={{id: ROUTE_PARAMS.ID}}/>,
        <Route path="/groups" component={StudentsGroupList} key={"/groups"}/>,

        <Route path="/blog/:id/posts" component={Post}
               key={"/blog/:id/posts"}
               params={{id: ROUTE_PARAMS.ID}}/>,

        <Route path="/blog" component={Blog} key={"/blog"}/>,

        <Route path="/statistic" component={Statistic} key={"/statistic"}/>,

        <Redirect from="/sign_in" to="/" key={'redirect'}/>
    ];

    studentRouter = [
        <Route component={HomeStudent} path="/" exact key={'/'}/>,
        <Route path="/users/profile" component={Profile} key={'/users/profile'}/>,
        <Route path="/groups" component={OwnGroup} key={'/groups'}/>,

        <Route path="/blog/:id/posts" component={Post}
               key={"/blog/:id/posts"}
               params={{id: ROUTE_PARAMS.ID}}/>,

        <Route path="/blog" component={Blog} key={"/blog"}/>,

        <Route path="/statistic" component={Statistic} key={"/statistic"}/>,

        <Redirect from="/sign_in" to="/" key={'redirect'}/>
    ];

    //Blog writing
    //Socket io subscribe on blog, on point adding
    // subscribe to teacher , search in blogs (by author) / search in posts/ write comments

    guestRoutes = [
        <Route component={Login} path="/sign_in" key={'/sign_in'}/>
    ];

    sharedRoutes = [];

    routes = () => {
        const {
            logged,
            user
        } = this.props;

        let routes = this.guestRoutes;

        if (logged) {
            let role = user.role;

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