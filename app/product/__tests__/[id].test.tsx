import { useProductDetailsStore } from '@/src/modules/products/store/useProductDetailsStore';
import { useWishlistStore } from '@/src/modules/products/store/useWishlistStore';
import { fireEvent, render } from '@testing-library/react-native';
import { router } from 'expo-router';
import ProductDetailsScreen from '../[id]';

// Mock dos módulos externos
jest.mock('expo-router', () => ({
  Stack: {
    Screen: ({ options }: { options: any }) => {
      // Força a renderização dos botões do header
      if (options?.headerLeft) {
        const HeaderLeft = options.headerLeft;
        return <HeaderLeft />;
      }
      if (options?.headerRight) {
        const HeaderRight = options.headerRight;
        return <HeaderRight />;
      }
      return null;
    },
  },
  router: {
    replace: jest.fn(),
  },
  useLocalSearchParams: () => ({ id: '1' }),
}));

jest.mock('react-native-toast-message', () => ({
  show: jest.fn(),
}));

jest.mock('@/src/modules/products/store/useProductDetailsStore', () => ({
  useProductDetailsStore: jest.fn(),
}));

jest.mock('@/src/modules/products/store/useWishlistStore');

// Mock do produto para testes
const mockProduct = {
  id: 1,
  title: 'Test Product',
  description: 'Test Description',
  price: 99.99,
  brand: 'Test Brand',
  category: 'electronics',
  thumbnail: 'test-thumbnail.jpg',
  images: ['image1.jpg', 'image2.jpg'],
  rating: 4.5,
  stock: 10,
};

describe('ProductDetailsScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    // Setup do estado inicial
    (useProductDetailsStore as unknown as jest.Mock).mockReturnValue({
      product: mockProduct,
      loading: false,
      error: null,
      fetchProductDetails: jest.fn(),
      reset: jest.fn(),
    });

    // Setup do wishlist store
    (useWishlistStore as unknown as jest.Mock).mockReturnValue({
      addToWishlist: jest.fn(),
      removeFromWishlist: jest.fn(),
      isInWishlist: jest.fn().mockReturnValue(false),
    });
  });

  it('renders loading state correctly', () => {
    (useProductDetailsStore as unknown as jest.Mock).mockReturnValue({
      loading: true,
      error: null,
      fetchProductDetails: jest.fn(),
      reset: jest.fn(),
    });

    const { getByTestId } = render(<ProductDetailsScreen />);
    expect(getByTestId('loading-indicator')).toBeTruthy();
  });

  it('renders error state correctly', () => {
    (useProductDetailsStore as unknown as jest.Mock).mockReturnValue({
      loading: false,
      error: 'Error message',
      product: null,
      fetchProductDetails: jest.fn(),
      reset: jest.fn(),
    });

    const { getByText, getByTestId } = render(<ProductDetailsScreen />);
    expect(getByText('Error loading product details 😔')).toBeTruthy();
    expect(getByTestId('back-to-home-button')).toBeTruthy();
  });

  it('renders product details correctly', () => {
    const { getByText } = render(<ProductDetailsScreen />);

    expect(getByText(mockProduct.title)).toBeTruthy();
    expect(getByText(mockProduct.brand)).toBeTruthy();
    expect(getByText(`$${mockProduct.price}`)).toBeTruthy();
    expect(getByText(mockProduct.description)).toBeTruthy();
  });

  it('navigates back to home when back button is pressed', async () => {
    const { getByTestId } = render(<ProductDetailsScreen />);

    // Usa getByTestId já que o botão deve estar renderizado imediatamente
    const backButton = getByTestId('back-button');
    fireEvent.press(backButton);

    expect(router.replace).toHaveBeenCalledWith('/(tabs)');
  });

  it('fetches product details on mount', () => {
    const fetchProductDetails = jest.fn();
    (useProductDetailsStore as unknown as jest.Mock).mockReturnValue({
      loading: false,
      error: null,
      product: mockProduct,
      fetchProductDetails,
      reset: jest.fn(),
    });

    render(<ProductDetailsScreen />);
    expect(fetchProductDetails).toHaveBeenCalledWith(1);
  });

  it('resets product details on unmount', () => {
    const reset = jest.fn();
    (useProductDetailsStore as unknown as jest.Mock).mockReturnValue({
      loading: false,
      error: null,
      product: mockProduct,
      fetchProductDetails: jest.fn(),
      reset,
    });

    const { unmount } = render(<ProductDetailsScreen />);
    unmount();
    expect(reset).toHaveBeenCalled();
  });
});
