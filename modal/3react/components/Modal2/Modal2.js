import Modal from "../../features/Modal/Modal";

const Modal2 = ({id}) => {  
  return (<>
    <Modal id={id}>
      <h3 className="modal__title" id="modal1__title">Modal №1</h3>
      <p className="modal__desc" id="modal1__desc">Без интерактивных элементов – в фокусе кнопка "Ok"</p>
      <button type="button" data-close-btn>Закрыть</button>
      <button type="button" data-focus>ОК (Focus)</button>
    </Modal>
  </>)
}

export default Modal2;