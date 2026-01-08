'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface WishlistContextType {
    items: string[];
    addToWishlist: (productId: string) => void;
    removeFromWishlist: (productId: string) => void;
    isInWishlist: (productId: string) => boolean;
    toggleWishlist: (productId: string) => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
    const [items, setItems] = useState<string[]>([]);

    // Load wishlist from localStorage on mount
    useEffect(() => {
        const storedWishlist = localStorage.getItem('wishlist');
        if (storedWishlist) {
            try {
                setItems(JSON.parse(storedWishlist));
            } catch (error) {
                console.error('Failed to parse stored wishlist:', error);
            }
        }
    }, []);

    // Save wishlist to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('wishlist', JSON.stringify(items));
    }, [items]);

    const addToWishlist = (productId: string) => {
        setItems(currentItems => {
            if (!currentItems.includes(productId)) {
                return [...currentItems, productId];
            }
            return currentItems;
        });
    };

    const removeFromWishlist = (productId: string) => {
        setItems(currentItems => currentItems.filter(id => id !== productId));
    };

    const isInWishlist = (productId: string): boolean => {
        return items.includes(productId);
    };

    const toggleWishlist = (productId: string) => {
        if (isInWishlist(productId)) {
            removeFromWishlist(productId);
        } else {
            addToWishlist(productId);
        }
    };

    return (
        <WishlistContext.Provider
            value={{
                items,
                addToWishlist,
                removeFromWishlist,
                isInWishlist,
                toggleWishlist,
            }}
        >
            {children}
        </WishlistContext.Provider>
    );
}

export function useWishlist() {
    const context = useContext(WishlistContext);
    if (context === undefined) {
        throw new Error('useWishlist must be used within a WishlistProvider');
    }
    return context;
}
