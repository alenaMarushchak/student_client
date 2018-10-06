import constants from '../constants';

const {
  SHOW_MODAL,
  HIDE_MODAL,
} = constants.modal;

const modal = (modal = {
  modalType: null,
  modalContentProps: {}
}, action) => {
  switch(action.type) {
    case SHOW_MODAL:
      return {
        modalType: action.modalType,
        modalContentProps: action.modalContentProps
      }
    case HIDE_MODAL:
      return {
        modalType: null,
        modalContentProps: {}
      }
    default:
      return modal;
  }
}

export { modal };
