import { useEffect, useState } from "react";
import Pagination from "./components/Pagination/Pagination";

const Users = () => {
  // 1. Данные
  // 1.1. Массив данных
  const [data] = useState(["Roma", "Vasya", "Petya", "Inna", "Ben", "Jonny", "Manny", "Teddy", "Jonson", "Baby", "Dog", "Cat", "Pet", "Met", "Big Ben", "Small Ben", "Anna", "Victory"]);
  // 1.2. Выбранные данные
  const [selectedData, setSelectedData] = useState([]);

  // 2. Настройки пагинации
  // 2.1. Количество элементов на странице
  const pageSize = 5;
  // 2.2. Текущая страница
  const [currentPage, setCurrentPage] = useState(1);


  // 3. Методы пагинации
  // 3.1. Показать страницу
  const changePage = (evt, pageNumber) => {
    // Отменить переход по ссылке
    evt.preventDefault();
    // Обновить номер текущей страницы
    selectNew(pageNumber);
  }
  // 3.2. Обновить выборку данных (для кнопок пагинации)
  const selectNew = (pageNumber) => {
    const startIndex = (pageNumber - 1) * pageSize;
    const selection = data.slice(startIndex, startIndex + pageSize);
    setSelectedData(selection);
    setCurrentPage(pageNumber);
  }
  // 3.3. Дополнить выборку данных (для кнопки "Загрузить ещё")
  const selectMore = () => {
    const startIndex = currentPage * pageSize;
    const selection = data.slice(startIndex, startIndex + pageSize);
    setSelectedData(selectedData.concat(selection));
    setCurrentPage(prev => prev + 1);
  }


  // 4. При загрузке страницы загрузить данные
  useEffect(() => selectNew(currentPage), [])

  return (
    <>
      {/* Отобразить выбранные данные */}
      {selectedData.map((item, i) => <li key={i}>{item}</li>)}

      {/* Пагинация */}
      <Pagination data={data} pageSize={pageSize} currentPage={currentPage} changePage={changePage} selectMore={selectMore}/>
    </>
  )
}

export default Users;