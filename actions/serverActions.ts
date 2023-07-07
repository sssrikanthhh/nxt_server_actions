'use server'
import { Product } from '@/typings'
import { revalidatePath, revalidateTag } from 'next/cache'

export const addProductToDb = async (fd: FormData) => {
	const product = fd.get('product')?.toString()
	const price = fd.get('price')?.toString()

	if (!product || !price) throw Error('all fields are required!!!')

	const newProduct: Product = { product, price }

	await fetch('https://64a78b6c096b3f0fcc816cc2.mockapi.io/products', {
		method: 'POST',
		body: JSON.stringify(newProduct),
		headers: {
			'Content-Type': 'application/json'
		}
	})

	revalidateTag('products')

	// this revalidates a whole path, in this case the home page, but this is bad. If we have multiple fetch request this will trigger all of them causing uneccessary request so it efficeint to revalidate a single entity
	// revalidatePath("/")
}
