import { FooterBanner, HeroBanner } from '../components'
import Product from '../components/Product'
import { client } from '../lib/client'

const index = ({ products, banners }) => {
  return (
    <>
      <HeroBanner data={banners.length > 0 && banners[0]} />

      <div className='products-heading'>
        <h2>Best Selling Products</h2>
      </div>

      <div className='products-container'>
        {products?.map((p) => (
          <Product key={p._id} data={p} />
        ))}
      </div>

      <FooterBanner />
    </>
  )
}

export const getServerSideProps = async () => {
  const pQuery = '*[_type == "product"]'
  const products = await client.fetch(pQuery)

  const bQuery = '*[_type == "banner"]'
  const banners = await client.fetch(bQuery)

  return {
    props: { products, banners },
  }
}

export default index
