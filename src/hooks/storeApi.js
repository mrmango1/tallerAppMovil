import { useEffect, useState } from 'react'

export const useProducts = () => {
  const [products, setProducts] = useState([])

  useEffect(() => {
    fetch('http://localhost:3000/products')
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => {
        setProducts([])
        console.log(err)
      })
  }, [])
  return { products }
}
