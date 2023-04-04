import { ComponentType } from 'react';
import { Subject } from 'rxjs';
import { ModalProps, ModalDialogProps, PortalDialogAll, PortalDialogRef } from 'soumu/blocks/modal/modal.type';
import { ExtractPropsFromComponent } from 'app/types/helper'

enum ActionType {
  Modal,
  ModalDialog,
  SimpleMessage,
  Close,
  Portal,
}

interface MessageProps {
  title: string;
  message: string;
  confirmLabel?: string;
  handleConfirm?: () => void;
}

export interface PortalDialogProps<PortalData = any> {
  portalDialogRef: PortalDialogRef;
  portaldata?: PortalData;
}

type ExtractPortalDataFromPortalDialogProps<P> = P extends PortalDialogProps<infer PortalData> ? PortalData : P;

export type ExtractPortalDataFromComponent<T = any> = T extends (props: infer P) => any
  ? ExtractPortalDataFromPortalDialogProps<P>
  : ExtractPortalDataFromPortalDialogProps<ExtractPropsFromComponent<T>>;

export interface ModalData<Options = ModalProps | ModalDialogProps | PortalDialogAll> {
  type: ActionType;
  options?: Options;
  modalId: number;
}

const subject = new Subject<ModalData>();

class ModalService {
  private static genId = 1;

  private modalId: number;

  /**
   * @deprecated This method is **NOT** deprecated, but for shorter syntax,
   * you should use `openPortalDialog` function from `app/services/modal`.
   * 
   * Sample:
   * ```ts
   * import { openPortalDialog } from 'app/services/modal';
   * 
   * openPortalDialog(XModal);
   * ```
   */
  public openPortalDialog<T = ComponentType>(
    Component: T,
    portaldata?: ExtractPortalDataFromComponent<T>,
  ): PortalDialogRef {
    this.modalId = ModalService.genId++;
    const portalDialogObs: Subject<any>[] = [];

    const portalDialogRef = {
      close: (data) => {
        this.close();
        portalDialogObs.forEach(ob => {
          ob.next(data);
        });
      },
      afterClosed: () => {
        const ob = new Subject();

        portalDialogObs.push(ob);

        return ob;
      },
    }

    const allOptions: PortalDialogAll = {
      portalDialogRef,
      content: Component,
      portaldata,
    };

    subject.next({ type: ActionType.Portal, options: allOptions, modalId: this.modalId });

    return portalDialogRef;
  }

  public openModal(modalProps: ModalProps) {
    this.modalId = ModalService.genId++;
    subject.next({ type: ActionType.Modal, options: modalProps, modalId: this.modalId });
  }

  public openDialog(modalDialogProps: ModalDialogProps) {
    this.modalId = ModalService.genId++;
    subject.next({ type: ActionType.ModalDialog, options: modalDialogProps, modalId: this.modalId });
  }

  public openMessage({ title = '', message = '', confirmLabel = '', handleConfirm = null }: MessageProps) {
    this.modalId = ModalService.genId++;
    subject.next({
      type: ActionType.SimpleMessage,
      options: { title, children: message, submitLabel: confirmLabel, onSubmit: handleConfirm, isOpen: true },
      modalId: this.modalId,
    });
  }

  public close() {
    subject.next({ type: ActionType.Close, modalId: this?.modalId });
  }

  public getModal() {
    return subject.asObservable();
  }
};

export { ModalService, ActionType };
