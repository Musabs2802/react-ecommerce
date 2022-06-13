import React, { createContext, useContext, useState, useEffect } from 'react'
import toast from 'react-hot-toast'

const Context = createContext()

export const StateContext = ({ children }) => {
  const [getShowCart, setShowCart] = useState(false)
  const [getCart, setCart] = useState([])

  const [getQty, setQty] = useState(1)

  const onAdd = (product, qty) => {
    const isInCart = getCart.find((c) => c._id === product._id)

    if (isInCart) {
      setCart((prevCart) =>
        prevCart.map((c) => {
          if (c._id == product._id) {
            return {
              ...c,
              quantity: c.quantity + qty,
            }
          }
        })
      )
    } else {
      product.quantity = qty
      setCart((prevCart) => [...prevCart, { ...product }])
    }

    toast.success(`${qty} ${product.name} added to cart.`)
    setQty(1)
  }

  const incQty = () => setQty((prev) => prev + 1)

  const decQty = () => {
    console.log('dec')
    setQty((prev) => {
      if (prev - 1 < 1) return 1
      return prev - 1
    })
  }

  return (
    <Context.Provider
      value={{
        getShowCart,
        getCart,
        getQty,
        incQty,
        decQty,
        onAdd,
      }}
    >
      {children}
    </Context.Provider>
  )
}

export const useStateContext = () => useContext(Context)
