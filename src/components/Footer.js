'use client';

import Link from 'next/link';
import { Container, Row, Col } from 'react-bootstrap';

export default function Footer() {
     return (
          <footer className="bg-dark text-light pt-5 pb-4">
               <Container>
                    <Row className="gy-4">
                         <Col md={4}>
                              <h5>About Us</h5>
                              <p className='text-secondary'>Your one-stop shop for quality products at great prices.</p>
                         </Col>
                         <Col md={2}>
                              <h5>Quick Links</h5>
                              <ul className="list-unstyled">
                                   <li className="mb-2">
                                        <Link href="/" className="text-secondary text-decoration-none">Home</Link>
                                   </li>
                                   <li className="mb-2">
                                        <Link href="/products" className="text-secondary text-decoration-none">Products</Link>
                                   </li>
                                   <li className="mb-2">
                                        <Link href="/about" className="text-secondary text-decoration-none">About</Link>
                                   </li>
                                   <li className="mb-2">
                                        <Link href="/contact" className="text-secondary text-decoration-none">Contact</Link>
                                   </li>
                              </ul>
                         </Col>
                         <Col md={3}>
                              <h5>Customer Service</h5>
                              <ul className="list-unstyled">
                                   <li className="mb-2">
                                        <Link href="#" className="text-secondary text-decoration-none">Shipping Info</Link>
                                   </li>
                                   <li className="mb-2">
                                        <Link href="#" className="text-secondary text-decoration-none">Returns</Link>
                                   </li>
                                   <li className="mb-2">
                                        <Link href="#" className="text-secondary text-decoration-none">FAQ</Link>
                                   </li>
                                   <li className="mb-2">
                                        <Link href="#" className="text-secondary text-decoration-none">Support</Link>
                                   </li>
                              </ul>
                         </Col>
                         <Col md={3}>
                              <h5>Contact Info</h5>
                              <p className="text-secondary mb-1">Email: info@ecomstore.com</p>
                              <p className="text-secondary mb-1">Phone: 1-800-ECOM-STORE</p>
                              <p className="text-secondary mb-0">Hours: 9AM - 9PM EST</p>
                         </Col>
                    </Row>
                    <div className="text-center mt-4">
                         <p className="mb-0">&copy; 2024 EcomStore. All rights reserved.</p>
                    </div>
               </Container>
          </footer>
     );
}
