"use client"
import React, {useState} from 'react'
import Stripe from 'stripe'
import ProductCard from './product-card';
interface Props {
    products: Stripe.Product[];
}
const ProductList = ({products}: Props) => {
const [searchTerm, setSearchTerm] = useState<string>("")
const filteredProducts = products.filter((product) => {
    const term = searchTerm.toLowerCase()
    const nameMatch = product.name.toLowerCase().includes(term)
    const descriptionMatch = product.description? product.description.toLowerCase().includes(term) : false
    return nameMatch || descriptionMatch
})
  return (
    <div className='container mx-auto' >
      <div className='flex justify-center ' >
        <input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}  type="text" className=' w-64 border px-2 py-1 my-4 rounded-lg' placeholder='Search products...' />
      </div>
      <ul className='flex flex-wrap gap-2 justify-center my-4 ' >
        {filteredProducts.map((product,key) => {
            return <li className='w-80 shadow-xl' key={key} ><ProductCard product={product} /></li>
        })}
      </ul>
    </div>
  )
}

export default ProductList
