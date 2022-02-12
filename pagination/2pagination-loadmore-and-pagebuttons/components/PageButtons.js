const PageButtons = ({offset, itemsCountOnPage, total, loadNew}) => {
  // Посчитать, сколько должно быть страниц (чтобы добавить кнопки)
  const pageCount = Math.ceil(total / itemsCountOnPage);
  // Пустой массив, который можно будет обойти в рендеринге
  const indexArray = new Array(pageCount).fill().map(item => undefined);
  // Номер текущей страницы (для стилизации кнопки)
  const currentPage = offset / itemsCountOnPage - 1;
  
  return (<>
    {indexArray.map((_, index) => (
      <button 
        key={index}
        style={(index === currentPage) ? {backgroundColor: "red"} : {}}
        data-index={index * 10}
        onClick={() => loadNew(index * 10)}
      >
        {index + 1}
      </button>
    ))}
  </>)
}

export default PageButtons;