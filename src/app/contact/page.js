'use client';

import { Container, Form, Button, Spinner } from 'react-bootstrap';
import PageBanner from '../../components/PageBanner';
import { useState } from 'react';
import { toast } from 'react-toastify';

const API_URL = process.env.NEXT_PUBLIC_API_URL || '';

export default function Contact() {
     const [formData, setFormData] = useState({
          name: '',
          email: '',
          subject: '',
          message: '',
     });

     const [loading, setLoading] = useState(false);
     const [errors, setErrors] = useState({});

     const validateForm = () => {
          const newErrors = {};

          // Name validation
          if (!formData.name.trim()) {
               newErrors.name = 'Name is required';
          } else if (formData.name.trim().length < 2) {
               newErrors.name = 'Name must be at least 2 characters';
          }

          // Email validation
          if (!formData.email.trim()) {
               newErrors.email = 'Email is required';
          } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
               newErrors.email = 'Invalid email format';
          }

          // Subject validation
          if (!formData.subject.trim()) {
               newErrors.subject = 'Subject is required';
          } else if (formData.subject.trim().length < 5) {
               newErrors.subject = 'Subject must be at least 5 characters';
          }

          // Message validation
          if (!formData.message.trim()) {
               newErrors.message = 'Message is required';
          } else if (formData.message.trim().length < 10) {
               newErrors.message = 'Message must be at least 10 characters';
          }

          return newErrors;
     };

     const handleChange = (e) => {
          const { name, value } = e.target;
          setFormData((prev) => ({
               ...prev,
               [name]: value,
          }));
          // Clear error for this field when user starts typing
          if (errors[name]) {
               setErrors((prev) => ({
                    ...prev,
                    [name]: '',
               }));
          }
     };

     const handleSubmit = async (e) => {
          e.preventDefault();

          // Validate form
          const newErrors = validateForm();
          setErrors(newErrors);

          if (Object.keys(newErrors).length > 0) {
               toast.error('❌ Please fix the errors in the form', {
                    position: 'top-right',
                    autoClose: 3000,
               });
               return;
          }

          setLoading(true);

          try {
               const response = await fetch(`${API_URL}/api/contact/submit`, {
                    method: 'POST',
                    headers: {
                         'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
               });

               const data = await response.json();

               if (!response.ok) {
                    throw new Error(data.error || 'Failed to submit form');
               }

               toast.success('✅ ' + data.message, {
                    position: 'top-right',
                    autoClose: 3000,
               });

               // Reset form
               setFormData({ name: '', email: '', subject: '', message: '' });
               setErrors({});
          } catch (error) {
               console.error('Contact form error:', error);
               toast.error('❌ ' + (error.message || 'Failed to submit form. Please try again.'), {
                    position: 'top-right',
                    autoClose: 3000,
               });
          } finally {
               setLoading(false);
          }
     };

     return (
          <>
               <PageBanner title="Contact Us" subtitle="We'd love to hear from you" variant="primary" />
               <div className="py-5">
                    <Container>
                         <div className="row">
                              <div className="col-lg-6 mx-auto">
                              <Form onSubmit={handleSubmit}>
                                   <Form.Group className="mb-3">
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control
                                             type="text"
                                             name="name"
                                             placeholder="Your name"
                                             value={formData.name}
                                             onChange={handleChange}
                                             isInvalid={!!errors.name}
                                        />
                                        {errors.name && (
                                             <Form.Control.Feedback type="invalid" style={{ display: 'block' }}>
                                                  {errors.name}
                                             </Form.Control.Feedback>
                                        )}
                                   </Form.Group>

                                   <Form.Group className="mb-3">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control
                                             type="email"
                                             name="email"
                                             placeholder="your@email.com"
                                             value={formData.email}
                                             onChange={handleChange}
                                             isInvalid={!!errors.email}
                                        />
                                        {errors.email && (
                                             <Form.Control.Feedback type="invalid" style={{ display: 'block' }}>
                                                  {errors.email}
                                             </Form.Control.Feedback>
                                        )}
                                   </Form.Group>

                                   <Form.Group className="mb-3">
                                        <Form.Label>Subject</Form.Label>
                                        <Form.Control
                                             type="text"
                                             name="subject"
                                             placeholder="Subject (min 5 characters)"
                                             value={formData.subject}
                                             onChange={handleChange}
                                             isInvalid={!!errors.subject}
                                        />
                                        {errors.subject && (
                                             <Form.Control.Feedback type="invalid" style={{ display: 'block' }}>
                                                  {errors.subject}
                                             </Form.Control.Feedback>
                                        )}
                                   </Form.Group>

                                   <Form.Group className="mb-3">
                                        <Form.Label>Message</Form.Label>
                                        <Form.Control
                                             as="textarea"
                                             rows={5}
                                             name="message"
                                             placeholder="Your message (min 10 characters)"
                                             value={formData.message}
                                             onChange={handleChange}
                                             isInvalid={!!errors.message}
                                        />
                                        {errors.message && (
                                             <Form.Control.Feedback type="invalid" style={{ display: 'block' }}>
                                                  {errors.message}
                                             </Form.Control.Feedback>
                                        )}
                                   </Form.Group>

                                   <div className="d-grid gap-2">
                                        <Button
                                             variant="primary"
                                             size="lg"
                                             type="submit"
                                             disabled={loading}
                                        >
                                             {loading ? (
                                                  <>
                                                       <Spinner
                                                            animation="border"
                                                            size="sm"
                                                            className="me-2"
                                                       />
                                                       Sending...
                                                  </>
                                             ) : (
                                                  'Send Message'
                                             )}
                                        </Button>
                                   </div>
                              </Form>

                              <div className="mt-5 p-4 bg-light rounded">
                                   <h4 className="mb-3">Other Ways to Reach Us</h4>
                                   <p>
                                        <strong>Email:</strong> info@ecomstore.com
                                   </p>
                                   <p>
                                        <strong>Phone:</strong> 1-800-ECOM-STORE
                                   </p>
                                   <p>
                                        <strong>Hours:</strong> Monday - Friday, 9AM - 9PM EST
                                   </p>
                              </div>
                         </div>
                    </div>
                    </Container>
               </div>
          </>
     );
}
