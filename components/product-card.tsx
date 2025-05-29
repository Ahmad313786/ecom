import Link from 'next/link';
import React from 'react'
import Image from 'next/image';
import Stripe from 'stripe'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
interface Props {
    product: Stripe.Product;
}
const ProductCard = ({ product }: Props) => {
    const price = product.default_price as Stripe.Price

    return (
        <Link href={`products/${product.id}`} className='' >
            <Card className='' >
                {product.images && product.images[0] && (
                    <div className='relative h-64' >
                        <Image alt={product.name} src={product.images[0]} className='' layout='fill' objectFit='cover' />
                    </div>
                )}
                <CardHeader>
                    <CardTitle className='text-xl font-bold' >
                        {product.name}
                    </CardTitle>
                    <CardContent>
                        {product.description}
                        {price && price.unit_amount && <p className='Text-lg' > ${(price.unit_amount / 100).toFixed(2)}</p>}
                        <Button className='w-full' > View Details</Button>
                    </CardContent>
                </CardHeader>
            </Card>
        </Link>
    )
}

export default ProductCard
