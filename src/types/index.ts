export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  image: string;
  images: string[];
  colors: string[];
  sizes: string[];
  featured?: boolean;
  bestseller?: boolean;
  new?: boolean;
}

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  size: string;
  color: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'customer';
  phone: string;
  addresses: Address[];
  orders: Order[];
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: string;
  address: Address;
  payment: Payment;
}

export interface Address {
  id: string;
  type: string;
  isDefault: boolean;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface Payment {
  method: 'credit_card' | 'paypal';
  cardNumber?: string;
  cardHolder?: string;
  expiryDate?: string;
  cvv?: string;
}