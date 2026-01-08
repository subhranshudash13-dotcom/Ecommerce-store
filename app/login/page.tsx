'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Mail, Lock, Chrome } from 'lucide-react';
import styles from './login.module.css';
import { useAuth } from '@/lib/AuthContext';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const success = await login(email, password);
            if (success) {
                router.push('/');
            } else {
                setError('Invalid email or password');
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = () => {
        alert('Google OAuth would be configured with real credentials in production');
    };

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <div className={styles.header}>
                    <h1 className={styles.title}>Welcome Back</h1>
                    <p className={styles.subtitle}>Sign in to your account to continue</p>
                </div>

                <form onSubmit={handleSubmit} className={styles.form}>
                    {error && (
                        <div className={styles.error}>
                            {error}
                        </div>
                    )}

                    <Input
                        type="email"
                        label="Email"
                        placeholder="your@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        icon={<Mail size={20} />}
                        required
                    />

                    <Input
                        type="password"
                        label="Password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        icon={<Lock size={20} />}
                        required
                    />

                    <div className={styles.options}>
                        <label className={styles.checkbox}>
                            <input type="checkbox" />
                            <span>Remember me</span>
                        </label>
                        <Link href="/reset-password" className={styles.link}>
                            Forgot password?
                        </Link>
                    </div>

                    <Button type="submit" fullWidth loading={loading}>
                        Sign In
                    </Button>
                </form>

                <div className={styles.divider}>
                    <span>or continue with</span>
                </div>

                <Button
                    variant="outline"
                    fullWidth
                    onClick={handleGoogleLogin}
                    type="button"
                >
                    <Chrome size={20} />
                    Google
                </Button>

                <p className={styles.footer}>
                    Don't have an account?{' '}
                    <Link href="/signup" className={styles.link}>
                        Sign up
                    </Link>
                </p>

                <div className={styles.demoInfo}>
                    <p className={styles.demoTitle}>Demo Accounts:</p>
                    <p className={styles.demoText}>
                        <strong>Customer:</strong> customer@example.com
                    </p>
                    <p className={styles.demoText}>
                        <strong>Admin:</strong> admin@example.com
                    </p>
                    <p className={styles.demoNote}>Any password works for demo</p>
                </div>
            </div>
        </div>
    );
}
