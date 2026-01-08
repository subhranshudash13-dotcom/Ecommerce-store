import React from 'react';
import styles from './Badge.module.css';

interface BadgeProps {
    children: React.ReactNode;
    variant?: 'default' | 'success' | 'warning' | 'error' | 'info';
    size?: 'sm' | 'md';
    className?: string;
}

export default function Badge({
    children,
    variant = 'default',
    size = 'md',
    className = '',
}: BadgeProps) {
    return (
        <span className={`${styles.badge} ${styles[variant]} ${styles[size]} ${className}`}>
            {children}
        </span>
    );
}
