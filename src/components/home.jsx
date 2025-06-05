
import React from 'react'
import Carousel from './carousel';
import home1 from '../assets/images/home1.webp'
import Footer from './Footer'




const home = () => {
  return (
    <div>
      <Carousel/>
      
      <h2>These are some of the products that we offer </h2>
      <img src={home1} alt="" className=''/>
     
      <Footer/>

     
     
    </div>
  )
}

export default home
