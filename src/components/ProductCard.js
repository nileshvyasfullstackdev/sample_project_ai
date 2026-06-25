'use client';

import { useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import { useCart } from '@/context/CartContext';
import { toast } from 'react-toastify';

export default function ProductCard({ product }) {
     const { addToCart } = useCart();
     const [quantity, setQuantity] = useState(0);

     const handleAddToCart = () => {
          addToCart(product, quantity);
          toast.success(`✅ ${product.name} added to cart!`, {
               position: 'top-right',
               autoClose: 2000,
          });
          setQuantity(1);
     };

     const incrementQuantity = () => setQuantity((prev) => prev + 1);
     const decrementQuantity = () => setQuantity((prev) => Math.max(0, prev - 1));
     const handleQuantityInput = (event) => {
          const value = parseInt(event.target.value, 10);
          setQuantity(Number.isNaN(value) || value < 1 ? 1 : value);
     };

     return (
          <Card>
               <div>
                    <Card.Img
                         variant="top"
                         src={product.image || 'https://picsum.photos/200'}
                         alt={product.name}
                    />
               </div>
               <Card.Body>
                    <Card.Title>{product.name}</Card.Title>
                    <div>⭐ {product.rating || 4.5} (Reviews: {product.reviews || 0})</div>
                    <div>${product.price}</div>
                    <Card.Text>{product.description}</Card.Text>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                         <Button variant="outline-secondary" size="sm" onClick={decrementQuantity}>
                              -
                         </Button>
                         <input
                              type="number"
                              min="1"
                              value={quantity}
                              onChange={handleQuantityInput}
                              style={{ width: '70px', padding: '0.5rem', textAlign: 'center', borderRadius: '0.5rem', border: '1px solid #d1d5db' }}
                         />
                         <Button variant="outline-secondary" size="sm" onClick={incrementQuantity}>
                              +
                         </Button>
                    </div>
                    <Button variant="primary" className="w-100 mt-3" onClick={handleAddToCart}>
                         Add to Cart
                    </Button>
               </Card.Body>
          </Card>
     );
}
