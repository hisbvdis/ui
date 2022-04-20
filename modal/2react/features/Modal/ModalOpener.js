const ModalOpener = ({targetID, link, manual, href, children}) => {
  const openModal = manual ? false : true;

  const Link = () => {
    return (<>
      <a href={href || ""} data-open-modal={openModal}  data-target-modal-id={targetID}>
        {children}
      </a>
    </>)
  }

  const Button = () => {
    return (<>
      <button type="button" data-open-modal={openModal}  data-target-modal-id={targetID} aria-haspopup="true">
        {children}
      </button>
    </>)
  }

  const Tag = link ? Link : Button;
  
  return (<>
    <Tag>{children}</Tag>
  </>)
}

export default ModalOpener;