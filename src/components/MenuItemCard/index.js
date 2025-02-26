import './index.css'

const MenuItemCard = ({dishDetails, count, onQuantityChange}) => {
  const {
    dishId,
    dishName,
    dishDescription,
    dishImage,
    dishPrice,
    dishCurrency,
    dishCalories,
    addonCat,
    dishAvailability,
    dishType,
  } = dishDetails

  const markColor = dishType === 1 ? 'markColor' : ''

  return (
    <li className="food-item-container">
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
          {dishAvailability ? (
            <div className="counter-container">
              <button
                onClick={() => onQuantityChange(dishId, -1)}
                disabled={count === 0}
                type="button"
                className="quantity-button"
                data-testid="decrement-count"
              >
                -
              </button>
              <span className="dish-quantity">{count}</span>
              <button
                onClick={() => onQuantityChange(dishId, 1)}
                type="button"
                className="quantity-button"
                data-testid="increment-count"
              >
                +
              </button>
            </div>
          ) : (
            <p className="not-available">Not available</p>
          )}

          {addonCat && addonCat.length > 0 && (
            <p className="cart-available">Customizations available</p>
          )}
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
