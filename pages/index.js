import { FooterBanner, HeroBanner } from "../components"

const index = () => {
  return <>
  <HeroBanner />
  
  <div>
    <h2>Best Selling Products</h2>
    <p>Speakers of many variations</p>
  </div>

  <div>
    {["Product 1", "Product 2"].map(p => p)}
  </div>

  <FooterBanner />
  </>
}

export default index
