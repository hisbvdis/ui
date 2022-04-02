import { useState } from "react";

const App = () => {
  // 1. Состояние
  // 1.1. Массив пользователей
  const [users, setUsers] = useState([]);
  // 1.2. Переменная смещения
  const [offset, setOffset] = useState(0)
  // 1.3. Переменная загрузки
  const [loading, setLoading] = useState(false);
  
  // 2. Функция загрузки данных
  const loadData = (offset=0) => {
    // 2.1. Предварительно задать статус загрузки "true"
    setLoading(true);
    // 2.2. В запрос передаётся переменная смещения
    fetch(`https://gateway.marvel.com:443/v1/public/characters?limit=1&offset=${offset}&apikey=fa048bd5ea2cf04c794f49fdb2d0415a`)
      .then(response => response.json())
      // 2.3. После успешной загрузки:
      .then(data => {
        // ДОПОЛНИТЬ массив пользователей
        setUsers( users.concat(data.data.results) );
        // УВЕЛИЧИТЬ переменную смещения
        setOffset(offset + 1);
        // Задать статус загрузки "false"
        setLoading(false);
      })
  }
  
  // 3. Нажатие на кнопку вызывает функцию загрузки данных
  return (<>
    <h1>Список пользователей</h1>
    <ul>
      {users.map(user => <li key={user.id}>{user.name}</li>)}
    </ul>
    <button
      onClick={() => loadData(offset)}
      // 3.1. Во время загрузки деактивировать кнопку
      disabled={loading}
    >Загрузить ещё</button>
  </>)
}

export default App;