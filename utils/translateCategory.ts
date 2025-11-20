export function getCategoryTranslationKey(category: string | null | undefined): string {
  // Handle null/undefined categories
  if (!category) {
    return 'home.categories.uncategorized';
  }
  
  // Normalize category name (uppercase for comparison)
  const normalizedCategory = category.toUpperCase().trim();
  
  // Map category names to translation keys
  const categoryMap: Record<string, string> = {
    // Original categories
    'ELECTRONICS': 'home.categories.electronics',
    'COMPUTERS': 'home.categories.computers',
    'WEARABLES': 'home.categories.wearables',
    'ACCESSORIES': 'home.categories.accessories',
    'FASHION': 'home.categories.fashion',
    'FURNITURE': 'home.categories.furniture',
    'HOME & KITCHEN': 'home.categories.homeKitchen',
    'SPORTS & OUTDOORS': 'home.categories.sportsOutdoors',
    'BEAUTY & PERSONAL CARE': 'home.categories.beautyPersonalCare',
    'BOOKS & MEDIA': 'home.categories.booksMedia',
    'TOYS & GAMES': 'home.categories.toysGames',
    'OFFICE SUPPLIES': 'home.categories.officeSupplies',
    'AUTOMOTIVE': 'home.categories.automotive',
    'HEALTH & WELLNESS': 'home.categories.healthWellness',
    'CAMERA & PHOTOGRAPHY': 'home.categories.cameraPhotography',
    
    // Additional specific categories from your database
    'BARREL STAND': 'home.categories.barrelStand',
    'BAGS & PURSES': 'home.categories.bagsPurses',
    'BAGS': 'home.categories.bags',
    'BELTS': 'home.categories.belts',
    'BEDSIDE STAND': 'home.categories.bedsideStand',
    'BEDS': 'home.categories.beds',
    'BEAUTY COATS': 'home.categories.beautyCoats',
    'BOW TIES': 'home.categories.bowTies',
    'BOOKS': 'home.categories.books',
    'BOOKCASE': 'home.categories.bookcase',
    'BLACK STAND': 'home.categories.blackStand',
    'COUCH': 'home.categories.couch',
    'CHAIR': 'home.categories.chair',
    'CAPS & HATS': 'home.categories.capsHats',
  };

  return categoryMap[normalizedCategory] || category;
}
