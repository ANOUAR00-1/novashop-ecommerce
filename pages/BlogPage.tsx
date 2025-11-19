import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User, ArrowRight, Search } from 'lucide-react';
import BackButton from '../components/BackButton';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  category: string;
  image: string;
  readTime: string;
}

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const blogPosts: BlogPost[] = [
    {
      id: '1',
      title: '10 Tips for Smart Online Shopping',
      excerpt: 'Learn how to make the most of your online shopping experience and save money while getting quality products.',
      content: `Online shopping has revolutionized the way we buy products. Whether you're looking for furniture, accessories, or everyday items, here are 10 proven tips to help you shop smarter:

1. **Compare Prices**: Always check multiple retailers before making a purchase. Use price comparison tools to find the best deals.

2. **Read Reviews**: Customer reviews provide valuable insights into product quality and seller reliability. Look for verified purchases.

3. **Check Return Policies**: Make sure you understand the return policy before buying. A good return policy gives you peace of mind.

4. **Use Coupons and Promo Codes**: Sign up for newsletters to get exclusive discounts and promotional codes.

5. **Shop During Sales**: Plan your purchases around major sales events like Black Friday, Cyber Monday, and seasonal sales.

6. **Check Shipping Costs**: Factor in shipping costs when comparing prices. Some retailers offer free shipping on orders above a certain amount.

7. **Verify Security**: Always shop on secure websites (look for HTTPS in the URL). Protect your personal and financial information.

8. **Create Wishlists**: Use wishlists to track items you want to buy. This helps you monitor price changes and plan purchases.

9. **Buy in Bulk**: For frequently used items, buying in bulk can save you money in the long run.

10. **Track Your Orders**: Always keep track of your orders and delivery dates. Most retailers provide tracking information.

By following these tips, you can become a smarter shopper and get the best value for your money!`,
      author: 'Sarah Johnson',
      date: '2024-11-15',
      category: 'shopping',
      image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800&h=400&fit=crop',
      readTime: '5 min'
    },
    {
      id: '2',
      title: 'The Future of E-Commerce: Trends to Watch',
      excerpt: 'Discover the latest trends shaping the future of online retail and how they will impact your shopping experience.',
      content: `The e-commerce landscape is constantly evolving. Here are the key trends that will shape online shopping in the coming years:

**Artificial Intelligence & Personalization**
AI-powered recommendation engines are becoming smarter, offering personalized shopping experiences tailored to individual preferences and browsing history.

**Augmented Reality (AR)**
Virtual try-ons and AR product previews allow customers to visualize products in their own space before making a purchase decision.

**Sustainable Shopping**
More consumers are demanding eco-friendly products and sustainable packaging. Retailers are responding by offering green alternatives.

**Mobile-First Shopping**
Mobile commerce continues to grow, with optimized apps and mobile websites making shopping on-the-go seamless and convenient.

**Voice Shopping**
Smart speakers and voice assistants are enabling hands-free shopping, making the process even more convenient.

**Subscription Services**
Subscription models are becoming popular, offering customers convenience and often better pricing for regular purchases.

**Same-Day Delivery**
Faster delivery options are becoming standard in urban areas, with same-day and next-day delivery becoming more common.

**Social Commerce**
Shopping directly through social media platforms is gaining traction, blending entertainment with commerce.

These trends are making online shopping more convenient, personalized, and sustainable than ever before!`,
      author: 'Michael Chen',
      date: '2024-11-12',
      category: 'trends',
      image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&h=400&fit=crop',
      readTime: '7 min'
    },
    {
      id: '3',
      title: 'How to Choose the Perfect Furniture for Your Home',
      excerpt: 'Expert guide to selecting furniture that matches your style, space, and budget.',
      content: `Choosing furniture is one of the most important decisions when decorating your home. Here's how to do it right:

**Assess Your Space**
Measure your rooms carefully and consider the layout. Think about traffic flow and how furniture will be arranged.

**Define Your Style**
Identify your design aesthetic - modern, traditional, minimalist, or eclectic. This will guide your furniture choices.

**Quality Over Quantity**
Invest in well-made pieces that will last. Quality furniture is a long-term investment in your home.

**Consider Functionality**
Choose furniture that serves your lifestyle. If you have kids, durability and easy cleaning are important factors.

**Color and Texture**
Select colors and textures that complement your space and create the mood you want. Neutral colors are versatile and timeless.

**Budget Wisely**
Prioritize where to spend more money. Invest in pieces you use daily, like sofas and beds, and save on decorative items.

**Mix and Match**
Don't be afraid to combine different styles and periods. Eclectic combinations often create the most interesting spaces.

**Test Before Buying**
If possible, try furniture in person to ensure comfort and that it fits your space properly.

With these tips, you'll create a beautiful and functional home that reflects your personality!`,
      author: 'Emma Davis',
      date: '2024-11-10',
      category: 'furniture',
      image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&h=400&fit=crop',
      readTime: '6 min'
    },
    {
      id: '4',
      title: 'Accessorizing Like a Pro: Fashion Tips',
      excerpt: 'Learn how to elevate your style with the right accessories and create stunning outfits.',
      content: `Accessories are the finishing touch that can transform any outfit. Here are professional tips for accessorizing like a pro:

**The Rule of Balance**
If you're wearing a statement piece, keep other accessories minimal. If your outfit is simple, you can go bolder with accessories.

**Quality Matters**
Invest in quality accessories that will last. A good belt, watch, or bag can elevate your entire look.

**Color Coordination**
Use accessories to tie your outfit together. Matching your bag to your shoes creates a polished look.

**Layering Jewelry**
Layering necklaces and bracelets can create an interesting, modern look. Mix different lengths and styles.

**The Power of a Good Bag**
A quality bag is both functional and stylish. Choose neutral colors for versatility.

**Belts for Definition**
Belts can define your waist and add visual interest to simple outfits. They're also great for layering.

**Hats and Scarves**
These accessories can completely change the vibe of an outfit and are practical too.

**Shoes Make the Outfit**
The right shoes can elevate any look. Invest in classic styles that work with multiple outfits.

**Don't Overdo It**
Remember, less is often more. Choose 2-3 key accessories rather than wearing everything at once.

With these tips, you'll master the art of accessorizing and create amazing outfits!`,
      author: 'John Smith',
      date: '2024-11-08',
      category: 'fashion',
      image: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=800&h=400&fit=crop',
      readTime: '5 min'
    },
    {
      id: '5',
      title: 'Customer Success Stories: Real Reviews',
      excerpt: 'Read inspiring stories from our customers about how NovaShop has improved their lives.',
      content: `Our customers are at the heart of everything we do. Here are some inspiring stories from real NovaShop customers:

**Sarah\'s Home Transformation**
"I completely redesigned my bedroom using furniture from NovaShop. The quality is amazing, and the prices are unbeatable. The delivery was fast, and the customer service team was incredibly helpful throughout the process. I couldn't be happier with my new space!"

**Mike\'s Business Success**
"As a small business owner, I needed reliable suppliers. NovaShop has been a game-changer for me. Their products are high-quality, and their bulk pricing is fantastic. I recommend them to all my business associates."

**Lisa\'s Fashion Journey**
"I love the variety of accessories available on NovaShop. I've found pieces that perfectly match my style, and the prices are so reasonable. The return policy is hassle-free, which gives me confidence when shopping."

**David\'s Family Satisfaction**
"Shopping for my entire family used to be stressful. With NovaShop, I can find everything in one place at great prices. The free shipping on orders over $50 saves me so much money. We're loyal customers for life!"

**Emma\'s Sustainable Choice**
"I appreciate NovaShop's commitment to sustainable products. I can shop with a clear conscience knowing that my purchases support ethical practices. Quality and values - that's what I love about this company."

These stories inspire us to continue providing the best products and service to our customers. Thank you for being part of the NovaShop family!`,
      author: 'Customer Success Team',
      date: '2024-11-05',
      category: 'stories',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=400&fit=crop',
      readTime: '4 min'
    },
    {
      id: '6',
      title: 'Seasonal Shopping Guide: Winter Edition',
      excerpt: 'Prepare for winter with our comprehensive shopping guide for seasonal essentials.',
      content: `Winter is here! Make sure you're prepared with our seasonal shopping guide:

**Clothing Essentials**
- Warm coats and jackets
- Thermal layers and sweaters
- Winter boots and waterproof shoes
- Scarves, hats, and gloves
- Warm socks and thermal underwear

**Home Comfort**
- Cozy blankets and throws
- Winter bedding sets
- Space heaters and humidifiers
- Fireplace accessories
- Winter décor

**Outdoor Gear**
- Snow boots and ice cleats
- Winter sports equipment
- Sleds and snow toys
- Outdoor lighting for dark evenings

**Health & Wellness**
- Humidifiers to combat dry air
- Vitamin D supplements
- Hand and lip care products
- Heating pads and massage tools

**Holiday Décor**
- Christmas trees and ornaments
- Lights and garland
- Wreaths and centerpieces
- Holiday tableware

**Gift Ideas**
- Luxury candles and diffusers
- Premium bedding sets
- Tech accessories
- Fashion items and accessories

**Car Essentials**
- Winter windshield washer fluid
- Ice scrapers and snow brushes
- Emergency kits
- Winter tires

Start your winter shopping early to get the best selection and take advantage of seasonal sales. Stay warm and comfortable all season long!`,
      author: 'Sarah Johnson',
      date: '2024-11-01',
      category: 'seasonal',
      image: 'https://images.unsplash.com/photo-1544716278-ca5e3af4abd8?w=800&h=400&fit=crop',
      readTime: '6 min'
    }
  ];

  const categories = ['all', 'shopping', 'trends', 'furniture', 'fashion', 'stories', 'seasonal'];

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 py-12">
        <BackButton />

        {/* Hero Section */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
              NovaShop Blog
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Discover tips, trends, and stories from the world of online shopping
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-xl border-0 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-medium transition-all capitalize ${
                  selectedCategory === category
                    ? 'bg-orange-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section>
          {filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
                <article
                  key={post.id}
                  className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
                >
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <div className="flex items-center gap-4 mb-3 text-sm text-gray-500 dark:text-gray-400">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(post.date).toLocaleDateString()}
                      </div>
                      <span>{post.readTime}</span>
                    </div>

                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2">
                      {post.title}
                    </h2>

                    <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                        <User className="w-4 h-4" />
                        {post.author}
                      </div>
                      <Link
                        to={`/blog/${post.id}`}
                        className="text-orange-500 dark:text-orange-400 hover:text-orange-600 dark:hover:text-blue-300 transition-colors"
                      >
                        <ArrowRight className="w-5 h-5" />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600 dark:text-gray-400">
                No articles found. Try adjusting your search or filter.
              </p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
