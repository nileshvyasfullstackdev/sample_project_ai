'use client';

import { Container, Row, Col, Card } from 'react-bootstrap';
import PageBanner from '../../components/PageBanner';

export default function About() {
     return (
          <>
               <PageBanner title="About EcomStore" subtitle="Your trusted online shopping destination" variant="primary" />
               <div className="py-5">
                    <Container>
                         <Row className="mb-5">
                              <Col lg={8}>
                                   <h2 className="mb-3">Our Story</h2>
                                   <p>
                                        Welcome to EcomStore, your trusted online shopping destination. We provide a wide selection of
                                        high-quality products with excellent customer service. Since our founding, we&apos;ve been committed
                                        to delivering the best shopping experience to our customers.
                                   </p>
                              </Col>
                         </Row>
                         <h3 className="mb-4">Our Values</h3>
                         <div className="masonry-container" style={{ columnCount: 2 }}>
                              <div className="masonry-item">
                                   <Card className="h-100 shadow-sm">
                                        <Card.Body>
                                             <Card.Title className="text-primary">Our Mission</Card.Title>
                                             <Card.Text>
                                                  To provide the best online shopping experience with quality products at competitive prices.
                                             </Card.Text>
                                        </Card.Body>
                                   </Card>
                              </div>
                              <div className="masonry-item">
                                   <Card className="h-100 shadow-sm">
                                        <Card.Body>
                                             <Card.Title className="text-primary">Our Vision</Card.Title>
                                             <Card.Text>
                                                  To become the leading online marketplace trusted by millions worldwide for exceptional products
                                                  and outstanding service.
                                             </Card.Text>
                                        </Card.Body>
                                   </Card>
                              </div>
                         </div>
                         <h3 className="mb-4 mt-5">By The Numbers</h3>
                         <div className="masonry-container">
                              <div className="masonry-item">
                                   <Card className="text-center shadow-sm">
                                        <Card.Body>
                                             <h3 className="text-primary mb-2">100K+</h3>
                                             <p>Happy Customers</p>
                                        </Card.Body>
                                   </Card>
                              </div>
                              <div className="masonry-item">
                                   <Card className="text-center shadow-sm">
                                        <Card.Body>
                                             <h3 className="text-primary mb-2">50K+</h3>
                                             <p>Products</p>
                                        </Card.Body>
                                   </Card>
                              </div>
                              <div className="masonry-item">
                                   <Card className="text-center shadow-sm">
                                        <Card.Body>
                                             <h3 className="text-primary mb-2">24/7</h3>
                                             <p>Customer Support</p>
                                        </Card.Body>
                                   </Card>
                              </div>
                         </div>
                    </Container>
               </div>
          </>
     );
}
