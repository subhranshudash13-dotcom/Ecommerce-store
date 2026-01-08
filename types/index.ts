export interface User {
    id: string;
    email: string;
    name: string;
    avatar?: string;
    role: 'customer' | 'admin';
    createdAt: string;
}

export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    originalPrice?: number;
    category: string;
    images: string[];
    rating: number;
    reviewCount: number;
    stock: number;
    featured: boolean;
    tags: string[];
}

export interface Review {
    id: string;
    productId: string;
    userId: string;
    userName: string;
    rating: number;
    comment: string;
    createdAt: string;
}

export interface CartItem {
    productId: string;
    quantity: number;
    product: Product;
}

export interface Address {
    id: string;
    userId: string;
    fullName: string;
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    phone: string;
    isDefault: boolean;
}

export interface PaymentMethod {
    id: string;
    userId: string;
    type: 'card' | 'paypal';
    last4?: string;
    brand?: string;
    expiryMonth?: number;
    expiryYear?: number;
    isDefault: boolean;
}

export interface Order {
    id: string;
    userId: string;
    items: CartItem[];
    total: number;
    subtotal: number;
    discount: number;
    shipping: number;
    status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
    shippingAddress: Address;
    paymentMethod: PaymentMethod;
    trackingNumber?: string;
    createdAt: string;
    updatedAt: string;
}

export interface Category {
    id: string;
    name: string;
    slug: string;
    image: string;
    productCount: number;
}

export interface Coupon {
    code: string;
    discount: number;
    type: 'percentage' | 'fixed';
    minPurchase: number;
    expiresAt: string;
}
