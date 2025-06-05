import React from 'react'
import fb from '../assets/images/fb.png'
import ig from '../assets/images/in.png'
import x from '../assets/images/x.png'


const footer = () => {
  return (
    <div>
     <section class="row bg-warning p-5">
        <div class="col-md-4 text-light fs-5">
            <h3>About Us</h3>
            <p>Rena baby Accessories provides most equipments required by babies</p>
            <p>Our main shop is located in Nairobi. The other shops are located in Mombasa, Nakuru, Kiambu, Eldoret and Kisumu</p>
        </div>
        <div class="col-md-4 text-light">
            <h3>Contact Us</h3>
            <form action="">
                <input type="email" placeholder="Enter Email" class="form-control"/><br/>
                <textarea name="comment" placeholder="Leave A Comment" class="form-control" rows="5"></textarea><br/>
                <input type="submit" value="Send Message" class="btn bg-danger text-light fs-5"/>
            </form>
        </div>
        <div class="col-md-4">
            <h3 class="text-light">You can reach out to us on all our social media platforms</h3>
            <img src={fb} alt="facebook" width="48"/>
            <img src={ig} alt="instagram" width="48"/>
            <img src={x} alt="twitter" width="48"/>
            
        </div>
    </section>
    <footer class="bg-dark text-light text-center">
        <p>Developed by Hope. &copy; all rights reserved &trade;</p>
    </footer>
    </div>
  )
}

export default footer
