import PageButtons from "./PageButtons";
import LoadMoreButton from "./LoadMoreButton";

const Pagination = (props) => {
  // Количество элементов
  const totalCount = props.data.length;
  // Количество страниц (с округлением до большего)
  const pageCount = Math.ceil(totalCount / props.pageSize);

  // Если страница всего одна, не показывать пагинацию
  if (pageCount === 1) return null;
  
  return (
    <nav className="pagination">
      <PageButtons pageCount={pageCount} {...props} />
      <LoadMoreButton pageCount={pageCount} {...props} />
    </nav>
  )
}

export default Pagination;