import { FooterBanner, HeroBanner } from '../components'
import { client } from '../lib/client'

const index = ({ products, banners }) => {
  return (
    <>
      <HeroBanner data={banners.length > 0 && banners[0]} />

      <div>
        <h2>Best Selling Products</h2>
        <p>Speakers of many variations</p>
      </div>

      <div>{products?.map((p) => p.name)}</div>

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
