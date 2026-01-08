'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Mail, Lock, User, Chrome } from 'lucide-react';
import styles from './signup.module.css';
import { useAuth } from '@/lib/AuthContext';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { isValidEmail } from '@/lib/utils';

export default function SignupPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { signup } = useAuth();
    const router = useRouter();

    const getPasswordStrength = (pass: string): string => {
        if (pass.length === 0) return '';
        if (pass.length < 6) return 'weak';
        if (pass.length < 10) return 'medium';
        return 'strong';
    };

    const passwordStrength = getPasswordStrength(password);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!isValidEmail(email)) {
            setError('Please enter a valid email address');
            return;
        }

        if (password.length < 6) {
            setError('Password must be at least 6 characters');
            return;
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        setLoading(true);

        try {
            const success = await signup(email, password, name);
            if (success) {
                router.push('/');
            } else {
                setError('Failed to create account');
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSignup = () => {
        alert('Google OAuth would be configured with real credentials in production');
    };

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <div className={styles.header}>
                    <h1 className={styles.title}>Create Account</h1>
                    <p className={styles.subtitle}>Join us and start shopping today</p>
                </div>

                <form onSubmit={handleSubmit} className={styles.form}>
                    {error && (
                        <div className={styles.error}>
                            {error}
                        </div>
                    )}

                    <Input
                        type="text"
                        label="Full Name"
                        placeholder="John Doe"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        icon={<User size={20} />}
                        required
                    />

                    <Input
                        type="email"
                        label="Email"
                        placeholder="your@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        icon={<Mail size={20} />}
                        required
                    />

                    <div>
                        <Input
                            type="password"
                            label="Password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            icon={<Lock size={20} />}
                            required
                        />
                        {password && (
                            <div className={styles.passwordStrength}>
                                <div className={`${styles.strengthBar} ${styles[passwordStrength]}`}></div>
                                <span className={styles.strengthText}>
                                    {passwordStrength === 'weak' && 'Weak password'}
                                    {passwordStrength === 'medium' && 'Medium password'}
                                    {passwordStrength === 'strong' && 'Strong password'}
                                </span>
                            </div>
                        )}
                    </div>

                    <Input
                        type="password"
                        label="Confirm Password"
                        placeholder="••••••••"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        icon={<Lock size={20} />}
                        required
                    />

                    <label className={styles.checkbox}>
                        <input type="checkbox" required />
                        <span>
                            I agree to the{' '}
                            <Link href="/terms" className={styles.link}>
                                Terms of Service
                            </Link>{' '}
                            and{' '}
                            <Link href="/privacy" className={styles.link}>
                                Privacy Policy
                            </Link>
                        </span>
                    </label>

                    <Button type="submit" fullWidth loading={loading}>
                        Create Account
                    </Button>
                </form>

                <div className={styles.divider}>
                    <span>or continue with</span>
                </div>

                <Button
                    variant="outline"
                    fullWidth
                    onClick={handleGoogleSignup}
                    type="button"
                >
                    <Chrome size={20} />
                    Google
                </Button>

                <p className={styles.footer}>
                    Already have an account?{' '}
                    <Link href="/login" className={styles.link}>
                        Sign in
                    </Link>
                </p>
            </div>
        </div>
    );
}
