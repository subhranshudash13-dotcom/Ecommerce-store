'use client';

import React from 'react';
import Link from 'next/link';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import styles from './page.module.css';
import { useCart } from '@/lib/CartContext';
import { formatPrice } from '@/lib/utils';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

export default function CartPage() {
    const { items, updateQuantity, removeFromCart, subtotal, itemCount } = useCart();

    const shipping = subtotal > 50 ? 0 : 10;
    const tax = subtotal * 0.1;
    const total = subtotal + shipping + tax;

    if (items.length === 0) {
        return (
            <div className={styles.container}>
                <div className="container">
                    <div className={styles.empty}>
                        <ShoppingBag size={64} className={styles.emptyIcon} />
                        <h2 className={styles.emptyTitle}>Your cart is empty</h2>
                        <p className={styles.emptyText}>
                            Add some products to get started!
                        </p>
                        <Link href="/products">
                            <Button size="lg">Browse Products</Button>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <div className="container">
                <h1 className={styles.title}>Shopping Cart</h1>
                <p className={styles.subtitle}>{itemCount} items in your cart</p>

                <div className={styles.content}>
                    <div className={styles.items}>
                        {items.map((item) => (
                            <Card key={item.productId} padding="md" className={styles.cartItem}>
                                <img
                                    src={item.product.images[0]}
                                    alt={item.product.name}
                                    className={styles.itemImage}
                                />
                                <div className={styles.itemDetails}>
                                    <Link href={`/products/${item.productId}`} className={styles.itemName}>
                                        {item.product.name}
                                    </Link>
                                    <p className={styles.itemPrice}>
                                        {formatPrice(item.product.price)}
                                    </p>
                                    {item.product.stock < 10 && (
                                        <p className={styles.stockWarning}>
                                            Only {item.product.stock} left in stock
                                        </p>
                                    )}
                                </div>
                                <div className={styles.itemActions}>
                                    <div className={styles.quantity}>
                                        <button
                                            className={styles.quantityButton}
                                            onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                                            disabled={item.quantity <= 1}
                                        >
                                            <Minus size={16} />
                                        </button>
                                        <span className={styles.quantityValue}>{item.quantity}</span>
                                        <button
                                            className={styles.quantityButton}
                                            onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                                            disabled={item.quantity >= item.product.stock}
                                        >
                                            <Plus size={16} />
                                        </button>
                                    </div>
                                    <p className={styles.itemTotal}>
                                        {formatPrice(item.product.price * item.quantity)}
                                    </p>
                                    <button
                                        className={styles.removeButton}
                                        onClick={() => removeFromCart(item.productId)}
                                        aria-label="Remove item"
                                    >
                                        <Trash2 size={20} />
                                    </button>
                                </div>
                            </Card>
                        ))}
                    </div>

                    <div className={styles.summary}>
                        <Card padding="lg">
                            <h3 className={styles.summaryTitle}>Order Summary</h3>

                            <div className={styles.summaryRow}>
                                <span>Subtotal</span>
                                <span>{formatPrice(subtotal)}</span>
                            </div>

                            <div className={styles.summaryRow}>
                                <span>Shipping</span>
                                <span>{shipping === 0 ? 'FREE' : formatPrice(shipping)}</span>
                            </div>

                            <div className={styles.summaryRow}>
                                <span>Tax (10%)</span>
                                <span>{formatPrice(tax)}</span>
                            </div>

                            <div className={styles.divider}></div>

                            <div className={styles.summaryRow}>
                                <span className={styles.totalLabel}>Total</span>
                                <span className={styles.totalAmount}>{formatPrice(total)}</span>
                            </div>

                            {shipping > 0 && (
                                <p className={styles.shippingNote}>
                                    Add {formatPrice(50 - subtotal)} more for free shipping!
                                </p>
                            )}

                            <Link href="/checkout">
                                <Button fullWidth size="lg">
                                    Proceed to Checkout
                                </Button>
                            </Link>

                            <Link href="/products">
                                <Button fullWidth variant="outline" size="lg">
                                    Continue Shopping
                                </Button>
                            </Link>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
