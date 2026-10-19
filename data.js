export const CATEGORIES = ['Books', 'Electronics', 'Home', 'Sports', 'Toys'];
const ADJECTIVES = ['Classic', 'Compact', 'Deluxe', 'Eco', 'Pro', 'Smart', 'Ultra', 'Mini'];

// 600 generated records (deterministic, no randomness).
export const PRODUCTS = Array.from({ length: 600 }, (_, i) => ({
  id: i + 1,
  name: `${ADJECTIVES[i % ADJECTIVES.length]} Item ${i + 1}`,
  category: CATEGORIES[i % CATEGORIES.length],
  price: ((i * 37) % 490) + 10
}));
