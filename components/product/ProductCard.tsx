'use client';

import React from 'react';
import Link from 'next/link';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import styles from './ProductCard.module.css';
import { Product } from '@/types';
import { formatPrice, calculateDiscount } from '@/lib/utils';
import { useCart } from '@/lib/CartContext';
import { useWishlist } from '@/lib/WishlistContext';
import Button from '../ui/Button';
import Badge from '../ui/Badge';

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    const { addToCart, isInCart } = useCart();
    const { toggleWishlist, isInWishlist } = useWishlist();

    const inWishlist = isInWishlist(product.id);
    const inCart = isInCart(product.id);
    const discount = product.originalPrice
        ? calculateDiscount(product.originalPrice, product.price)
        : 0;

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        addToCart(product);
    };

    const handleToggleWishlist = (e: React.MouseEvent) => {
        e.preventDefault();
        toggleWishlist(product.id);
    };

    return (
        <Link href={`/products/${product.id}`} className={styles.card}>
            <div className={styles.imageContainer}>
                <img
                    src={product.images[0]}
                    alt={product.name}
                    className={styles.image}
                />
                {discount > 0 && (
    <div className={styles.discountBadge}>
        <Badge variant="error">
            -{discount}%
        </Badge>
    </div>
)}
{product.stock < 10 && product.stock > 0 && (
    <div className={styles.stockBadge}>
        <Badge variant="warning">
            Only {product.stock} left
        </Badge>
    </div>
)}
{product.stock === 0 && (
    <div className={styles.stockBadge}>
        <Badge variant="default">
            Out of Stock
        </Badge>
    </div>
)}
                <button
                    className={`${styles.wishlistButton} ${inWishlist ? styles.active : ''}`}
                    onClick={handleToggleWishlist}
                    aria-label="Add to wishlist"
                >
                    <Heart size={20} fill={inWishlist ? 'currentColor' : 'none'} />
                </button>
            </div>

            <div className={styles.content}>
                <h3 className={styles.name}>{product.name}</h3>

                <div className={styles.rating}>
                    <div className={styles.stars}>
                        {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                                key={i}
                                size={14}
                                fill={i < Math.floor(product.rating) ? 'currentColor' : 'none'}
                                className={styles.star}
                            />
                        ))}
                    </div>
                    <span className={styles.reviewCount}>({product.reviewCount})</span>
                </div>

                <div className={styles.priceContainer}>
                    <div className={styles.price}>
                        <span className={styles.currentPrice}>{formatPrice(product.price)}</span>
                        {product.originalPrice && (
                            <span className={styles.originalPrice}>
                                {formatPrice(product.originalPrice)}
                            </span>
                        )}
                    </div>
                </div>

                <Button
                    fullWidth
                    size="sm"
                    onClick={handleAddToCart}
                    disabled={product.stock === 0}
                    variant={inCart ? 'outline' : 'primary'}
                >
                    <ShoppingCart size={16} />
                    {product.stock === 0 ? 'Out of Stock' : inCart ? 'In Cart' : 'Add to Cart'}
                </Button>
            </div>
        </Link>
    );
}
