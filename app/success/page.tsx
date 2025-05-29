"use client"

import { useCartStore } from '@/store/cart-store'
import Link from 'next/link'
import React,{useEffect} from 'react'

const  SuccessPage = () => {
    const {clearCart} = useCartStore()
    useEffect(() => {
      clearCart()
    }, [clearCart])
    
  return (
    <div className='text-center my-8' >
      <h1 className='text-2xl font-bold' >Payment Successful!</h1>
      <p className='text-lg my-4' >Thank you for shopping.Your order is being processed.</p>
      <Link className='text-blue-500 font-semibold hover:underline' href={"/products"} >
      Continue Shopping</Link>
    </div>
  )
}

export default  SuccessPage
