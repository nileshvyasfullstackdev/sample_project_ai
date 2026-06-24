'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Card, Button } from 'react-bootstrap';
import styles from '@/styles/home.scss';
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
          <Card className={styles['product-card']}>
               <div className={styles['product-image-wrapper']}>
                    <Card.Img
                         variant="top"
                         src={product.image || 'https://picsum.photos/200'}
                         alt={product.name}
                         className={styles['product-image']}
                    />
               </div>
               <Card.Body className={styles['product-info']}>
                    <Card.Title>{product.name}</Card.Title>
                    <div className={styles.rating}>⭐ {product.rating || 4.5} (Reviews: {product.reviews || 0})</div>
                    <div className={styles.price}>${product.price}</div>
                    <Card.Text>{product.description}</Card.Text>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                         <Button variant="outline-secondary" size="sm" onClick={decrementQuantity}>
                              -
                         </Button>
                         <input style={{ textAlign: 'center' }}
                              type="number"
                              min="1"
                              value={quantity}
                              onChange={handleQuantityInput}
                              className={styles['quantity-select']}
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
