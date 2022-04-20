import "./Modal.css";

const Modal = ({id, children}) => {
  return (<>
    <section className="modal" id={id} aria-modal="true" role="dialog" aria-labelledby={`${id}__title`} aria-describedby={`${id}__desc`}>
      <div className="modal__content">
        {children}
      </div>
    </section>
  </>)
}

export default Modal;