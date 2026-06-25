'use client';

import { Container, Table, Button } from 'react-bootstrap';
import { useCart } from '@/context/CartContext';
import Link from 'next/link';

export default function Cart() {
     const { cartItems, removeFromCart, updateQuantity, getTotalPrice } = useCart();

     const total = getTotalPrice();

     const handleRemove = (productId) => {
          removeFromCart(productId);
     };

     const handleQuantityChange = (productId, newQuantity) => {
          if (!Number.isNaN(newQuantity) && newQuantity > 0) {
               updateQuantity(productId, newQuantity);
          }
     };

     const incrementItem = (productId, currentQuantity) => {
          updateQuantity(productId, currentQuantity + 1);
     };

     const decrementItem = (productId, currentQuantity) => {
          updateQuantity(productId, currentQuantity - 1);
     };

     return (
          <>
               <div className="bg-light rounded-3 p-4 mb-4">
                    <Container>
                         <h1>Shopping Cart</h1>
                         <p className="text-muted mb-0">Review and checkout your items</p>
                    </Container>
               </div>
               <div className="py-5">
                    {cartItems.length > 0 ? (
                         <>
                              <Table striped bordered hover responsive>
                                   <thead className="bg-light">
                                        <tr>
                                             <th>Product</th>
                                             <th>Price</th>
                                             <th>Quantity</th>
                                             <th>Total</th>
                                             <th>Action</th>
                                        </tr>
                                   </thead>
                                   <tbody>
                                        {cartItems.map((item) => (
                                             <tr key={item.id}>
                                                  <td>{item.name}</td>
                                                  <td>${item.price.toFixed(2)}</td>
                                                  <td>
                                                       <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                                                            <Button
                                                                 variant="outline-secondary"
                                                                 size="sm"
                                                                 onClick={() => decrementItem(item.id, item.quantity)}
                                                            >
                                                                 -
                                                            </Button>
                                                            <input
                                                                 type="number"
                                                                 min="1"
                                                                 value={item.quantity}
                                                                 onChange={(e) =>
                                                                      handleQuantityChange(item.id, parseInt(e.target.value, 10))
                                                                 }
                                                                 style={{ width: '60px', padding: '5px', textAlign: 'center' }}
                                                            />
                                                            <Button
                                                                 variant="outline-secondary"
                                                                 size="sm"
                                                                 onClick={() => incrementItem(item.id, item.quantity)}
                                                            >
                                                                 +
                                                            </Button>
                                                       </div>
                                                  </td>
                                                  <td>${(item.price * item.quantity).toFixed(2)}</td>
                                                  <td>
                                                       <Button
                                                            variant="danger"
                                                            size="sm"
                                                            onClick={() => handleRemove(item.id)}
                                                       >
                                                            Remove
                                                       </Button>
                                                  </td>
                                             </tr>
                                        ))}
                                   </tbody>
                              </Table>
                              <div className="text-end mt-4">
                                   <h3 className="mb-3">Total: ${total.toFixed(2)}</h3>
                                   <Button variant="primary" size="lg" className="me-2">
                                        Checkout
                                   </Button>
                                   <Link href="/products">
                                        <Button variant="outline-secondary" size="lg">
                                             Continue Shopping
                                        </Button>
                                   </Link>
                              </div>
                         </>
                    ) : (
                         <div className="text-center py-5">
                              <h3>Your cart is empty</h3>
                              <p className="text-muted mb-4">Add some products to get started</p>
                              <Link href="/products">
                                   <Button variant="primary" size="lg">
                                        Continue Shopping
                                   </Button>
                              </Link>
                         </div>
                    )}
               </div>
          </>
     );
}
