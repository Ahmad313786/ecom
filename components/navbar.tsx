"use client"
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Bars3Icon, ShoppingCartIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { useCartStore } from '@/store/cart-store'
import { Button } from './ui/button'
import clsx from 'clsx'

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState<boolean>(false)
  const { items } = useCartStore()
  const cartCount = items.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileOpen(false)
      }
    }
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <nav className='relative'>
      <div className='border sticky flex justify-between p-4'>
        <div>
          <Link href="/" className='font-semibold text-xl hover:text-blue-500'>My Ecommerce</Link>
        </div>
        <div className='md:flex space-x-5 hidden *:font-semibold'>
          <Link className='hover:text-blue-500' href='/'>Home</Link>
          <Link className='hover:text-blue-500' href='/products'>Products</Link>
          <Link className='hover:text-blue-500' href='/checkout'>Checkout</Link>
        </div>
        <div className='flex items-center space-x-4'>
          <Link href="/checkout" className='relative'>
            <ShoppingCartIcon className='size-5' />
            {cartCount > 0 && (
              <span className='absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1 rounded-full'>
                {cartCount}
              </span>
            )}
          </Link>
          <Button variant="ghost" className='md:hidden' onClick={() => setMobileOpen(prev => !prev)}>
            {mobileOpen ? (<XMarkIcon className='w-6 h-6' />) : (<Bars3Icon className='w-6 h-6' />)}
          </Button>
        </div>
      </div>

      {/* Mobile dropdown with transition */}
      <div className={clsx(
        "absolute top-full left-0 shadow-lg rounded w-full bg-white border z-50 transition-all duration-300 ease-out overflow-hidden",
        mobileOpen
          ? "max-h-60 opacity-100 scale-100"
          : "max-h-0 opacity-0 scale-95 pointer-events-none"
      )}>
        <ul className='flex flex-col p-4 space-y-2'>
          <li>
            <Link className='font-semibold hover:text-blue-500' href="/" onClick={() => setMobileOpen(false)}>Home</Link>
          </li>
          <li>
            <Link className='font-semibold hover:text-blue-500' href="/products" onClick={() => setMobileOpen(false)}>Products</Link>
          </li>
          <li>
            <Link className='font-semibold hover:text-blue-500' href="/checkout" onClick={() => setMobileOpen(false)}>Checkout</Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
