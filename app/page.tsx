// 1. server actions allows to perform server side mutations on the client side.(server actions can be used both on the client components and server components)
// 2. Server actions reduces the amount of client side JS
// 3. server actions supports the progressively enhanced forms(means they work even the JS is disabled in the browser)

import { Product } from '@/typings'
import { addProductToDb } from '@/actions/serverActions'
import AddProductBtn from '@/components/AddProductBtn'

export default async function Home() {
	const res = await fetch(
		'https://64a78b6c096b3f0fcc816cc2.mockapi.io/products',
		{
			cache: 'no-cache',
			next: {
				tags: ['products']
			}
		}
	)

	const products: Product[] = await res.json()
	return (
		<main className=''>
			<h1 className='text-3xl text-center font-bold m-3'>Add a product</h1>
			<AddProductBtn />
			<form
				action={addProductToDb}
				className='flex flex-col max-w-xl mx-auto gap-4 p-3'
			>
				<input
					name='product'
					className='border border-gray-600 p-3 rounded-md '
					placeholder='enter product name...'
				/>
				<input
					name='price'
					className='border border-gray-600 p-3 rounded-md'
					placeholder='enter product price...'
				/>
				<button className='bg-violet-400 text-white p-3 border  border-gray-700 rounded-md font-bold'>
					Add product
				</button>
			</form>
			<h2 className='text-xl text-center font-bold my-3'>Products List</h2>
			<div className='flex flex-col gap-5 align-center'>
				{products.map(product => (
					<div key={product.id} className='p-5 w-80  shadow self-center'>
						<p>
							<span className='font-bold'>Product:</span> {product.product}
						</p>
						<p>
							<span className='font-bold'>Price:</span> {product.price}
						</p>
					</div>
				))}
			</div>
		</main>
	)
}
