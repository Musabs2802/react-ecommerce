import { useState } from 'react'
import {
  AiFillStar,
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineStar,
} from 'react-icons/ai'
import Product from '../../components/Product'
import { client, urlFor } from '../../lib/client'

const ProductDetails = ({ products, product }) => {
  const [getImgIndex, setImgIndex] = useState(0)

  return (
    <div>
      <div className='product-detail-container'>
        <div>
          <div className='image-container'>
            <img
              src={urlFor(product.image && product.image[getImgIndex])}
              className='product-detail-image'
            ></img>
          </div>
          <div className='small-images-container'>
            {product.image?.map((img, i) => (
              <img
                key={i}
                src={urlFor(img)}
                onMouseEnter={() => setImgIndex(i)}
                className={`small-image ${
                  getImgIndex == i && 'selected-image'
                }`}
              />
            ))}
          </div>
        </div>
        <div className='product-detail-desc'>
          <h1>{product.name}</h1>
          <div className='reviews'>
            <div>
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiOutlineStar />
            </div>
            <p>{10}</p>
          </div>
          <h4>Details:</h4>
          <p>{product.details}</p>
          <p className='price'>${product.price}</p>
          <div className='quantity'>
            <h3>Quantity:</h3>
            <p className='quantity-desc'>
              <span className='minus' onClick=''>
                <AiOutlineMinus />
              </span>
              <span className='num' onClick=''>
                {0}
              </span>
              <span className='plus' onClick=''>
                <AiOutlinePlus />
              </span>
            </p>
          </div>
          <div className='buttons'>
            <button type='button' className='add-to-cart' onclick=''>
              Add to Cart
            </button>
            <button type='button' className='buy-now' onclick=''>
              Buy Now
            </button>
          </div>
        </div>
      </div>
      <div className='maylike-products-wrapper'>
        <h2>You may also like</h2>
        <div className='marquee'>
          <div className='maylike-products-container track'>
            {products.map((p) => (
              <Product key={p._id} data={p} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export const getStaticPaths = async () => {
  const query = `*[_type == "product"] {slug {current}}`

  const products = await client.fetch(query)

  const paths = products.map((p) => ({
    params: {
      slug: p.slug.current,
    },
  }))

  return {
    paths,
    fallback: 'blocking',
  }
}

export const getStaticProps = async ({ params }) => {
  const productQuery = `*[_type == "product" && slug.current == '${params.slug}'][0]`
  const product = await client.fetch(productQuery)

  const productsQuery = '*[_type == "product"]'
  const products = await client.fetch(productsQuery)

  return {
    props: { products, product },
  }
}

export default ProductDetails
