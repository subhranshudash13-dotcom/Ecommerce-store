'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle } from 'lucide-react';
import styles from './page.module.css';
import { useCart } from '@/lib/CartContext';
import { useAuth } from '@/lib/AuthContext';
import { formatPrice } from '@/lib/utils';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Card from '@/components/ui/Card';

export default function CheckoutPage() {
    const router = useRouter();
    const { items, subtotal, clearCart } = useCart();
    const { user, isAuthenticated } = useAuth();
    const [loading, setLoading] = useState(false);
    const [orderPlaced, setOrderPlaced] = useState(false);

    const shipping = subtotal > 50 ? 0 : 10;
    const tax = subtotal * 0.1;
    const total = subtotal + shipping + tax;

    const handlePlaceOrder = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!isAuthenticated) {
            router.push('/login');
            return;
        }

        setLoading(true);

        // Simulate order processing
        await new Promise(resolve => setTimeout(resolve, 2000));

        setOrderPlaced(true);
        clearCart();
        setLoading(false);
    };

    if (items.length === 0 && !orderPlaced) {
        router.push('/cart');
        return null;
    }

    if (orderPlaced) {
        return (
            <div className={styles.container}>
                <div className="container">
                    <div className={styles.success}>
                        <CheckCircle size={64} className={styles.successIcon} />
                        <h2 className={styles.successTitle}>Order Placed Successfully!</h2>
                        <p className={styles.successText}>
                            Thank you for your purchase. Your order confirmation has been sent to your email.
                        </p>
                        <div className={styles.successActions}>
                            <Button size="lg" onClick={() => router.push('/')}>
                                Continue Shopping
                            </Button>
                            <Button variant="outline" size="lg" onClick={() => router.push('/orders')}>
                                View Orders
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <div className="container">
                <h1 className={styles.title}>Checkout</h1>

                <form onSubmit={handlePlaceOrder} className={styles.content}>
                    <div className={styles.main}>
                        <Card padding="lg">
                            <h3 className={styles.sectionTitle}>Shipping Information</h3>
                            <div className={styles.formGrid}>
                                <Input label="Full Name" placeholder="John Doe" required />
                                <Input label="Email" type="email" placeholder="john@example.com" defaultValue={user?.email} required />
                                <Input label="Phone" type="tel" placeholder="+1 234 567 8900" required />
                                <Input label="Address" placeholder="123 Main St" required />
                                <Input label="City" placeholder="New York" required />
                                <Input label="State" placeholder="NY" required />
                                <Input label="ZIP Code" placeholder="10001" required />
                                <Input label="Country" placeholder="USA" required />
                            </div>
                        </Card>

                        <Card padding="lg">
                            <h3 className={styles.sectionTitle}>Payment Information</h3>
                            <div className={styles.formGrid}>
                                <div style={{ gridColumn: '1 / -1' }}>
                                    <Input label="Card Number" placeholder="1234 5678 9012 3456" required />
                                </div>
                                <Input label="Expiry Date" placeholder="MM/YY" required />
                                <Input label="CVV" placeholder="123" required />
                                <div style={{ gridColumn: '1 / -1' }}>
                                    <Input label="Cardholder Name" placeholder="John Doe" required />
                                </div>
                            </div>
                            <p className={styles.paymentNote}>
                                🔒 Your payment information is secure and encrypted
                            </p>
                        </Card>
                    </div>

                    <div className={styles.sidebar}>
                        <Card padding="lg">
                            <h3 className={styles.sectionTitle}>Order Summary</h3>

                            <div className={styles.orderItems}>
                                {items.map((item) => (
                                    <div key={item.productId} className={styles.orderItem}>
                                        <img src={item.product.images[0]} alt={item.product.name} className={styles.orderItemImage} />
                                        <div className={styles.orderItemDetails}>
                                            <p className={styles.orderItemName}>{item.product.name}</p>
                                            <p className={styles.orderItemQty}>Qty: {item.quantity}</p>
                                        </div>
                                        <p className={styles.orderItemPrice}>{formatPrice(item.product.price * item.quantity)}</p>
                                    </div>
                                ))}
                            </div>

                            <div className={styles.divider}></div>

                            <div className={styles.summaryRow}>
                                <span>Subtotal</span>
                                <span>{formatPrice(subtotal)}</span>
                            </div>

                            <div className={styles.summaryRow}>
                                <span>Shipping</span>
                                <span>{shipping === 0 ? 'FREE' : formatPrice(shipping)}</span>
                            </div>

                            <div className={styles.summaryRow}>
                                <span>Tax</span>
                                <span>{formatPrice(tax)}</span>
                            </div>

                            <div className={styles.divider}></div>

                            <div className={styles.summaryRow}>
                                <span className={styles.totalLabel}>Total</span>
                                <span className={styles.totalAmount}>{formatPrice(total)}</span>
                            </div>

                            <Button type="submit" fullWidth size="lg" loading={loading}>
                                Place Order
                            </Button>
                        </Card>
                    </div>
                </form>
            </div>
        </div>
    );
}
