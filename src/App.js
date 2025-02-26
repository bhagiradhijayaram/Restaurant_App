import {useState, useEffect} from 'react'
import Header from './components/Header'
import MenuItemCard from './components/MenuItemCard'
import MenuCategory from './components/MenuCategory'
import './App.css'

const App = () => {
  const [dishData, setDishData] = useState([])
  const [menuList, setMenuList] = useState([])
  const [activeTab, setActiveTab] = useState('')
  const [cartItems, setCartItems] = useState({})
  const [cartCount, setCartCount] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchFoodData = async () => {
      const url =
        'https://apis2.ccbp.in/restaurant-app/restaurant-menu-list-details'

      try {
        setIsLoading(true)
        const response = await fetch(url)
        if (!response.ok) throw new Error('Failed to fetch')

        const data = await response.json()

        // Make sure we have the expected data structure
        if (!data || !data.length || !data[0].table_menu_list) {
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

        // Extract menu categories and set the first one as active by default
        const menuCategories = formattedData.map(menu => menu.menuName)
        setMenuList(menuCategories)

        // Set the first tab as active by default
        if (menuCategories.length > 0) {
          setActiveTab(menuCategories[0])
        }

        setIsLoading(false)
      } catch (error) {
        console.error('Error fetching data:', error.message)
        setIsLoading(false)
      }
    }

    fetchFoodData()
  }, [])

  const handleQuantityChange = (dishId, change) => {
    setCartItems(prev => {
      const currentQuantity = prev[dishId] || 0
      // Only allow decrement if current quantity is greater than 0
      if (change < 0 && currentQuantity === 0) {
        return prev
      }

      const newQuantity = Math.max(currentQuantity + change, 0)
      return {...prev, [dishId]: newQuantity}
    })

    // Only update cart count if we're actually changing the quantity
    setCartCount(prev => {
      const currentItems = Object.values(cartItems).reduce(
        (total, qty) => total + qty,
        0,
      )
      // Ensure we don't go below 0
      return Math.max(currentItems + change, 0)
    })
  }

  const filteredData = dishData.filter(
    eachItem => eachItem.menuName === activeTab,
  )

  if (isLoading) {
    return <div className="loading">Loading...</div>
  }

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
            <div key={menu.menuName} className="dishes-container">
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
