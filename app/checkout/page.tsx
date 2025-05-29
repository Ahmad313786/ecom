"use client"
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useCartStore } from '@/store/cart-store'
import React from 'react'
import { checkoutAction } from './checkout-action'

const CheckoutPage = () => {
  const { items,addItem,removeItem, clearCart } = useCartStore()
  const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0)
  if (total === 0 || items.length === 0) {
    return (<div className='text-center my-4 text-3xl font-bold' ><h2>Your Cart is Empty.</h2></div>)
  }
  return (
    <div className='' >
      <h1 className='text-2xl font-bold my-5 text-center' > Checkout </h1>
      <Card className='lg:w-1/3 md:w-1/2  container mx-auto' >
        <CardHeader className='border-b' >
          <CardTitle className='font-bold ' >
            Order Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul>
            {items.map((item, Key) => (
              <li key={Key} className=' border-b p-2' >
                <div className='flex justify-between my-3' >
                  <span className='text-lg font-semibold' >{item.name}</span>
                  <span className='text-lg font-semibold'  > ${((item.price * item.quantity) / 100).toFixed(2)}</span>
                </div>
                <div className='my-2' >
                  <Button variant="outline" onClick={() => removeItem(item.id)} >-</Button>
                  <span className='p-3' >{item.quantity}</span>
                  <Button onClick={() => addItem({...item, quantity: 1}) } variant="outline" className='bg-black text-white' >+</Button>
                </div>
              </li>
            ))}
          </ul>
          <div>
          <h1 className='text-lg font-bold' >  Total: <span className='mx-3 font-semibold' >${(total / 100).toFixed(2)}</span> </h1>
          </div>
        </CardContent>
      </Card>
      <form action={checkoutAction} className='flex justify-center  text-center my-4' >
        <div className='flex flex-col w-1/3' >
        <input type="hidden" name="items" value={JSON.stringify(items)} />
        <Button type='submit' className='my-2' >
          Proceed to Payment
        </Button>
        <Button onClick={() => clearCart()} >
          Clear Cart
        </Button>
        </div>
      </form>
    </div>
  )
}

export default CheckoutPage
