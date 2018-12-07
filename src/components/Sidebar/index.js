import React from 'react';
import {ROLES} from "../../constants/custom";
import {NavLink} from 'react-router-dom';
import {Menu, Icon} from 'semantic-ui-react'

const Sidebar = ({user}) => {
    const {role} = user;

    const ADMIN = <Menu>
        <NavLink exact
                 to="/"
                 name='home'
                 className={`item`}>
            <Icon name={'home'}/>
            Home
        </NavLink>
        <NavLink to='/users'
                 name='users'
                 className={`item`}>
            <Icon name={'address card outline'}/>
            Users management
        </NavLink>
        <NavLink to="/subjects"
                 className={`item`}
                 name='subjects'
        >
            <Icon name={'book'}/>
            Subject management
        </NavLink>
        <NavLink to="/groups"
                 className={`item`}
                 name='groups'
        >
            <Icon name={'group'}/>
            Group management
        </NavLink>
        <NavLink to="/blog"
                 className={`item`}
                 name='blog'>
            <Icon name={'blogger'}/>
            Blog management
        </NavLink>
        <NavLink to="/statistic"
                 className={`item`}
                 name='statistic'>
            <Icon name={'chart bar'}/>
            Student group statistic
        </NavLink>
    </Menu>;

    const TEACHER = <Menu>
        <NavLink exact
                 to="/"
                 name='home'
                 className={`item`}>
            <Icon name={'home'}/>
            Home
        </NavLink>
        <NavLink to='/students'
                 name='users'
                 className={`item`}>
            <Icon name={'address card outline'}/>
            Students
        </NavLink>
        <NavLink to="/groups"
                 className={`item`}
                 name='groups'
        >
            <Icon name={'group'}/>
            Groups
        </NavLink>
        <NavLink to="/blog"
                 className={`item`}
                 name='blog'>
            <Icon name={'blogger'}/>
            Blog
        </NavLink>
        <NavLink to="/statistic"
                 className={`item`}
                 name='statistic'>
            <Icon name={'chart bar'}/>
            Student group statistic
        </NavLink>
    </Menu>;

    const STUDENT = <Menu>
        <NavLink exact
                 to="/"
                 name='home'
                 className={`item`}>
            <Icon name={'home'}/>
            Home
        </NavLink>
        <NavLink to='/groups'
                 name='group'
                 className={`item`}>
            <Icon name={'address card outline'}/>
            My group
        </NavLink>
        <NavLink to="/blog"
                 className={`item`}
                 name='blog'>
            <Icon name={'blogger'}/>
            Blog
        </NavLink>
        <NavLink to="/statistic"
                 className={`item`}
                 name='statistic'>
            <Icon name={'chart bar'}/>
            Student group statistic
        </NavLink>
    </Menu>;

    switch (role) {

        case ROLES.ADMIN:
            return ADMIN;

        case ROLES.TEACHER:
            return TEACHER;

        case ROLES.STUDENT:
            return STUDENT;

        default:
            return null;
    }
};

export default Sidebar;
