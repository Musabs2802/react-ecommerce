import Link from 'next/link'
import { AiOutlineShopping } from 'react-icons/ai'
import { useStateContext } from '../context/StateContext'
import Cart from './Cart'

const Navbar = () => {
  const { getShowCart, setShowCart, getCart } = useStateContext()

  return (
    <div className='navbar-container'>
      <p className='logo'>
        <Link href='/'>Sound Electronics</Link>
      </p>
      <button
        type='button'
        className='cart-icon'
        onClick={() => setShowCart(true)}
      >
        <AiOutlineShopping />
        <span className='cart-item-qty'>{getCart.length}</span>
      </button>
      {getShowCart && <Cart />}
    </div>
  )
}

export default Navbar
