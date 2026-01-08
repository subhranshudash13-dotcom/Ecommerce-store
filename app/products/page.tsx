'use client';

import React, { useState, useMemo } from 'react';
import { Filter, X } from 'lucide-react';
import styles from './page.module.css';
import { products as allProducts, categories } from '@/lib/data';
import ProductCard from '@/components/product/ProductCard';
import Button from '@/components/ui/Button';

export default function ProductsPage() {
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 2000]);
    const [sortBy, setSortBy] = useState<string>('featured');
    const [showFilters, setShowFilters] = useState(false);

    const filteredProducts = useMemo(() => {
        let filtered = [...allProducts];

        // Filter by category
        if (selectedCategory !== 'all') {
            filtered = filtered.filter(p => p.category === selectedCategory);
        }

        // Filter by price range
        filtered = filtered.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

        // Sort
        switch (sortBy) {
            case 'price-low':
                filtered.sort((a, b) => a.price - b.price);
                break;
            case 'price-high':
                filtered.sort((a, b) => b.price - a.price);
                break;
            case 'rating':
                filtered.sort((a, b) => b.rating - a.rating);
                break;
            case 'newest':
                filtered.reverse();
                break;
            default:
                // featured - already in order
                break;
        }

        return filtered;
    }, [selectedCategory, priceRange, sortBy]);

    return (
        <div className={styles.container}>
            <div className="container">
                <div className={styles.header}>
                    <div>
                        <h1 className={styles.title}>All Products</h1>
                        <p className={styles.subtitle}>
                            {filteredProducts.length} products found
                        </p>
                    </div>
                    <Button
                        variant="outline"
                        onClick={() => setShowFilters(!showFilters)}
                        className={styles.filterButton}
                    >
                        <Filter size={20} />
                        Filters
                    </Button>
                </div>

                <div className={styles.content}>
                    {/* Filters Sidebar */}
                    <aside className={`${styles.sidebar} ${showFilters ? styles.show : ''}`}>
                        <div className={styles.sidebarHeader}>
                            <h3 className={styles.sidebarTitle}>Filters</h3>
                            <button
                                className={styles.closeButton}
                                onClick={() => setShowFilters(false)}
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <div className={styles.filterSection}>
                            <h4 className={styles.filterTitle}>Category</h4>
                            <div className={styles.filterOptions}>
                                <label className={styles.filterOption}>
                                    <input
                                        type="radio"
                                        name="category"
                                        checked={selectedCategory === 'all'}
                                        onChange={() => setSelectedCategory('all')}
                                    />
                                    <span>All Categories</span>
                                </label>
                                {categories.map((cat) => (
                                    <label key={cat.id} className={styles.filterOption}>
                                        <input
                                            type="radio"
                                            name="category"
                                            checked={selectedCategory === cat.slug}
                                            onChange={() => setSelectedCategory(cat.slug)}
                                        />
                                        <span>{cat.name}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div className={styles.filterSection}>
                            <h4 className={styles.filterTitle}>Price Range</h4>
                            <div className={styles.priceRange}>
                                <input
                                    type="range"
                                    min="0"
                                    max="2000"
                                    value={priceRange[1]}
                                    onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                                    className={styles.rangeSlider}
                                />
                                <div className={styles.priceLabels}>
                                    <span>${priceRange[0]}</span>
                                    <span>${priceRange[1]}</span>
                                </div>
                            </div>
                        </div>

                        <Button
                            fullWidth
                            variant="outline"
                            onClick={() => {
                                setSelectedCategory('all');
                                setPriceRange([0, 2000]);
                            }}
                        >
                            Reset Filters
                        </Button>
                    </aside>

                    {/* Products Grid */}
                    <div className={styles.main}>
                        <div className={styles.toolbar}>
                            <span className={styles.resultCount}>
                                {filteredProducts.length} Products
                            </span>
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className={styles.sortSelect}
                            >
                                <option value="featured">Featured</option>
                                <option value="newest">Newest</option>
                                <option value="price-low">Price: Low to High</option>
                                <option value="price-high">Price: High to Low</option>
                                <option value="rating">Highest Rated</option>
                            </select>
                        </div>

                        {filteredProducts.length > 0 ? (
                            <div className={styles.productGrid}>
                                {filteredProducts.map((product) => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </div>
                        ) : (
                            <div className={styles.empty}>
                                <p>No products found matching your criteria.</p>
                                <Button
                                    onClick={() => {
                                        setSelectedCategory('all');
                                        setPriceRange([0, 2000]);
                                    }}
                                >
                                    Reset Filters
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
