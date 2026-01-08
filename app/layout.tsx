import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/styles/globals.css';
import { AuthProvider } from '@/lib/AuthContext';
import { CartProvider } from '@/lib/CartContext';
import { WishlistProvider } from '@/lib/WishlistContext';
import { ThemeProvider } from '@/lib/ThemeContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'ShopHub - Your Premium Ecommerce Store',
    description: 'Discover amazing products at unbeatable prices. Shop electronics, clothing, accessories, and more.',
    keywords: 'ecommerce, online shopping, electronics, clothing, accessories',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <ThemeProvider>
                    <AuthProvider>
                        <CartProvider>
                            <WishlistProvider>
                                <Header />
                                <main style={{ minHeight: 'calc(100vh - 400px)' }}>
                                    {children}
                                </main>
                                <Footer />
                            </WishlistProvider>
                        </CartProvider>
                    </AuthProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
