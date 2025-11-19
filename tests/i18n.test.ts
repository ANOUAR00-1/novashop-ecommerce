import { describe, it, expect } from 'vitest';
import { en } from '../locales/en';
import { fr } from '../locales/fr';
import { ar } from '../locales/ar';

/**
 * i18n Translation Tests
 * 
 * These tests ensure:
 * 1. All languages have the same translation keys
 * 2. No missing translations
 * 3. No extra translations
 * 4. Translation values are strings (not objects)
 * 5. Parameter placeholders are consistent
 */

// Helper function to get all keys recursively
function getAllKeys(obj: any, prefix = ''): string[] {
  let keys: string[] = [];
  
  for (const [key, value] of Object.entries(obj)) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    
    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      keys = keys.concat(getAllKeys(value, fullKey));
    } else {
      keys.push(fullKey);
    }
  }
  
  return keys.sort();
}

// Helper to get all leaf values (actual translation strings)
function getAllValues(obj: any, prefix = ''): Record<string, string> {
  let values: Record<string, string> = {};
  
  for (const [key, value] of Object.entries(obj)) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    
    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      Object.assign(values, getAllValues(value, fullKey));
    } else {
      values[fullKey] = value as string;
    }
  }
  
  return values;
}

// Helper to extract parameter placeholders from a string
function getPlaceholders(str: string): string[] {
  const matches = str.match(/\{\{(\w+)\}\}/g);
  return matches ? matches.map(m => m.slice(2, -2)).sort() : [];
}

describe('i18n Translation Tests', () => {
  
  describe('Key Consistency', () => {
    
    it('should have the same number of keys in all languages', () => {
      const enKeys = getAllKeys(en);
      const frKeys = getAllKeys(fr);
      const arKeys = getAllKeys(ar);
      
      expect(enKeys.length).toBe(frKeys.length);
      expect(enKeys.length).toBe(arKeys.length);
      expect(frKeys.length).toBe(arKeys.length);
    });
    
    it('should have identical keys in English and French', () => {
      const enKeys = getAllKeys(en);
      const frKeys = getAllKeys(fr);
      
      expect(enKeys).toEqual(frKeys);
    });
    
    it('should have identical keys in English and Arabic', () => {
      const enKeys = getAllKeys(en);
      const arKeys = getAllKeys(ar);
      
      expect(enKeys).toEqual(arKeys);
    });
    
    it('should have no missing keys in French', () => {
      const enKeys = getAllKeys(en);
      const frKeys = getAllKeys(fr);
      
      const missingInFr = enKeys.filter(key => !frKeys.includes(key));
      
      expect(missingInFr).toEqual([]);
    });
    
    it('should have no missing keys in Arabic', () => {
      const enKeys = getAllKeys(en);
      const arKeys = getAllKeys(ar);
      
      const missingInAr = enKeys.filter(key => !arKeys.includes(key));
      
      expect(missingInAr).toEqual([]);
    });
    
    it('should have no extra keys in French', () => {
      const enKeys = getAllKeys(en);
      const frKeys = getAllKeys(fr);
      
      const extraInFr = frKeys.filter(key => !enKeys.includes(key));
      
      expect(extraInFr).toEqual([]);
    });
    
    it('should have no extra keys in Arabic', () => {
      const enKeys = getAllKeys(en);
      const arKeys = getAllKeys(ar);
      
      const extraInAr = arKeys.filter(key => !enKeys.includes(key));
      
      expect(extraInAr).toEqual([]);
    });
  });
  
  describe('Value Types', () => {
    
    it('should have all English values as strings', () => {
      const values = getAllValues(en);
      
      Object.entries(values).forEach(([key, value]) => {
        expect(typeof value).toBe('string');
      });
    });
    
    it('should have all French values as strings', () => {
      const values = getAllValues(fr);
      
      Object.entries(values).forEach(([key, value]) => {
        expect(typeof value).toBe('string');
      });
    });
    
    it('should have all Arabic values as strings', () => {
      const values = getAllValues(ar);
      
      Object.entries(values).forEach(([key, value]) => {
        expect(typeof value).toBe('string');
      });
    });
    
    it('should have no empty strings in English', () => {
      const values = getAllValues(en);
      
      Object.entries(values).forEach(([key, value]) => {
        expect(value.trim().length).toBeGreaterThan(0);
      });
    });
    
    it('should have no empty strings in French', () => {
      const values = getAllValues(fr);
      
      Object.entries(values).forEach(([key, value]) => {
        expect(value.trim().length).toBeGreaterThan(0);
      });
    });
    
    it('should have no empty strings in Arabic', () => {
      const values = getAllValues(ar);
      
      Object.entries(values).forEach(([key, value]) => {
        expect(value.trim().length).toBeGreaterThan(0);
      });
    });
  });
  
  describe('Parameter Placeholders', () => {
    
    it('should have matching placeholders in English and French', () => {
      const enValues = getAllValues(en);
      const frValues = getAllValues(fr);
      
      Object.keys(enValues).forEach(key => {
        const enPlaceholders = getPlaceholders(enValues[key]);
        const frPlaceholders = getPlaceholders(frValues[key]);
        
        expect(frPlaceholders).toEqual(enPlaceholders);
      });
    });
    
    it('should have matching placeholders in English and Arabic', () => {
      const enValues = getAllValues(en);
      const arValues = getAllValues(ar);
      
      Object.keys(enValues).forEach(key => {
        const enPlaceholders = getPlaceholders(enValues[key]);
        const arPlaceholders = getPlaceholders(arValues[key]);
        
        expect(arPlaceholders).toEqual(enPlaceholders);
      });
    });
  });
  
  describe('Structure Validation', () => {
    
    it('should have common section in all languages', () => {
      expect(en.common).toBeDefined();
      expect(fr.common).toBeDefined();
      expect(ar.common).toBeDefined();
    });
    
    it('should have header section in all languages', () => {
      expect(en.header).toBeDefined();
      expect(fr.header).toBeDefined();
      expect(ar.header).toBeDefined();
    });
    
    it('should have footer section in all languages', () => {
      expect(en.footer).toBeDefined();
      expect(fr.footer).toBeDefined();
      expect(ar.footer).toBeDefined();
    });
    
    it('should have home section in all languages', () => {
      expect(en.home).toBeDefined();
      expect(fr.home).toBeDefined();
      expect(ar.home).toBeDefined();
    });
    
    it('should have product section in all languages', () => {
      expect(en.product).toBeDefined();
      expect(fr.product).toBeDefined();
      expect(ar.product).toBeDefined();
    });
    
    it('should have cart section in all languages', () => {
      expect(en.cart).toBeDefined();
      expect(fr.cart).toBeDefined();
      expect(ar.cart).toBeDefined();
    });
    
    it('should have auth section in all languages', () => {
      expect(en.auth).toBeDefined();
      expect(fr.auth).toBeDefined();
      expect(ar.auth).toBeDefined();
    });
    
    it('should have admin section in all languages', () => {
      expect(en.admin).toBeDefined();
      expect(fr.admin).toBeDefined();
      expect(ar.admin).toBeDefined();
    });
    
    it('should have products section with 70 products in all languages', () => {
      expect(en.products).toBeDefined();
      expect(fr.products).toBeDefined();
      expect(ar.products).toBeDefined();
      
      // Check that we have product1 through product70
      for (let i = 1; i <= 70; i++) {
        const key = `product${i}`;
        expect(en.products[key]).toBeDefined();
        expect(fr.products[key]).toBeDefined();
        expect(ar.products[key]).toBeDefined();
        
        // Each product should have name and description
        expect(en.products[key].name).toBeDefined();
        expect(en.products[key].description).toBeDefined();
        expect(fr.products[key].name).toBeDefined();
        expect(fr.products[key].description).toBeDefined();
        expect(ar.products[key].name).toBeDefined();
        expect(ar.products[key].description).toBeDefined();
      }
    });
  });
  
  describe('Critical Keys', () => {
    
    it('should have header.about in all languages', () => {
      expect(en.header.about).toBe('About');
      expect(fr.header.about).toBe('À propos');
      expect(ar.header.about).toBe('حول');
    });
    
    it('should have common action buttons in all languages', () => {
      expect(en.common.save).toBeDefined();
      expect(en.common.cancel).toBeDefined();
      expect(en.common.delete).toBeDefined();
      expect(en.common.edit).toBeDefined();
      
      expect(fr.common.save).toBeDefined();
      expect(fr.common.cancel).toBeDefined();
      expect(fr.common.delete).toBeDefined();
      expect(fr.common.edit).toBeDefined();
      
      expect(ar.common.save).toBeDefined();
      expect(ar.common.cancel).toBeDefined();
      expect(ar.common.delete).toBeDefined();
      expect(ar.common.edit).toBeDefined();
    });
    
    it('should have cart actions in all languages', () => {
      expect(en.cart.checkout).toBeDefined();
      expect(en.cart.continueShopping).toBeDefined();
      
      expect(fr.cart.checkout).toBeDefined();
      expect(fr.cart.continueShopping).toBeDefined();
      
      expect(ar.cart.checkout).toBeDefined();
      expect(ar.cart.continueShopping).toBeDefined();
    });
    
    it('should have auth fields in all languages', () => {
      expect(en.auth.email).toBeDefined();
      expect(en.auth.password).toBeDefined();
      expect(en.auth.login).toBeDefined();
      expect(en.auth.register).toBeDefined();
      
      expect(fr.auth.email).toBeDefined();
      expect(fr.auth.password).toBeDefined();
      expect(fr.auth.login).toBeDefined();
      expect(fr.auth.register).toBeDefined();
      
      expect(ar.auth.email).toBeDefined();
      expect(ar.auth.password).toBeDefined();
      expect(ar.auth.login).toBeDefined();
      expect(ar.auth.register).toBeDefined();
    });
  });
  
  describe('Statistics', () => {
    
    it('should report total key count', () => {
      const enKeys = getAllKeys(en);
      
      console.log(`\n📊 Translation Statistics:`);
      console.log(`Total keys per language: ${enKeys.length}`);
      console.log(`Languages supported: 3 (en, fr, ar)`);
      console.log(`Total translations: ${enKeys.length * 3}`);
    });
    
    it('should report section breakdown', () => {
      const sections = [
        'common', 'header', 'footer', 'home', 'product', 'cart', 
        'wishlist', 'auth', 'checkout', 'profile', 'orders', 'admin',
        'toast', 'filters', 'sort', 'badges', 'pagination', 'search',
        'privacy', 'terms', 'cookies', 'contact', 'shipping', 'returns',
        'faq', 'unauthorized', 'comparison', 'about', 'tracking', 
        'deals', 'categories', 'settings', 'products'
      ];
      
      console.log(`\n📋 Sections covered: ${sections.length}`);
      
      sections.forEach(section => {
        if (en[section]) {
          const keys = getAllKeys(en[section]);
          console.log(`  - ${section}: ${keys.length} keys`);
        }
      });
    });
  });
});
