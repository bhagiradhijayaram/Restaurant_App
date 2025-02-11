import './index.css'
import {useState} from 'react'

const MenuItemCard = props => {
  const {dishDetails, onIncreament, onDecrement} = props
  const {
    dishName,
    dishDescription,
    dishImage,
    dishId,
    dishPrice,
    dishCurrency,
    dishCalories,
    addonCat,
    dishAvailability,
    dishType,
  } = dishDetails

  const [count, setCount] = useState(0)

  const onClickIncreament = () => {
    setCount(prevCount => prevCount + 1)
    onIncreament()
  }

  const onClickDecrement = () => {
    if (count > 0) {
      setCount(prevCount => prevCount - 1)
      onDecrement()
    }
  }

  const markColor = dishType === 1 ? 'markColor' : ''

  return (
    <li key={dishId} className="food-item-container">
      <div className="food-item-details-container">
        <div className="mark-container">
          <div className={`mark ${markColor}`} />
        </div>
        <div>
          <h1 className="dishName">{dishName}</h1>
          <div className="food-item-details">
            <p>{`${dishCurrency} ${dishPrice}`}</p>
          </div>
          <p className="dishDescription">{dishDescription}</p>

          {/* Counter and Customization */}
          {dishAvailability && (
            <div className="counter-container">
              <button onClick={onClickDecrement}>-</button>
              <span>{count}</span>
              <button onClick={onClickIncreament}>+</button>
            </div>
          )}

          {addonCat.length > 0 && (
            <p className="cart-available">Customizations available</p>
          )}

          {!dishAvailability && <p className="not-available">Not available</p>}
        </div>
      </div>

      <div className="food-item-image-container">
        {dishCalories && (
          <p className="food-calories">{dishCalories} calories</p>
        )}
        <img
          src={dishImage}
          alt={dishName}
          width={100}
          className="food-item-image"
        />
      </div>
    </li>
  )
}

export default MenuItemCard
