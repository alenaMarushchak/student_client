import React from 'react';
import ReactModal from 'react-modal';
import {connect} from 'react-redux';
import constants from '../../constants';
import actions from '../../actions';

const {
    //showModal,
    hideModal
} = actions;

const {
   // modal
} = constants;

class Modal extends React.Component {

    constructor(props) {
        super(props);
    }

    content = () => {
        const {modalType, modalContentProps} = this.props; // eslint-disable-next-line
        //const modalProps = {modalContentProps, closeModal: this.props.hideModal};

        //todo fix
        switch (modalType) {
            case 'EDIT':
                return <div>edit</div>;
            case 'CREATE':
                return <div>create</div>;
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
