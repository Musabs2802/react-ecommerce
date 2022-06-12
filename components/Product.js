import Link from 'next/link'
import { urlFor } from '../lib/client'

const Product = ({ data }) => {
  return (
    <div>
      <Link href={`/product/${data.slug.current}`}>
        <div className='product-card'>
          <img
            src={urlFor(data.image && data.image[0])}
            width={250}
            height={250}
            className='product-image'
          />
          <p className='product-name'>{data.name}</p>
          <p className='product-price'>${data.price}</p>
        </div>
      </Link>
    </div>
  )
}

export default Product
