"use client"

import React from 'react'
import Stripe from 'stripe'
import Image from 'next/image'
import { Button } from './ui/button'
import { useCartStore } from '@/store/cart-store'

interface Props {
    product: Stripe.Product
}
const ProductDetail = ({ product }: Props) => {
    const {items, addItem, removeItem} =  useCartStore()
    const price = product.default_price as Stripe.Price
    const cardItem = items.find((item) => item.id === product.id)
    const quantity = cardItem ? cardItem.quantity : 0

    const onAddItem = () => {
        addItem({
            id: product.id,
            name: product.name,
            price: price.unit_amount as number,
            imageURL: product.images ? product.images[0] : null,
            quantity: 1,

        })
    }
    return (
        <div className='flex flex-wrap  md:justify-center gap-4 my-4' >
            {product.images && product.images[0] && (
                <div className='md:w-1/2 w-full h-96 relative' >
                    <Image alt={product.name} src={product.images[0]} className='w-64 h-72' layout='fill' objectFit='cover' />
                </div>
            )}
            <div className='md:w-1/3 md:py-20 md:px-10 p-10 ' >
                <h1 className='font-bold text-2xl' >{product.name}</h1>
                {product.description && (<p className='font-normal my-2' >{product.description}</p>)}
                {price && price.unit_amount && <p className='Text-lg font-bold mb-2' > ${(price.unit_amount / 100).toFixed(2)}</p>}
                <div>
                    <Button variant="outline" onClick={()=> removeItem(product.id)} >-</Button>
                    <span className='p-3' >{quantity}</span>
                    <Button onClick={onAddItem} variant="outline" className='bg-black text-white' >+</Button>
                </div>
            </div>
        </div>
    )
}

export default ProductDetail
