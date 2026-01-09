'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    ShoppingCart,
    Heart,
    User,
    Search,
    Menu,
    X,
    Sun,
    Moon,
    LogOut,
    Package,
    Settings,
    Droplets,
    Sunset
} from 'lucide-react';
import styles from './Header.module.css';
import { useAuth } from '@/lib/AuthContext';
import { useCart } from '@/lib/CartContext';
import { useWishlist } from '@/lib/WishlistContext';
import { useTheme } from '@/lib/ThemeContext';
import Button from '../ui/Button';

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [userMenuOpen, setUserMenuOpen] = useState(false);

    const { user, logout, isAuthenticated } = useAuth();
    const { itemCount } = useCart();
    const { items: wishlistItems } = useWishlist();
    const { theme, toggleTheme } = useTheme();
    const pathname = usePathname();

    const categories = [
        { name: 'Electronics', href: '/products?category=electronics' },
        { name: 'Clothing', href: '/products?category=clothing' },
        { name: 'Accessories', href: '/products?category=accessories' },
        { name: 'Footwear', href: '/products?category=footwear' },
        { name: 'Sports', href: '/products?category=sports' },
    ];

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            window.location.href = `/products?search=${encodeURIComponent(searchQuery)}`;
        }
    };

    const getThemeIcon = () => {
        switch (theme) {
            case 'light': return <Sun size={20} strokeWidth={2.5} />;
            case 'dark': return <Moon size={20} strokeWidth={2.5} />;
            case 'ocean': return <Droplets size={20} strokeWidth={2.5} />;
            case 'sunset': return <Sunset size={20} strokeWidth={2.5} />;
            default: return <Sun size={20} strokeWidth={2.5} />;
        }
    };

    return (
        <header className={styles.header}>
            <div className={styles.topBar}>
                <div className="container">
                    <div className={styles.topBarContent}>
                        <p className={styles.announcement}>
                            🎉 Free shipping on orders over $50!
                        </p>
                        <div className={styles.topBarActions}>
                            <button
                                className={styles.themeToggle}
                                onClick={toggleTheme}
                                aria-label={`Current theme: ${theme}. Click to switch theme.`}
                                title="Switch Theme"
                            >
                                {getThemeIcon()}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.mainHeader}>
                <div className="container">
                    <div className={styles.mainHeaderContent}>
                        <button
                            className={styles.mobileMenuButton}
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            aria-label="Toggle menu"
                        >
                            {mobileMenuOpen ? <X size={24} strokeWidth={2.5} /> : <Menu size={24} strokeWidth={2.5} />}
                        </button>

                        <Link href="/" className={styles.logo}>
                            <span className={styles.logoText}>ShopHub</span>
                        </Link>

                        <form className={styles.searchBar} onSubmit={handleSearch}>
                            <Search className={styles.searchIcon} size={20} strokeWidth={2.5} />
                            <input
                                type="text"
                                placeholder="Search products..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className={styles.searchInput}
                            />
                        </form>

                        <div className={styles.actions}>
                            <Link href="/wishlist" className={styles.iconButton}>
                                <Heart size={22} strokeWidth={2.5} />
                                {wishlistItems.length > 0 && (
                                    <span className={styles.badge}>{wishlistItems.length}</span>
                                )}
                            </Link>

                            <Link href="/cart" className={styles.iconButton}>
                                <ShoppingCart size={22} strokeWidth={2.5} />
                                {itemCount > 0 && (
                                    <span className={styles.badge}>{itemCount}</span>
                                )}
                            </Link>

                            {isAuthenticated ? (
                                <div className={styles.userMenu}>
                                    <button
                                        className={styles.userButton}
                                        onClick={() => setUserMenuOpen(!userMenuOpen)}
                                    >
                                        {user?.avatar ? (
                                            <img src={user.avatar} alt={user.name} className={styles.avatar} />
                                        ) : (
                                            <User size={22} strokeWidth={2.5} />
                                        )}
                                    </button>

                                    {userMenuOpen && (
                                        <div className={styles.userDropdown}>
                                            <div className={styles.userInfo}>
                                                <p className={styles.userName}>{user?.name}</p>
                                                <p className={styles.userEmail}>{user?.email}</p>
                                            </div>
                                            <div className={styles.divider}></div>
                                            <Link href="/dashboard" className={styles.dropdownItem}>
                                                <User size={18} strokeWidth={2.5} />
                                                Dashboard
                                            </Link>
                                            <Link href="/orders" className={styles.dropdownItem}>
                                                <Package size={18} strokeWidth={2.5} />
                                                Orders
                                            </Link>
                                            <Link href="/settings" className={styles.dropdownItem}>
                                                <Settings size={18} strokeWidth={2.5} />
                                                Settings
                                            </Link>
                                            <div className={styles.divider}></div>
                                            <button
                                                className={styles.dropdownItem}
                                                onClick={() => {
                                                    logout();
                                                    setUserMenuOpen(false);
                                                }}
                                            >
                                                <LogOut size={18} strokeWidth={2.5} />
                                                Logout
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <Link href="/login">
                                    <Button size="sm">Sign In</Button>
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <nav className={styles.nav}>
                <div className="container">
                    <ul className={styles.navList}>
                        {categories.map((category) => (
                            <li key={category.name}>
                                <Link
                                    href={category.href}
                                    className={styles.navLink}
                                >
                                    {category.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </nav>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className={styles.mobileMenu}>
                    <div className={styles.mobileMenuContent}>
                        <form className={styles.mobileSearch} onSubmit={handleSearch}>
                            <Search className={styles.searchIcon} size={20} strokeWidth={2.5} />
                            <input
                                type="text"
                                placeholder="Search products..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className={styles.searchInput}
                            />
                        </form>

                        <nav className={styles.mobileNav}>
                            <h3 className={styles.mobileNavTitle}>Categories</h3>
                            {categories.map((category) => (
                                <Link
                                    key={category.name}
                                    href={category.href}
                                    className={styles.mobileNavLink}
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    {category.name}
                                </Link>
                            ))}
                        </nav>

                        {!isAuthenticated && (
                            <div className={styles.mobileAuth}>
                                <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                                    <Button fullWidth>Sign In</Button>
                                </Link>
                                <Link href="/signup" onClick={() => setMobileMenuOpen(false)}>
                                    <Button variant="outline" fullWidth>Sign Up</Button>
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </header>
    );
}
