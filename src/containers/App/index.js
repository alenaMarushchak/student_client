import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {/*Switch,*/ withRouter} from 'react-router-dom';
import Routes from '../../routes'
import Sidebar from '../Sidebar';
import Header from '../Header'
import actions from '../../actions';
import Modal from '../../containers/Modal';
import {
    Container,
} from 'semantic-ui-react'

const {
    loginFromStore
} = actions;

class App extends Component {
    static propTypes = {
        children: PropTypes.node,
        login   : PropTypes.func,
        logged  : PropTypes.bool
    };

    componentWillMount() {
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
            children,
        } = this.props;

        return (
            <Container>
                <Header/>
                {children}
                <this.wrapper>
                    <Sidebar/>
                    <Routes/>
                </this.wrapper>
            </Container>
        );
    }
}

const connectedApp = connect((store) => ({
        logged: store.session.logged
    }),
    (dispatch) => ({
        login: () => dispatch(loginFromStore())
    })
)(App);

export default withRouter(connectedApp);
