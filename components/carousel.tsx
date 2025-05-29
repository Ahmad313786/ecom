"use client"
import React,{useState,useEffect} from 'react'
import Stripe from 'stripe'
import { Card, CardContent, CardTitle } from './ui/card'
import Image from 'next/image'
interface Props {
    products: Stripe.Product[]
}
const Carousel = ({products}: Props) => {
  const [current, setCurrent] = useState<number>(0)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % products.length)

      return () => clearInterval(interval)
    }, 3000);
  }, [products.length])
  const currentProduct = products[current]
  const price = currentProduct.default_price as Stripe.Price
  return (
    <Card className='relative overflow-hidden rounded-lg shadow-md border border-gray-300' >
      {currentProduct.images && currentProduct.images[0] && (
        <div className='relative h-80 w-full' >
          <Image alt={currentProduct.name} src={currentProduct.images[0]} className='transition-opacity duration-500 ease-in-out' layout='fill' objectFit='cover' />
        </div>
      )}
      <CardContent className='absolute inset-0 flex flex-col items-center justify center  ' >
        <CardTitle className='text-3xl font-bold mb-2 mt-32' >{currentProduct.name}</CardTitle>
        {price && price.unit_amount && <p className='text-xl text-lg font-semibold' > ${(price.unit_amount / 100).toFixed(2)}</p>}
      </CardContent>
    </Card>
  )
}

export default Carousel
