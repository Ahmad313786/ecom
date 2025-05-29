import React from 'react'
import { stripe } from '@/lib/stripe'
import ProductList from '@/components/product-list'
const ProductsPage = async () => {
  const products = await stripe.products.list({
      expand: ["data.default_price"],
    })
  return (
    <div className='mt-4' >
      <h1 className='text-3xl font-bold text-center' >All Products</h1>
      <ProductList products={products.data} />
    </div>
  )
}

export default ProductsPage