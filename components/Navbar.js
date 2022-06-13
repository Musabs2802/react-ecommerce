import Link from 'next/link'
import { AiOutlineShopping } from 'react-icons/ai'
import { useStateContext } from '../context/StateContext'

const Navbar = () => {
  const { getCart } = useStateContext()

  return (
    <div className='navbar-container'>
      <p className='logo'>
        <Link href='/'>Sound Electronics</Link>
      </p>
      <button type='button' className='cart-icon'>
        <AiOutlineShopping />
        <span className='cart-item-qty'>{getCart.length}</span>
      </button>
    </div>
  )
}

export default Navbar
