import Link from 'next/link'
import React, { useRef } from 'react'
import {
  AiOutlineLeft,
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineShopping,
} from 'react-icons/ai'
import { TiDeleteOutline } from 'react-icons/ti'
import { useStateContext } from '../context/StateContext'
import { urlFor } from '../lib/client'

const Cart = () => {
  const { cartRef } = useRef()
  const { setShowCart, getCart, toggleCartItemQty, onRemove } =
    useStateContext()

  return (
    <div className='cart-wrapper' ref={cartRef}>
      <div className='cart-container'>
        <button
          type='button'
          className='cart-heading'
          onClick={() => setShowCart(false)}
        >
          <AiOutlineLeft />
          <span className='heading'>Your cart</span>
          <span className='cart-num-items'>{getCart.length} items</span>
        </button>

        {getCart.length < 1 && (
          <div className='empty-cart'>
            <AiOutlineShopping size={150} />
            <h3> Your shopping cart is empty</h3>
            <Link href='/'>
              <button onClick={() => setShowCart(false)} className='btn'>
                Continue Shopping
              </button>
            </Link>
          </div>
        )}

        <div className='product-container'>
          {console.log(getCart)}
          {getCart.length >= 1 &&
            getCart.map((c) => (
              <div key={c._id} className='product'>
                <img src={urlFor(c?.image[0])} className='cart-product-image' />
                <div className='item-desc'>
                  <div className='flex top'>
                    <h5>{c.name}</h5>
                    <h4>${c.price}</h4>
                  </div>

                  <div className='flex bottom'>
                    <div>
                      <p className='quantity-desc'>
                        <span
                          className='minus'
                          onClick={() => toggleCartItemQty(c, c.quantity - 1)}
                        >
                          <AiOutlineMinus />
                        </span>
                        <span className='num'>{c.quantity}</span>
                        <span
                          className='plus'
                          onClick={() => toggleCartItemQty(c, c.quantity + 1)}
                        >
                          <AiOutlinePlus />
                        </span>
                      </p>
                    </div>
                    <button
                      type='button'
                      className='remove-item'
                      onClick={() => onRemove(c)}
                    >
                      <TiDeleteOutline />
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
        {getCart.length > 0 && (
          <div className='cart-bottom'>
            <div className='total'>
              <h3>Subtotal</h3>
              <h3>
                $
                {getCart
                  .map((c) => c.quantity * c.price)
                  .reduce((a, b) => a + b)}
              </h3>
            </div>
            <div className='btn-container'>
              <button type='button' className='btn' onClick=''>
                Pay with Stripe
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Cart
