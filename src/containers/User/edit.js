import React, {Component} from 'react';
import {connect} from 'react-redux';
import actions from '../../actions';
import constants from "../../constants";
import EditForm from '../../components/User/editUser';
import {push} from "react-router-redux";

const {
    loadUserSaga,
    editUserSaga
} = actions;


class EditUser extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.loadUser(this.props.modalContentProps.id);
    }

    onSubmit = (e) => {
        e.preventDefault();
        console.log('onSubmit edit');
        this.props.editUser(this.props.modalContentProps.id);
        this.props.dispatch(push('/users'));
        this.props.closeModal()
    };

    closeEditModal = () => {
        const {closeModal, dispatch} = this.props;

        closeModal();
        dispatch(push('/users'));
    };

    render() {
        const {
            modalContentProps,
            errors,
            user
        } = this.props;


        return (<React.Fragment>
                <button onClick={this.closeEditModal} type="button" className="button close">
                    Close modal
                </button>
                <EditForm
                    onSubmit={this.onSubmit}
                    errors={errors || {}}
                    initialValues={user}
                    {...modalContentProps}
                />
            </React.Fragment>
        );
    }
}

const connectedEditUser = connect(
    store => ({
        errors: store.errors[`${constants.CREATE_USER_SAGA}_FRONTEND`],
        user  : store.users.selected.value,
    }),
    dispatch => (
        {
            editUser: (id) => dispatch(editUserSaga(id)),
            loadUser: (id) => dispatch(loadUserSaga(id)),
            dispatch
        }
    ))(EditUser);

export default connectedEditUser;