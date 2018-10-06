import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Switch, withRouter} from 'react-router-dom';
import Routes from '../../routes'
import actions from '../../actions';
import Modal from '../../containers/Modal';

const {
    loginFromStore
} = actions;

class App extends Component {
    static propTypes = {
        children: PropTypes.node,
        login   : PropTypes.func,
        logged  : PropTypes.bool
    };

    constructor(props) {
        super(props);
    }

    componentWillMount = () => {
        this.props.login();
    };

    wrapper = ({children}) => {
        const {logged} = this.props;
        if (!logged) {
            return <React.Fragment>{children}</React.Fragment>
        } else {
            return (
                <main className="main-content">
                    <Modal/>
                    <div className="container">
                        {children}
                    </div>
                </main>
            )
        }
    };

    render() {
        const {
            children
        } = this.props;

        return (
            <div className="wrapper">
                {children}
                <this.wrapper>
                    <Routes/>
                </this.wrapper>
            </div>
        );
    }
}

const connectedApp = connect((store) => ({
        logged: store.session.logged,
    }),
    (dispatch) => ({
        login: () => dispatch(loginFromStore())
    })
)(App);

export default withRouter(connectedApp);
