import React from 'react'
import { Container, Nav, Navbar ,Carousel} from 'react-bootstrap'
import logo from '../assets/logo.jpeg'
import { Link } from 'react-router-dom'
export default function Header() {
  return (
    <>
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand href="#"><img src={logo} alt='image1' className='imagelogo'/></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Link to='/login' className='bg-dark text-white p-3 fs-6 m-5 text-decoration-none'>Login</Link>
             <Link to='/register'  className='bg-dark text-white  p-3 fs-6 m-5 text-decoration-none'>Register</Link>
            {/* <Nav.Link href="#" className='bg-dark text-white p-3 fs-6 m-5'>Login</Nav.Link>
            <Nav.Link href="#"  className='bg-dark text-white  p-3 fs-6 m-5'>Register</Nav.Link> */}
            
          </Nav>
        </Navbar.Collapse>
      </Container >
    </Navbar>
    <h1 className='text-center text-dark my-5 text-uppercase'>WELCOME TO RELAX INN Restaurant</h1>
    <p className='text-danger mb-5 '>
Tucked away in the heart of the city, RELAX INN offers a warm and inviting escape for food lovers. From the moment you step inside, the soft lighting, earthy décor, and gentle aroma of freshly cooked dishes create a sense of comfort. The restaurant specializes in Indian and continental cuisine, blending traditional flavors with modern presentation.

Guests can begin their meal with a range of appetizers, from crispy samosas to creamy soups, before moving on to signature main courses like butter chicken, paneer tikka masala, grilled fish, and wood-fired pizzas. Every dish is prepared with carefully selected spices and locally sourced ingredients to ensure freshness and authenticity.

The spacious dining hall is complemented by cozy seating for families, while the outdoor patio provides a romantic setting for couples. Whether you are celebrating a special occasion or simply enjoying a casual dinner, the friendly and attentive staff make every visit memorable.

To complete the experience, RELAX INN also offers a wide selection of beverages, including refreshing mocktails, artisanal teas, and fine wines. With its balanced mix of flavors, atmosphere, and hospitality, this restaurant has become a beloved destination for both locals and travelers.

    </p>
     {/* <Carousel className='carousel1'>
      <Carousel.Item>
        <img src="https://i.postimg.cc/VLXQ554v/image1.jpg" className='img-fluid' alt='image1'/>
      </Carousel.Item>
      <Carousel.Item>
        <img src="https://i.postimg.cc/8sQ2tVkT/image2.jpg"  className='img-fluid'alt='image1'/>
      </Carousel.Item>
      <Carousel.Item>
        <img src="https://i.postimg.cc/xdpTgqwY/image3.jpg" className='img-fluid' alt='image1'/>
      </Carousel.Item>
      <Carousel.Item>
        <img src="https://i.postimg.cc/g2dJ2Cy9/image4.jpg"  className='img-fluid' alt='image1'/>
      </Carousel.Item>
    </Carousel> */}
    </>
  )
}
