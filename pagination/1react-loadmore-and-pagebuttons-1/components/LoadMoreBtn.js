const LoadMoreBtn = ({offset, pageSize, total, loadMore, loading}) => {
  // Скрывать кнопку, если смещение + количество элементов на странице
  // ..превышает общее их количество
  if (offset + pageSize > total) return null;
  
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