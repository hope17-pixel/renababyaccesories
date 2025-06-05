import React from 'react'
import p1 from '../assets/images/p1.jpg'
import p3 from '../assets/images/p3.jpeg'
import p2 from '../assets/images/p2.png'
import p4 from '../assets/images/p4.jpg'

const carousel = () => {
  return (
    <div>
      <div class="row">
        <div class="col-md-12">
            <div class="carousel slide" data-bs-ride="carousel" id="mycarousel">
              
                 <div class="carousel-inner">
                    <div class="carousel-item active">
                        <img src={p4} alt="p4" class="d-block w-100" height={300}/>
                    </div>
                    <div class="carousel-item">
                        <img src={p1} alt="p1" class="d-block w-100" height={300}/>
                    </div>
                    <div class="carousel-item">
                        <img src={p2} alt="p2" class="d-block w-100" height={300}/>
                    </div>
                    <div class="carousel-item">
                        <img src={p3} alt="p3" class="d-block w-100" height={300}/>
                    </div>
                 </div>
                
                   <a href="#mycarousel" class="carousel-control-prev" data-bs-slide="prev">
                    <span class="carousel-control-prev-icon bg-danger"></span>
                   </a>
                   <a href="#mycarousel" class="carousel-control-next" data-bs-slide="next">
                    <span class="carousel-control-next-icon bg-danger"></span>
                   </a>
            
            </div>
                   
        </div>
      </div>
    </div>
  )
}

export default carousel
