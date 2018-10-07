import React from 'react';
import { connect } from 'react-redux';
import HeaderView from '../../components/Header';
import actions from '../../actions';
import { push } from 'react-router-redux';

const {
    logoutSaga
} = actions;

const Header = ({
                    logged,
                    user,
                    logout,
                    redirectToProfile
                }) => {
    return(
        <HeaderView
            { ...{
                logout,
                logged,
                user,
                redirectToProfile
            }
            }
        />
    );
};

const mapStateToProps = (store) => ({
    logged: store.session.logged,
    user: store.session.user
});

const mapDispatchToProps = (dispatch) => ({
    dispatch: dispatch,
    logout: () => { dispatch(logoutSaga()) },
    redirectToProfile: () => (dispatch(push('/users/profile')))
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);