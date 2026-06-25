'use client';

import { Container } from 'react-bootstrap';
import PageBanner from '../../components/PageBanner';
import ProductCard from '../../components/ProductCard';

const mockProducts = [
     {
          id: 1,
          name: 'Premium Wireless Headphones',
          price: 199.99,
          image: '/products/headphones.jpg',
          description: 'High-quality sound with noise cancellation',
          rating: 4.8,
          reviews: 124,
     },
     {
          id: 2,
          name: 'Smartwatch Pro',
          price: 299.99,
          image: '/products/smartwatch.jpg',
          description: 'Track your fitness with advanced features',
          rating: 4.6,
          reviews: 89,
     },
     {
          id: 3,
          name: 'Portable Charger',
          price: 49.99,
          image: '/products/charger.jpg',
          description: 'Fast charging for all your devices',
          rating: 4.9,
          reviews: 256,
     },
     {
          id: 4,
          name: 'USB-C Cable',
          price: 14.99,
          image: '/products/cable.jpg',
          description: 'Durable and fast data transfer',
          rating: 4.7,
          reviews: 412,
     },
];

export default function Products() {
     return (
          <>
               <PageBanner title="All Products" subtitle="Browse our complete collection of premium products" variant="primary" />
               <div className="py-5">
                    <Container>
                         <div className="masonry-container">
                              {mockProducts.map((product) => (
                                   <div key={product.id} className="masonry-item">
                                        <ProductCard product={product} />
                                   </div>
                              ))}
                         </div>
                    </Container>
               </div>
          </>
     );
}
