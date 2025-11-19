export function getProductTranslationKey(productId: string | null | undefined, field: 'name' | 'description'): string {
  // Handle null/undefined productId
  if (!productId) {
    return field === 'name' ? 'products.unnamed' : 'products.nodescription';
  }
  // Map product IDs to translation keys
  return `products.product${productId}.${field}`;
}

// Helper to get product name translation key
export function getProductNameKey(productId: string | null | undefined): string {
  return getProductTranslationKey(productId, 'name');
}

// Helper to get product description translation key
export function getProductDescriptionKey(productId: string): string {
  return getProductTranslationKey(productId, 'description');
}
