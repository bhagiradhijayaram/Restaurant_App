import {useState, useEffect} from 'react'
import Header from './components/Header'
import MenuItemCard from './components/MenuItemCard'
import MenuCategory from './components/MenuCategory'
import './App.css'

const App = () => {
  const [dishData, setDishData] = useState([])
  const [menuList, setMenuList] = useState([])
  const [activeTab, setActiveTab] = useState('Salads and Soup')
  const [cartItems, setCartItems] = useState({})
  const [cartCount, setCartCount] = useState(0)

  useEffect(() => {
    const fetchFoodData = async () => {
      const url =
        'https://apis2.ccbp.in/restaurant-app/restaurant-menu-list-details'

      try {
        const response = await fetch(url)
        if (!response.ok) throw new Error('Failed to fetch')

        const data = await response.json()
        if (!data.length || !data[0].table_menu_list) {
          throw new Error('Invalid data format')
        }

        const formattedData = data[0].table_menu_list.map(menu => ({
          menuName: menu.menu_category,
          dishes: menu.category_dishes.map(dish => ({
            dishId: dish.dish_id,
            dishName: dish.dish_name,
            dishImage: dish.dish_image,
            dishDescription: dish.dish_description,
            dishCurrency: dish.dish_currency,
            dishPrice: dish.dish_price,
            dishCalories: dish.dish_calories,
            addonCat: dish.addonCat || [],
            dishAvailability: dish.dish_Availability,
            dishType: dish.dish_Type,
          })),
        }))

        setDishData(formattedData)
        setMenuList(formattedData.map(menu => menu.menuName))
      } catch (error) {
        console.error('Error fetching data:', error.message)
      }
    }

    fetchFoodData()
  }, [])

  const handleQuantityChange = (dishId, change) => {
    setCartItems(prev => {
      const newQuantity = Math.max((prev[dishId] || 0) + change, 0)
      return {...prev, [dishId]: newQuantity}
    })

    setCartCount(prev => Math.max(prev + change, 0))
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
        {filteredData.length === 0 ? (
          <p>No dishes available in this category</p>
        ) : (
          filteredData.map(menu => (
            <div key={menu.menuName}>
              <ul>
                {menu.dishes.map(dish => (
                  <MenuItemCard
                    dishDetails={dish}
                    key={dish.dishId}
                    count={cartItems[dish.dishId] || 0}
                    onQuantityChange={handleQuantityChange}
                  />
                ))}
              </ul>
            </div>
          ))
        )}
      </div>
    </>
  )
}

export default App
