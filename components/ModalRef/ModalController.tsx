import { MutableRefObject } from 'react';

export type CustomModalRef = {
    show: (content?: JSX.Element) => void
    hide: () => void
}

export default class ModalController {
  static modalRef: MutableRefObject<CustomModalRef>;
  static setModalRef = (ref: any) => {
    this.modalRef = ref;
  };

  static showModal = (content?: JSX.Element) => {
    this.modalRef.current?.show(content);
  };
  static hideModal = () => {
    this.modalRef.current?.hide();
  };
}