import { useEffect, useState } from "react";
import Spinner from "./Spinner.js";

const App = () => {
  // 1. Состояние
  // 1.1. Данные
  const [user, setUser] = useState({});
  // 1.2. Статус загрузки
  const [loading, setLoading] = useState(false);
  // 1.3. Статус ошибки
  const [error, setError] = useState(false);
  
  // 2. После первого рендеринга запустить функцию загрузки данных
  useEffect(() => loadData(), []);

  // 3. Функция загрузки данных
  const loadData = () => {
    // 3.1. Перед началом загрузки установить статус загрузки в "true"
    setLoading(true);

    // 3.2. Таймер для задержки начала загрузки (чтобы было видно спиннер)
    setTimeout(() => {
      // 3.3. Загрузка данных
      fetch("https://jsonplaceholder.typicode.com/users/1")
        .then(response => {
          // 3.3.1. Если загрузка не удалась, поменять статус загрузки и ошибки
          if (!response.ok) {
            setLoading(false);
            setError(true);
          }
          // 3.3.2. Если загрузка удачная, продолжить обработку данных
          return response.json()
        })
        .then(data => {
          // 3.3.3. Записать загруженные данные в состояние
          setUser(data);
          // 3.3.4. В конце загрузки установить статус загрузки в "false"
          setLoading(false);
        })
    }, 1000);
  }

  // 4. Условный рендеринг
  // 4.1. Если активна ошибка, отрендерить сообщение об ошибке
  if (error) return <p>Loading error</p>;
  // 4.2. Если активна загрузка, вернуть спиннер
  if (loading) return <Spinner/>;
  // 4.3. Если ошибки и загрузки нет, вернуть полученные данные
  return (<>
    <h1>{user.name}</h1>
  </>)
}

export default App;