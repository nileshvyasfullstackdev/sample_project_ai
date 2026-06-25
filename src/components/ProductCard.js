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
          <Card className="h-100 shadow-sm">
               <Card.Img
                    variant="top"
                    src={product.image || 'https://picsum.photos/200'}
                    alt={product.name}
               />
               <Card.Body>
                    <Card.Title>{product.name}</Card.Title>
                    <div className="d-flex justify-content-between align-items-center mb-3 text-muted">
                         <span>⭐ {product.rating || 4.5}</span>
                         <span className="fw-bold text-dark">${product.price}</span>
                    </div>
                    <Card.Text>{product.description}</Card.Text>
                    <div className="d-flex align-items-center gap-2 mb-3">
                         <Button variant="outline-secondary" size="sm" onClick={decrementQuantity}>
                              -
                         </Button>
                         <input
                              type="number"
                              min="1"
                              value={quantity}
                              onChange={handleQuantityInput}
                              className="form-control text-center"
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
