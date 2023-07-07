// using server actions in client component using the usetransition hook from react
// use transition hook disables the progressive enhancement feature
// we can directly use the server actions, without using the use transition hook
'use client'
import { useTransition } from 'react'
import { addProductToDb } from '@/actions/serverActions'

const AddProductBtn = () => {
	const [isPending, startTransition] = useTransition()

	const fd = new FormData()
	fd.append('product', 'test product')
	fd.append('price', '999')
	return (
		<button
			onClick={() => startTransition(() => addProductToDb(fd))}
			className='fixed top-5 left-5 border bg-violet-500 p-2 rounded-md text-white'
		>
			{isPending ? 'Adding test product...' : 'Add test product'}
		</button>
	)
}

export default AddProductBtn
