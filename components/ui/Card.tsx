import React from 'react';
import styles from './Card.module.css';

interface CardProps {
    children: React.ReactNode;
    className?: string;
    hover?: boolean;
    padding?: 'none' | 'sm' | 'md' | 'lg';
}

export default function Card({
    children,
    className = '',
    hover = false,
    padding = 'md',
}: CardProps) {
    const classes = [
        styles.card,
        hover ? styles.hover : '',
        styles[`padding-${padding}`],
        className,
    ].filter(Boolean).join(' ');

    return <div className={classes}>{children}</div>;
}
