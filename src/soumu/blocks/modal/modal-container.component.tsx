import React from 'react';
import { withRouter } from 'react-router-dom';
import { Subscription } from 'rxjs';
import ModalDialog from 'soumu/blocks/modal/modal-dialog.component';
import Modal from 'soumu/blocks/modal/modal.component';
import { ModalProps, ModalDialogProps, PortalDialogAll } from 'soumu/blocks/modal/modal.type';
import { ModalService, ActionType, ModalData, PortalDialogProps } from 'app/services/modal';
import { routeChangeSubject } from 'app/services/route';

interface ModalListItem {
  id: number;
  modal: any;
}

class ModalContainer extends React.Component<any> {
  state = {
    currentModalId: 0,
  }

  modalList: ModalListItem[] = [];

  private modalService = new ModalService();

  private subscription = new Subscription();

  private unlisten;

  componentDidMount() {
    const openModalSub = this.modalService.getModal().subscribe((data: ModalData<any>) => {
      if (!data) {
        return;
      }

      const { type } = data;

      if (!this[type]) {
        return;
      }

      this[type](data);
    });

    this.subscription.add(openModalSub)

    // Close modal when change route
    routeChangeSubject.subscribe(() => {
      this.modalList = [];
      this.forceUpdate();
    });
  }

  componentWillUnmount() {
    this.subscription.unsubscribe();
    this.unlisten();
  }

  componentDidUpdate() {
    if (this.modalList.length) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
  }

  render() {
    return <>
      {this.modalList.map(item => <div id={`modal-${item.id}`} key={item.id}>{item.modal}</div>)}
    </>
  }

  private [ActionType.Portal] = (data: ModalData<PortalDialogAll>) => {
    const { modalId } = data;

    const PortalDialogComponent = data.options.content;

    const portalDialogProps: PortalDialogProps = {
      portalDialogRef: data.options.portalDialogRef,
      portaldata: data.options.portaldata,
    }

    this.modalList = [...this.modalList, { id: modalId, modal: <PortalDialogComponent {...portalDialogProps} /> }]
    this.setState({
      currentModalId: modalId,
    });
  }

  private [ActionType.SimpleMessage] = (data: ModalData<ModalProps>) => {
    const { options, modalId } = data;
    const simpleMessage = <Modal
      size='xs'
      title={(options as ModalProps).title}
      children={options.children}
      submitLabel={options.submitLabel || 'Ok'}
      onSubmit={options.onSubmit || this.modalService.close}
      onCancel={this.modalService.close}
      isOpen={options.isOpen}
    />

    this.modalList = [...this.modalList, { id: modalId, modal: simpleMessage }];
    this.setState({
      currentModalId: modalId,
    });
  }

  private [ActionType.Modal] = (data: ModalData) => {
    const { options, modalId } = data;
    const modal = <Modal {...options} isOpen={true} />;

    this.modalList = [...this.modalList, { id: modalId, modal }];
    this.setState({
      currentModalId: modalId,
    });
  }

  private [ActionType.ModalDialog] = (data: ModalData<ModalDialogProps>) => {
    const { options, modalId } = data;
    const dialog = <ModalDialog
      {...(options as ModalDialogProps)}
      isOpen={true}
      onCancel={options.onCancel || this.modalService.close}
    />;

    this.modalList = [...this.modalList, { id: modalId, modal: dialog }]
    this.setState({
      currentModalId: modalId,
    });
  }

  private [ActionType.Close] = (data: ModalData) => {
    const { modalId } = data;

    const closedModalId = modalId || this.state.currentModalId;

    const updateModalList = this.modalList.filter(item => item.id !== closedModalId);

    this.modalList = updateModalList;
    this.setState({
      currentModalId: updateModalList[updateModalList.length - 1]?.id,
    });
  }
}

export default withRouter(ModalContainer);
