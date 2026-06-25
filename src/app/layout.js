import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ToastProvider from '@/components/ToastProvider';
import Wrapper from '@/components/Wrapper';
import '@/styles/globals.css';
import { CartProvider } from '@/context/CartContext';

export const metadata = {
     title: 'EcomStore - Your Online Shopping Destination',
     description: 'Shop amazing products at great prices with fast delivery',
     keywords: 'ecommerce, shopping, products, online store',
};

export default function RootLayout({ children }) {
     return (
          <html lang="en">
               <body>
                    <CartProvider>
                         <ToastProvider />
                         <Wrapper>
                              <Navbar />
                              <main className="container py-4">{children}</main>
                              <Footer />
                         </Wrapper>
                    </CartProvider>
               </body>
          </html>
     );
}
