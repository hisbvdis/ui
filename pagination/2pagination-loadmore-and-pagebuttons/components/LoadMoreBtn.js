const LoadMoreBtn = ({offset, itemsCountOnPage, total, loadMore, loading}) => {
  // Скрывать кнопку, если смещение + количество элементов на странице
  // ..превышает общее их количество
  if (offset + itemsCountOnPage > total) return null;
  
  return (<>
    <p>
      <button
        onClick={() => loadMore(offset)}
        // При загрузке делать кнопку неактивной
        disabled={loading}
      >
        Загрузить ещё
      </button>
    </p>
  </>)
}

export default LoadMoreBtn;