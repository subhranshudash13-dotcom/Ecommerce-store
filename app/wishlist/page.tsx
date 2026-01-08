'use client';

import React from 'react';
import Link from 'next/link';
import { Heart, ShoppingCart } from 'lucide-react';
import styles from './page.module.css';
import { useWishlist } from '@/lib/WishlistContext';
import { useCart } from '@/lib/CartContext';
import { products } from '@/lib/data';
import { formatPrice } from '@/lib/utils';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

export default function WishlistPage() {
    const { items, removeFromWishlist } = useWishlist();
    const { addToCart, isInCart } = useCart();

    const wishlistProducts = products.filter(p => items.includes(p.id));

    if (wishlistProducts.length === 0) {
        return (
            <div className={styles.container}>
                <div className="container">
                    <div className={styles.empty}>
                        <Heart size={64} className={styles.emptyIcon} />
                        <h2 className={styles.emptyTitle}>Your wishlist is empty</h2>
                        <p className={styles.emptyText}>
                            Save your favorite products for later!
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
                <h1 className={styles.title}>My Wishlist</h1>
                <p className={styles.subtitle}>{wishlistProducts.length} items saved</p>

                <div className={styles.grid}>
                    {wishlistProducts.map((product) => (
                        <Card key={product.id} padding="md" className={styles.item}>
                            <Link href={`/products/${product.id}`}>
                                <img
                                    src={product.images[0]}
                                    alt={product.name}
                                    className={styles.image}
                                />
                            </Link>
                            <div className={styles.details}>
                                <Link href={`/products/${product.id}`} className={styles.name}>
                                    {product.name}
                                </Link>
                                <p className={styles.price}>{formatPrice(product.price)}</p>
                                {product.stock === 0 && (
                                    <p className={styles.outOfStock}>Out of Stock</p>
                                )}
                            </div>
                            <div className={styles.actions}>
                                <Button
                                    fullWidth
                                    size="sm"
                                    onClick={() => addToCart(product)}
                                    disabled={product.stock === 0 || isInCart(product.id)}
                                >
                                    <ShoppingCart size={16} />
                                    {isInCart(product.id) ? 'In Cart' : 'Add to Cart'}
                                </Button>
                                <Button
                                    fullWidth
                                    variant="outline"
                                    size="sm"
                                    onClick={() => removeFromWishlist(product.id)}
                                >
                                    Remove
                                </Button>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
}
