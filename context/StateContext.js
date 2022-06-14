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

  const onRemove = (item) => {
    setCart((prevCart) => prevCart.filter((pc) => pc._id != item._id))
  }

  const toggleCartItemQty = (item, newQty) => {
    if (newQty > 0) {
      setCart((prevCart) =>
        prevCart.map((c) => {
          if (c._id == item._id) {
            return {
              ...c,
              quantity: newQty,
            }
          } else return c
        })
      )
    }
  }

  const incQty = () => setQty((prev) => prev + 1)

  const decQty = () => {
    setQty((prev) => {
      if (prev - 1 < 1) return 1
      return prev - 1
    })
  }

  return (
    <Context.Provider
      value={{
        getShowCart,
        setShowCart,
        getCart,
        getQty,
        incQty,
        decQty,
        onAdd,
        onRemove,
        toggleCartItemQty,
      }}
    >
      {children}
    </Context.Provider>
  )
}

export const useStateContext = () => useContext(Context)
