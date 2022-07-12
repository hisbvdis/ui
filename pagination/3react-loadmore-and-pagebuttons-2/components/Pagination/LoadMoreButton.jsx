const LoadMoreButton = ({currentPage, selectMore, pageCount}) => {
  // Если текущая страница — последняя, не показывать кнопку "Load more"
  if (currentPage === pageCount) return null;
  
  return (
    <button className="pagination__selectMore" onClick={selectMore}>
      Load more
    </button>
  );
}

export default LoadMoreButton;