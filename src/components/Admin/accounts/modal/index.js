import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import * as modalActions from '../../../../actions/modal';

function WrapModal(props) {
  const {open, modalActions, title, Component} = props;
  const {hideModel} = modalActions;
  return (
    <Modal isOpen={open} toggle={hideModel}>
      <ModalHeader toggle={hideModel}>{title}</ModalHeader>
      <ModalBody>
        {Component}
      </ModalBody>
    </Modal>
  )
}

const mapStateToProps = (state) => {
  return {
    open: state.modalReducer.showModel,
    Component: state.modalReducer.Component,
    title: state.modalReducer.title,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    modalActions: bindActionCreators(modalActions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(WrapModal);