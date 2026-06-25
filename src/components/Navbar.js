'use client';

import Link from 'next/link';
import { Navbar, Container, Nav, Badge } from 'react-bootstrap';
import { useCart } from '@/context/CartContext';

export default function NavbarComponent() {
     const { getTotalItems } = useCart();
     const cartItemsCount = getTotalItems();

     return (
          <Navbar bg="light" expand="lg" sticky="top" className="shadow-sm">
               <Container>
                    <Navbar.Brand as={Link} href="/" className="fw-bold fs-5">
                         🛍️ EcomStore
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                         <Nav className="ms-auto align-items-lg-center">
                              <Nav.Link as={Link} href="/" className="pe-lg-3">
                                   Home
                              </Nav.Link>
                              <Nav.Link as={Link} href="/products" className="pe-lg-3">
                                   Products
                              </Nav.Link>
                              <Nav.Link as={Link} href="/about" className="pe-lg-3">
                                   About
                              </Nav.Link>
                              <Nav.Link as={Link} href="/contact" className="pe-lg-3">
                                   Contact
                              </Nav.Link>
                              <Nav.Link as={Link} href="/cart" className="ms-lg-3 mt-3 mt-lg-0 d-inline-flex align-items-center">
                                   🛒 Cart
                                   {cartItemsCount > 0 && (
                                        <Badge bg="danger" className="ms-2">
                                             {cartItemsCount}
                                        </Badge>
                                   )}
                              </Nav.Link>
                         </Nav>
                    </Navbar.Collapse>
               </Container>
          </Navbar>
     );
}