import React from "react";
import PropTypes from "prop-types";
import Star from "./Star.js";
import "./StarRating.css";

class StarRating extends React.Component {
  // 1. ОПИСАНО ВНИЗУ ПОД КЛАССОМ

  // 2. Поля класса (вместо конструктора)
  state = {
    // 2.1. Начальное значение кол-ва выделенных звёзд (берётся из свойств)
    selectedStars: props.selectedStars
  }

  // 3. Функция изменения количества выделенных звёзд
  changeSelectedStars = (amount) => {
    this.setState({selectedStars: amount})
  }

  render() {
    const {totalStars} = this.props;
    const {selectedStars} = this.state;

    return (
      <>
        <div className="starRating">
          {[...Array(totalStars)].map((_, index) => (
            <Star
              key={index}
              selected={ (index < selectedStars) ? true : false }
              clickHandler={() => this.changeSelectedStars(index + 1)}
            />
          ))}
        </div>
        <p>Выбрано {selectedStars} из {totalStars} звёзд</p>
      </>
    )
  }
}

// 1. Свойства: значения по умолчанию
StarRating.defaultProps = {
  // 1.1. Общее количество звёзд
  totalStars: 5,
  // 1.2. Количество выделенных звёзд
  selectedStars: 0
}

// Проверка типов
StarRating.propTypes = {
  // Количество звёзд должно быть числом
  totalStars: PropTypes.number
}

export default StarRating;