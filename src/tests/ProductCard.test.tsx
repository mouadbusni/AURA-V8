import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ProductCard from '../components/product/ProductCard';
import { CartProvider } from '../context/CartContext';
import { WishlistProvider } from '../context/WishlistContext';

const mockProduct = {
  id: '1',
  name: 'Test Product',
  price: 99.99,
  description: 'Test description',
  category: 't-shirts',
  image: 'test-image.jpg',
  images: ['test-image.jpg', 'test-image-2.jpg'],
  colors: ['#000000', '#FFFFFF'],
  sizes: ['S', 'M', 'L'],
};

describe('ProductCard', () => {
  const renderWithProviders = (component: React.ReactNode) => {
    return render(
      <BrowserRouter>
        <CartProvider>
          <WishlistProvider>
            {component}
          </WishlistProvider>
        </CartProvider>
      </BrowserRouter>
    );
  };

  it('renders product information correctly', () => {
    renderWithProviders(<ProductCard product={mockProduct} />);
    
    expect(screen.getByText(mockProduct.name)).toBeInTheDocument();
    expect(screen.getByText(`$${mockProduct.price.toFixed(2)}`)).toBeInTheDocument();
    expect(screen.getByRole('img', { name: mockProduct.name })).toHaveAttribute('src', mockProduct.image);
  });

  it('handles quick add to cart', async () => {
    renderWithProviders(<ProductCard product={mockProduct} />);
    
    const quickAddButton = screen.getByText('Quick Add');
    fireEvent.click(quickAddButton);
    
    expect(await screen.findByText('Added ✓')).toBeInTheDocument();
  });

  it('toggles wishlist state', () => {
    renderWithProviders(<ProductCard product={mockProduct} />);
    
    const wishlistButton = screen.getByLabelText('Add to favorites');
    fireEvent.click(wishlistButton);
    
    expect(screen.getByLabelText('Remove from favorites')).toBeInTheDocument();
  });

  it('shows hover image on mouse enter', async () => {
    renderWithProviders(<ProductCard product={mockProduct} />);
    
    const productLink = screen.getByRole('link');
    fireEvent.mouseEnter(productLink);
    
    const alternateImage = await screen.findByAltText(`${mockProduct.name} alternate view`);
    expect(alternateImage).toBeInTheDocument();
  });
});