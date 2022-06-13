import {
  AiFillFacebook,
  AiFillInstagram,
  AiOutlineTwitter,
} from 'react-icons/ai'

const Footer = () => {
  return (
    <div className='footer-container'>
      <p>2022 Sound Electronics. All rights reserved</p>
      <p className='icons'>
        <AiFillInstagram />
        <AiOutlineTwitter />
        <AiFillFacebook />
      </p>
    </div>
  )
}

export default Footer
