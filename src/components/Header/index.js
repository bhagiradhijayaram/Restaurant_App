import {AiOutlineShoppingCart} from 'react-icons/ai'

import './index.css'

const Header = props => {
  const {cartCount} = props
  return (
    <header>
      <div className="header-container">
        <h2>UNI Resto Cafe</h2>
        <div className="cart-container">
          <p>My Orders</p>
          <div>
            <AiOutlineShoppingCart size={25} />
            <span className="cart-count">{cartCount}</span>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
