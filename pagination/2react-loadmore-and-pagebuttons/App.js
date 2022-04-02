import { useEffect, useState } from "react";
import Pagination from "./components/Pagination.js";

const App = () => {
  // 1. Состояние
  // 1.1. Массив пользователей
  const [users, setUsers] = useState([]);
  // 1.2. Переменная смещения
  const [offset, setOffset] = useState(0)
  // 1.3. Количество элементов на странице
  const [itemsCountOnPage, setPageItemsCount] = useState(10);
  // 1.4. Общее количество элементов
  const [total, setTotal] = useState(0);
  // 1.5. Статус загрузки
  const [loading, setLoading] = useState(false);
  

  // 2. Функции
  // 2.1. Общаяя функция загрузки данных через API
  const loadData = async (index) => {
    const response = await fetch(`https://gateway.marvel.com:443/v1/public/characters?limit=${itemsCountOnPage}&offset=${index}&apikey=fa048bd5ea2cf04c794f49fdb2d0415a`);
    const data = await response.json();
    return data;
  }
  // 2.2. Функция получения общего количества (не рационально)
  const getTotal = () => {
    loadData().then(response => setTotal(response.data.total));
  }
  // 2.3. Функция загрузки дополнительных данных (для кнопки "Загрузить ещё")
  const loadMore = (index) => {
    setLoading(true);
    loadData(index)
      .then(data => {
        // ДОПОЛНИТЬ массив пользователей
        setUsers( users.concat(data.data.results) );
        // УВЕЛИЧИТЬ переменную смещения
        setOffset(index + itemsCountOnPage);
        setLoading(false);
      })
  }
  // 2.4. Функция загрузки данных с указанным смещением
  const loadNew = (index) => {
    setLoading(true);
    loadData(index)
    .then(data => {
      // ЗАМЕНИТЬ массив пользователей
      setUsers( data.data.results );
      // УВЕЛИЧИТЬ переменную смещения
      setOffset(index + itemsCountOnPage);
      setLoading(false);
    })
  }


  // 3. Действия при первом рендеринге
  useEffect(
    () => {
      getTotal();
      loadNew(0);
    },
    []
  );
  
  // 4. Рендеринг
  return (<>
    <h1>Список пользователей</h1>
    <ul>
      {users.map(user => <li key={user.id}>{user.name}</li>)}
    </ul>
    <Pagination
      offset={offset}
      itemsCountOnPage={itemsCountOnPage}
      total={total}
      loadMore={loadMore}
      loadNew={loadNew}
      loading={loading}/>
  </>)
}

export default App;