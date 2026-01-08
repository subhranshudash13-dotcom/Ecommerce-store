import React from 'react';
import styles from './Badge.module.css';

interface BadgeProps {
    children: React.ReactNode;
    variant?: 'default' | 'success' | 'warning' | 'error' | 'info';
    size?: 'sm' | 'md';
}

export default function Badge({
    children,
    variant = 'default',
    size = 'md',
}: BadgeProps) {
    return (
        <span className={`${styles.badge} ${styles[variant]} ${styles[size]}`}>
            {children}
        </span>
    );
}
