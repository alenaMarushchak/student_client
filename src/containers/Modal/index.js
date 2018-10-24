import React from 'react';
import ReactModal from 'react-modal';
import {connect} from 'react-redux';
import constants from '../../constants';
import actions from '../../actions';

import EditUser from '../User/edit';
import CreateUser from '../User/create';

const {
    showModal,
    hideModal
} = actions;

const {
    modal
} = constants;

class Modal extends React.Component {

    constructor(props) {
        super(props);
    }

    content = () => {
        const {modalType, modalContentProps} = this.props;
        const modalProps = {modalContentProps, closeModal: this.props.hideModal};


        switch (modalType) {
            case modal.type.CREATE_USER:
                return <CreateUser {...modalProps} />;
            case modal.type.EDIT_USER:
                return <EditUser {...modalProps} />;
            default:
                return null;
        }
    };

    render() {
        const {
            modalType
        } = this.props;
        return (
            <ReactModal
                isOpen={!!modalType}
                className="modal-backdrop"
                overlayClassName="modal-container"
                ariaHideApp={false}
            >
                {this.content()}
            </ReactModal>
        );
    }
}

const connectedModal = connect(
    store => ({
        modalType        : store.modal.modalType,
        modalContentProps: store.modal.modalContentProps
    }),
    dispatch => ({
        dispatch,
        hideModal: () => dispatch(hideModal())
    })
)(Modal);


export default connectedModal;
