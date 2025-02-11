import './index.css'

const MenuCategory = ({category, setActiveTab, activeTab}) => (
  <button
    className={`menu-item ${category === activeTab ? 'active-tab' : ''}`}
    onClick={() => setActiveTab(category)}
    type="button"
  >
    {category}
  </button>
)

export default MenuCategory
