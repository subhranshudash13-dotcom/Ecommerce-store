import Link from 'next/link';
import { ArrowRight, ShoppingBag, Shield, Truck, HeadphonesIcon } from 'lucide-react';
import styles from './page.module.css';
import { products, categories } from '@/lib/data';
import ProductCard from '@/components/product/ProductCard';
import Button from '@/components/ui/Button';

export default function HomePage() {
    const featuredProducts = products.filter(p => p.featured);

    return (
        <div className={styles.home}>
            {/* Hero Section */}
            <section className={styles.hero}>
                <div className="container">
                    <div className={styles.heroContent}>
                        <div className={styles.heroText}>
                            <h1 className={styles.heroTitle}>
                                Discover Your Next
                                <span className="gradient-text"> Favorite Product</span>
                            </h1>
                            <p className={styles.heroDescription}>
                                Shop the latest trends in electronics, fashion, and lifestyle. Premium quality at unbeatable prices.
                            </p>
                            <div className={styles.heroActions}>
                                <Link href="/products">
                                    <Button size="lg">
                                        Shop Now <ArrowRight size={20} />
                                    </Button>
                                </Link>
                                <Link href="/products?featured=true">
                                    <Button variant="outline" size="lg">
                                        View Featured
                                    </Button>
                                </Link>
                            </div>
                        </div>
                        <div className={styles.heroImage}>
                            <div className={styles.heroImageGradient}></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features */}
            <section className={styles.features}>
                <div className="container">
                    <div className={styles.featureGrid}>
                        <div className={styles.feature}>
                            <div className={styles.featureIcon}>
                                <Truck size={32} />
                            </div>
                            <h3 className={styles.featureTitle}>Free Shipping</h3>
                            <p className={styles.featureDescription}>
                                On orders over $50
                            </p>
                        </div>
                        <div className={styles.feature}>
                            <div className={styles.featureIcon}>
                                <Shield size={32} />
                            </div>
                            <h3 className={styles.featureTitle}>Secure Payment</h3>
                            <p className={styles.featureDescription}>
                                100% secure transactions
                            </p>
                        </div>
                        <div className={styles.feature}>
                            <div className={styles.featureIcon}>
                                <HeadphonesIcon size={32} />
                            </div>
                            <h3 className={styles.featureTitle}>24/7 Support</h3>
                            <p className={styles.featureDescription}>
                                Always here to help
                            </p>
                        </div>
                        <div className={styles.feature}>
                            <div className={styles.featureIcon}>
                                <ShoppingBag size={32} />
                            </div>
                            <h3 className={styles.featureTitle}>Easy Returns</h3>
                            <p className={styles.featureDescription}>
                                30-day return policy
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Categories */}
            <section className={styles.section}>
                <div className="container">
                    <div className={styles.sectionHeader}>
                        <h2 className={styles.sectionTitle}>Shop by Category</h2>
                        <Link href="/products" className={styles.sectionLink}>
                            View All <ArrowRight size={18} />
                        </Link>
                    </div>
                    <div className={styles.categoryGrid}>
                        {categories.map((category) => (
                            <Link
                                key={category.id}
                                href={`/products?category=${category.slug}`}
                                className={styles.categoryCard}
                            >
                                <img
                                    src={category.image}
                                    alt={category.name}
                                    className={styles.categoryImage}
                                />
                                <div className={styles.categoryOverlay}>
                                    <h3 className={styles.categoryName}>{category.name}</h3>
                                    <p className={styles.categoryCount}>{category.productCount} products</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Products */}
            <section className={styles.section}>
                <div className="container">
                    <div className={styles.sectionHeader}>
                        <h2 className={styles.sectionTitle}>Featured Products</h2>
                        <Link href="/products?featured=true" className={styles.sectionLink}>
                            View All <ArrowRight size={18} />
                        </Link>
                    </div>
                    <div className={styles.productGrid}>
                        {featuredProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className={styles.cta}>
                <div className="container">
                    <div className={styles.ctaContent}>
                        <h2 className={styles.ctaTitle}>Ready to Start Shopping?</h2>
                        <p className={styles.ctaDescription}>
                            Join thousands of happy customers and discover amazing deals today.
                        </p>
                        <Link href="/products">
                            <Button size="lg" variant="secondary">
                                Browse Products <ArrowRight size={20} />
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
