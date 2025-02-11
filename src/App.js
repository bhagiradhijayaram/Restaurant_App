import {useState, useEffect} from 'react'
import Header from './components/Header'
import MenuItemCard from './components/MenuItemCard'
import MenuCategory from './components/MenuCategory'
import './App.css'

const App = () => {
  const [dishData, setDishData] = useState([])
  const [menuList, setMenuList] = useState([])
  const [activeTab, setActiveTab] = useState('Salads and Soup')
  const [cartCount, setCartCount] = useState(0)

  useEffect(() => {
    const fetchFoodData = async () => {
      const url =
        'https://apis2.ccbp.in/restaurant-app/restaurant-menu-list-details'
      try {
        const response = await fetch(url)
        if (response.ok) {
          const data = await response.json()
          console.log(data)
          const formattedData =
            data[0]?.table_menu_list.map(menu => ({
              menuName: menu.menu_category,
              dishes: menu.category_dishes.map(dish => ({
                dishId: dish.dish_id,
                dishName: dish.dish_name,
                dishImage: dish.dish_image,
                dishDescription: dish.dish_description,
                dishCurrency: dish.dish_currency,
                dishPrice: dish.dish_price,
                dishCalories: dish.dish_calories,
                addonCat: dish.addonCat,
                dishAvailability: dish.dish_Availability,
                dishType: dish.dish_Type,
              })),
            })) || []

          setDishData(formattedData)
          setMenuList(formattedData.map(menu => menu.menuName))
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchFoodData()
  }, [])

  const onIncreament = () => {
    setCartCount(prevCount => prevCount + 1)
  }
  const onDecrement = () => {
    setCartCount(prevCount => prevCount - 1)
  }

  const filteredData = dishData.filter(
    eachItem => eachItem.menuName === activeTab,
  )

  return (
    <>
      <Header cartCount={cartCount} />
      <div className="app-container">
        <div className="menu-bar">
          {menuList.map(menuItem => (
            <MenuCategory
              key={menuItem}
              category={menuItem}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
          ))}
        </div>
        {filteredData.map(menu => (
          <div key={menu.menuName}>
            <ul>
              {menu.dishes.map(dish => (
                <MenuItemCard
                  dishDetails={dish}
                  key={dish.dishId}
                  onIncreament={onIncreament}
                  onDecrement={onDecrement}
                />
              ))}
            </ul>
          </div>
        ))}
      </div>
    </>
  )
}

export default App
