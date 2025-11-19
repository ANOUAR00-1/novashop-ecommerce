export function getCategoryTranslationKey(category: string | null | undefined): string {
  // Handle null/undefined categories
  if (!category) {
    return 'home.categories.uncategorized';
  }
  
  // Map category names to translation keys
  const categoryMap: Record<string, string> = {
    'Electronics': 'home.categories.electronics',
    'Computers': 'home.categories.computers',
    'Wearables': 'home.categories.wearables',
    'Accessories': 'home.categories.accessories',
    'Fashion': 'home.categories.fashion',
    'Furniture': 'home.categories.furniture',
    'Home & Kitchen': 'home.categories.homeKitchen',
    'Sports & Outdoors': 'home.categories.sportsOutdoors',
    'Beauty & Personal Care': 'home.categories.beautyPersonalCare',
    'Books & Media': 'home.categories.booksMedia',
    'Toys & Games': 'home.categories.toysGames',
    'Office Supplies': 'home.categories.officeSupplies',
    'Automotive': 'home.categories.automotive',
    'Health & Wellness': 'home.categories.healthWellness',
    'Camera & Photography': 'home.categories.cameraPhotography',
  };

  return categoryMap[category] || category;
}
