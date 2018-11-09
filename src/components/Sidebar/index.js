import React from 'react';
import {NavLink} from 'react-router-dom';
import {Menu, Icon} from 'semantic-ui-react'

function Sidebar({user}) {
    return (

        <Menu>
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


        </Menu>

    );
}

export default Sidebar;
