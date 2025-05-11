import { Product } from '../types';
import { productImages } from '../config/images';

export const products: Product[] = [
  {
    id: '1',
    name: 'Classic Black Tee',
    price: 49.99,
    description: 'Our signature premium cotton t-shirt in a timeless black design. Features a relaxed fit and durable construction that gets better with every wash.',
    category: 't-shirts',
    image: productImages.tshirt1.main,
    images: productImages.tshirt1.gallery,
    colors: ['#000000', '#FFFFFF', '#808080'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    featured: true,
    bestseller: true
  },
  {
    id: '2',
    name: 'Minimalist Logo Hoodie',
    price: 79.99,
    description: 'Crafted from premium heavyweight cotton, this hoodie offers exceptional warmth and comfort with a subtle embroidered logo on the chest.',
    category: 'hoodies',
    image: productImages.hoodie1.main,
    images: productImages.hoodie1.gallery,
    colors: ['#000000', '#D3D3D3', '#36454F'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    featured: true,
    bestseller: true
  },
  {
    id: '3',
    name: 'Oversized Graphic Tee',
    price: 54.99,
    description: 'Our oversized fit tee featuring original artwork. Made from organic cotton with a silky soft feel and relaxed drape.',
    category: 't-shirts',
    image: productImages.tshirt2.main,
    images: productImages.tshirt2.gallery,
    colors: ['#FFFFFF', '#000000', '#8B4513'],
    sizes: ['S', 'M', 'L', 'XL'],
    new: true,
    bestseller: true
  },
  {
    id: '4',
    name: 'Premium Zip Hoodie',
    price: 89.99,
    description: 'A modern take on the classic zip-up hoodie with premium details. Features a heavyweight fabric blend for ultimate comfort and durability.',
    category: 'hoodies',
    image: productImages.hoodie2.main,
    images: productImages.hoodie2.gallery,
    colors: ['#000000', '#808080', '#F5F5DC'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    bestseller: true
  },
  {
    id: '5',
    name: 'Limited Edition Tee',
    price: 59.99,
    description: 'Our limited edition collection tee featuring exclusive artwork and premium quality construction. Once it is gone, it is gone forever.',
    category: 't-shirts',
    image: productImages.tshirt3.main,
    images: productImages.tshirt3.gallery,
    colors: ['#000000', '#FFFFFF'],
    sizes: ['S', 'M', 'L', 'XL'],
    new: true,
    featured: true,
    bestseller: true
  },
  {
    id: '6',
    name: 'Luxe Pullover Hoodie',
    price: 84.99,
    description: 'Our signature pullover hoodie crafted from premium French terry fabric for exceptional softness and warmth without the weight.',
    category: 'hoodies',
    image: productImages.hoodie3.main,
    images: productImages.hoodie3.gallery,
    colors: ['#36454F', '#000000', '#D3D3D3'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    bestseller: true
  }
];

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter(product => product.category === category);
};

export const getFeaturedProducts = (): Product[] => {
  return products.filter(product => product.featured);
};

export const getBestsellerProducts = (): Product[] => {
  return products.filter(product => product.bestseller);
};

export const getNewProducts = (): Product[] => {
  return products.filter(product => product.new);
};