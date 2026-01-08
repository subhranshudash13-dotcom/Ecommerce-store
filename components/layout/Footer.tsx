import React from 'react';
import Link from 'next/link';
import { Facebook, Twitter, Instagram, Youtube, Mail } from 'lucide-react';
import styles from './Footer.module.css';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className={styles.footer}>
            <div className="container">
                <div className={styles.content}>
                    <div className={styles.section}>
                        <h3 className={styles.logo}>ShopHub</h3>
                        <p className={styles.description}>
                            Your one-stop destination for premium products. Quality, affordability, and exceptional service.
                        </p>
                        <div className={styles.social}>
                            <a href="#" className={styles.socialLink} aria-label="Facebook">
                                <Facebook size={20} />
                            </a>
                            <a href="#" className={styles.socialLink} aria-label="Twitter">
                                <Twitter size={20} />
                            </a>
                            <a href="#" className={styles.socialLink} aria-label="Instagram">
                                <Instagram size={20} />
                            </a>
                            <a href="#" className={styles.socialLink} aria-label="YouTube">
                                <Youtube size={20} />
                            </a>
                        </div>
                    </div>

                    <div className={styles.section}>
                        <h4 className={styles.title}>Shop</h4>
                        <ul className={styles.links}>
                            <li><Link href="/products?category=electronics">Electronics</Link></li>
                            <li><Link href="/products?category=clothing">Clothing</Link></li>
                            <li><Link href="/products?category=accessories">Accessories</Link></li>
                            <li><Link href="/products?category=footwear">Footwear</Link></li>
                            <li><Link href="/products?category=sports">Sports</Link></li>
                        </ul>
                    </div>

                    <div className={styles.section}>
                        <h4 className={styles.title}>Customer Service</h4>
                        <ul className={styles.links}>
                            <li><Link href="/contact">Contact Us</Link></li>
                            <li><Link href="/shipping">Shipping Info</Link></li>
                            <li><Link href="/returns">Returns</Link></li>
                            <li><Link href="/faq">FAQ</Link></li>
                            <li><Link href="/track-order">Track Order</Link></li>
                        </ul>
                    </div>

                    <div className={styles.section}>
                        <h4 className={styles.title}>Company</h4>
                        <ul className={styles.links}>
                            <li><Link href="/about">About Us</Link></li>
                            <li><Link href="/careers">Careers</Link></li>
                            <li><Link href="/privacy">Privacy Policy</Link></li>
                            <li><Link href="/terms">Terms of Service</Link></li>
                        </ul>
                    </div>

                    <div className={styles.section}>
                        <h4 className={styles.title}>Newsletter</h4>
                        <p className={styles.newsletterText}>
                            Subscribe to get special offers and updates.
                        </p>
                        <form className={styles.newsletter}>
                            <input
                                type="email"
                                placeholder="Your email"
                                className={styles.newsletterInput}
                            />
                            <button type="submit" className={styles.newsletterButton}>
                                <Mail size={20} />
                            </button>
                        </form>
                    </div>
                </div>

                <div className={styles.bottom}>
                    <p className={styles.copyright}>
                        © {currentYear} ShopHub. All rights reserved.
                    </p>
                    <div className={styles.payment}>
                        <span className={styles.paymentText}>We accept:</span>
                        <div className={styles.paymentMethods}>
                            <span className={styles.paymentMethod}>💳 Visa</span>
                            <span className={styles.paymentMethod}>💳 Mastercard</span>
                            <span className={styles.paymentMethod}>💳 PayPal</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
