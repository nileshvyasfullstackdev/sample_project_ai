'use client';

import { Button } from 'react-bootstrap';

export default function HeroSection() {
     return (
          <section className="bg-primary text-white py-5">
               <div className="container">
                    <h1>Welcome to EcomStore</h1>
                    <p>Discover amazing products at unbeatable prices. Shop now and enjoy fast delivery!</p>
                    <div className="d-flex flex-column flex-sm-row gap-3 mt-4">
                         <Button href="/products" variant="light" className="btn-md">
                              Shop Now
                         </Button>
                         <Button href="/about" variant="outline-light" className="btn-md">
                              Learn More
                         </Button>
                    </div>
               </div>
          </section>
     );
}
