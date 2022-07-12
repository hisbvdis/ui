const PageButtons = ({pageCount, changePage, currentPage}) => {
  // Массив с номерами страниц пагинации
  const pageNumbers = Array(pageCount + 1).fill().map((_, i) => i).slice(1);

  return (
    <ul className="pagination__list">
      {pageNumbers.map((num) => (
        <li
          key={num}
          className={`pagination__item ${
            num === currentPage ? "pagination__item--active" : ""
          }`}
        >
          <a
            className="pagination__link"
            href={num}
            onClick={(evt) => changePage(evt, num)}
          >
            {num}
          </a>
        </li>
      ))}
    </ul>
  );
}

export default PageButtons;