import { useParams, Link } from 'react-router-dom';
import SEO from '../components/SEO';
import Header from '../components/Header';
import Footer from '../components/Footer';
// Using direct image URLs instead of imports
import makhanaHeritageBlog from '../assets/blog/makhana-feature.jpg';
import makhanaHealthBlog from '../assets/blog/Makhana-The-Healthy-Indian-Snack.jpg';
import makhanaProcessBlog from '../assets/blog/Roasted-Makhana-Recipe.webp';
import makhanaRecipesBlog from '../assets/blog/recipie.webp';

const BlogPost = () => {
  const { id } = useParams();

  // Sample blog posts data - in a real app, this would come from a backend
  const blogPosts = {
    '1': {
      title: 'Buy Makhana Online: Complete Guide to Fox Nuts Price and Benefits 2025',
      content: `
        Looking to buy makhana online? This comprehensive guide covers everything you need to know about 
        purchasing premium quality fox nuts (makhana) in India. We'll explore prices, health benefits, 
        quality grades, and how to choose the best makhana for your needs.

        What is Makhana (Fox Nuts)?
        Makhana, also known as fox nuts or lotus seeds, is a premium superfood that has been cultivated 
        in Bihar for centuries. These nutrient-rich seeds are known for their numerous health benefits 
        and versatile culinary applications.

        Types of Makhana Available Online:
        1. Premium Grade (Lava): Largest size, perfect roundness, pure white color
        2. Standard Grade: Medium-sized, slightly varied shapes
        3. Economy Grade: Smaller size, suitable for regular consumption
        4. Organic Certified: Chemical-free cultivation, premium quality

        Makhana Price List 2025:
        • Premium Grade: ₹800-1200 per kg
        • Standard Grade: ₹600-900 per kg
        • Economy Grade: ₹400-700 per kg
        • Organic Certified: ₹1000-1500 per kg
        (Prices may vary based on quantity and season)

        Why Choose Bihar Makhana?
        1. Superior Quality: Bihar produces 85% of India's makhana
        2. Traditional Expertise: Centuries-old cultivation methods
        3. Strict Quality Control: Multiple testing stages
        4. Direct from Farmers: Better prices and freshness

        Health Benefits of Makhana:
        • Low in calories, high in protein
        • Rich in antioxidants
        • Gluten-free snacking option
        • Supports weight management
        • Good for diabetes control
        • Heart-healthy nutrients

        How to Store Makhana:
        • Keep in airtight containers
        • Store in cool, dry place
        • Avoid direct sunlight
        • Check for freshness before bulk purchase

        Buying Tips:
        1. Check for size consistency
        2. Verify whiteness and color uniformity
        3. Look for proper packaging
        4. Compare prices across vendors
        5. Read customer reviews
        6. Check delivery options

        Popular Ways to Consume Makhana:
        • Roasted snack with various seasonings
        • Added to trail mixes
        • Used in curries and kheer
        • Ground into flour for special recipes
        • As a healthy midnight snack

        Why Buy Makhana Online?
        • Convenient door delivery
        • Wide variety of choices
        • Better price comparison
        • Quality certifications available
        • Customer reviews and ratings
        • Secure payment options

        Conclusion:
        When buying makhana online, focus on quality, price, and authenticity. Choose trusted sellers 
        who source directly from Bihar's farmers. Compare prices but don't compromise on quality for 
        better health benefits.
      `,
      image: makhanaHeritageBlog,
      date: 'October 19, 2025',
      author: 'Team Makario',
      authorImage: 'https://source.unsplash.com/100x100?person,profile',
      category: 'Buying Guide',
      readTime: '8 min read'
    },
    '2': {
      title: 'Health Benefits of Fox Nuts',
      content: `
        Fox nuts, or makhana, are not just delicious but also packed with incredible health benefits. 
        These little powerhouses of nutrition have been used in traditional medicine for centuries and 
        modern science is now validating their health-promoting properties.

        Rich in protein, carbohydrates, fiber, and minerals, makhana makes for a perfect healthy snack. 
        They are particularly beneficial for people watching their weight as they are low in calories 
        but high in nutrients.

        The antioxidants present in makhana help fight inflammation and protect against various diseases. 
        They are also known to help regulate blood sugar levels and promote better heart health.
      `,
      image: makhanaHealthBlog,
      date: 'October 18, 2025',
      author: 'Team Makario',
      authorImage: 'https://source.unsplash.com/100x100?person,profile',
      category: 'Health',
      readTime: '4 min read'
    },
    '3': {
      title: 'Makhana Price List 2025: Wholesale Fox Nuts Rates in India',
      content: `
        Looking for the latest makhana prices in India? This comprehensive guide covers current 
        market rates, wholesale prices, and factors affecting fox nuts prices in 2025.

        Current Makhana Market Rates (October 2025):

        Premium Grade (Lava):
        • Retail: ₹1000-1200/kg
        • Wholesale (25kg+): ₹800-900/kg
        • Bulk (100kg+): ₹700-800/kg

        Standard Grade:
        • Retail: ₹800-900/kg
        • Wholesale (25kg+): ₹600-700/kg
        • Bulk (100kg+): ₹500-600/kg

        Economy Grade:
        • Retail: ₹600-700/kg
        • Wholesale (25kg+): ₹450-550/kg
        • Bulk (100kg+): ₹400-450/kg

        Organic Certified:
        • Retail: ₹1200-1500/kg
        • Wholesale (25kg+): ₹1000-1200/kg
        • Bulk (100kg+): ₹900-1000/kg

        Factors Affecting Makhana Prices:

        1. Quality Grades:
        • Size consistency
        • Color uniformity
        • Breaking percentage
        • Moisture content
        • Processing quality

        2. Seasonal Variations:
        • Peak harvest (July-September)
        • Off-season rates
        • Storage availability
        • Market demand

        3. Geographic Location:
        • Bihar production zones
        • Transportation costs
        • Local market demands
        • Export requirements

        4. Purchase Volume:
        • Minimum order quantity
        • Bulk discounts
        • Regular supply contracts
        • Payment terms

        Market Trends 2025:
        • Increasing export demand
        • Growing health food market
        • Premium packaging options
        • Organic certification premium
        • Direct farmer connections

        Wholesale Buying Guide:

        1. Documentation Required:
        • GST registration
        • Business license
        • Import-export code (for exports)
        • Food safety license

        2. Quality Verification:
        • Sample testing
        • Lab reports
        • Quality certificates
        • Processing facility inspection

        3. Payment Terms:
        • Advance payment
        • Letter of credit
        • Payment scheduling
        • Banking charges

        4. Shipping & Logistics:
        • Transportation costs
        • Insurance
        • Loading/unloading
        • Warehouse charges

        Best Practices for Bulk Buying:
        1. Compare multiple vendors
        2. Check quality certificates
        3. Verify market rates
        4. Inspect samples thoroughly
        5. Understand terms clearly
        6. Plan storage requirements

        Export Pricing:
        • FOB Prices
        • CIF Rates
        • Documentation costs
        • Custom clearance
        • International shipping

        Tips for Price Negotiation:
        1. Volume commitments
        2. Long-term contracts
        3. Quality specifications
        4. Payment terms
        5. Delivery schedules

        Conclusion:
        Makhana prices vary significantly based on quality, quantity, and market conditions. 
        For best wholesale rates, build direct relationships with Bihar suppliers, verify 
        quality standards, and plan for long-term partnerships.
      `,
      image: makhanaProcessBlog,
      date: 'October 17, 2025',
      author: 'Team Makario',
      authorImage: 'https://source.unsplash.com/100x100?person,profile',
      category: 'Process',
      readTime: '6 min read'
    },
    '4': {
      title: 'Makhana Recipes: 10 Healthy Fox Nuts Snacks for Weight Loss',
      content: `
        Looking for healthy snack recipes for weight loss? Discover 10 delicious and easy makhana 
        recipes that are perfect for your weight loss journey. These fox nuts recipes are nutritious, 
        low-calorie, and incredibly satisfying.

        Why Makhana for Weight Loss?
        • Low calorie: Only 347 calories per 100g
        • High protein: 9.7g per 100g
        • Rich in fiber: Keeps you full longer
        • Zero cholesterol: Heart-healthy option
        • Low glycemic index: Better blood sugar control

        Recipe 1: Spicy Roasted Makhana
        Calories: 120 per serving
        Ingredients:
        • 1 cup makhana
        • 1 tsp olive oil
        • 1/2 tsp red chili powder
        • 1/4 tsp turmeric
        • Salt to taste
        Instructions:
        1. Heat oil in a pan
        2. Add makhana and roast for 5 minutes
        3. Add spices and toss well
        4. Roast for another 2-3 minutes

        Recipe 2: Herb & Garlic Makhana
        Calories: 135 per serving
        Ingredients:
        • 1 cup makhana
        • 1 tsp olive oil
        • 2 cloves minced garlic
        • Mixed herbs
        • Salt and pepper
        Instructions:
        1. Heat oil and add garlic
        2. Add makhana and herbs
        3. Roast until crispy
        4. Season with salt and pepper

        Recipe 3: Sweet Cinnamon Makhana
        Calories: 140 per serving
        Ingredients:
        • 1 cup makhana
        • 1 tsp coconut oil
        • 1/2 tsp cinnamon
        • Stevia to taste
        Instructions:
        1. Roast makhana in coconut oil
        2. Add cinnamon and stevia
        3. Toss well and cool
        4. Store in airtight container

        Recipe 4: Protein-Rich Trail Mix
        Calories: 150 per serving
        Ingredients:
        • 1/2 cup roasted makhana
        • 10 almonds
        • 10 pistachios
        • 1 tbsp pumpkin seeds
        • 1 tbsp sunflower seeds
        Instructions:
        1. Roast all ingredients separately
        2. Mix together
        3. Store in airtight container

        Recipe 5: Low-Cal Makhana Bhel
        Calories: 110 per serving
        Ingredients:
        • 1 cup roasted makhana
        • 1/2 cup diced cucumber
        • 1/2 cup diced tomatoes
        • Green chilies (optional)
        • Lemon juice
        • Chat masala
        Instructions:
        1. Mix all ingredients
        2. Add lemon juice and masala
        3. Serve immediately

        Recipe 6: Makhana Smoothie Bowl
        Calories: 180 per serving
        Ingredients:
        • 1/4 cup crushed makhana
        • 1 banana
        • 1/2 cup yogurt
        • Berries for topping
        • Honey (optional)
        Instructions:
        1. Blend makhana, banana, and yogurt
        2. Top with berries
        3. Add honey if desired

        Recipe 7: Curry Leaf Makhana
        Calories: 125 per serving
        Ingredients:
        • 1 cup makhana
        • 1 tsp oil
        • Curry leaves
        • Mustard seeds
        • Salt to taste
        Instructions:
        1. Temper mustard seeds
        2. Add curry leaves
        3. Add makhana and roast
        4. Season with salt

        Recipe 8: Makhana Chaat
        Calories: 145 per serving
        Ingredients:
        • 1 cup roasted makhana
        • Onions and tomatoes
        • Green chutney
        • Tamarind chutney
        • Chat masala
        Instructions:
        1. Mix all ingredients
        2. Add chutneys
        3. Sprinkle chat masala

        Recipe 9: Chocolate Makhana
        Calories: 160 per serving
        Ingredients:
        • 1 cup makhana
        • 1 tbsp dark cocoa powder
        • Stevia to taste
        • 1 tsp coconut oil
        Instructions:
        1. Roast makhana
        2. Mix cocoa and stevia
        3. Coat makhana in mixture

        Recipe 10: Makhana Energy Balls
        Calories: 170 per serving
        Ingredients:
        • 1 cup crushed makhana
        • 1/2 cup dates
        • 1/4 cup nuts
        • 1 tbsp cocoa
        Instructions:
        1. Blend all ingredients
        2. Form into balls
        3. Refrigerate

        Tips for Perfect Makhana Snacks:
        1. Don't over-roast
        2. Store in airtight containers
        3. Add spices after roasting
        4. Use minimal oil
        5. Portion control is key

        Nutritional Benefits:
        • High protein content
        • Rich in antioxidants
        • Good source of fiber
        • Low glycemic index
        • Supports weight loss

        Storage Tips:
        • Keep in airtight containers
        • Store in cool, dry place
        • Consume within 2-3 weeks
        • Avoid moisture exposure
        • Check for freshness

        Conclusion:
        These makhana recipes prove that weight loss snacks can be both healthy and delicious. 
        Remember to maintain portion control and combine these snacks with a balanced diet and 
        regular exercise for best results.
      `,
      image: makhanaRecipesBlog,
      date: 'October 16, 2025',
      author: 'Team Makario',
      authorImage: 'https://source.unsplash.com/100x100?person,profile',
      category: 'Recipes',
      readTime: '7 min read'
    }
  };
  
  const blogPost = blogPosts[id as string] || {
    title: 'Blog Post Not Found',
    content: 'Sorry, the requested blog post could not be found.',
    image: `https://source.unsplash.com/1200x600?makhana,foxnuts&404`,
    date: 'N/A',
    author: 'Team Makario',
    authorImage: '/team/author-avatar.jpg'
  };

  return (
    <div className="min-h-screen">
      <SEO 
        title={blogPost.title} 
        description={blogPost.excerpt || "Learn about the rich heritage and cultural significance of Bihar Makhana"}
        keywords={`Bihar Makhana, fox nuts, lotus seeds, makhana price, makhana benefits, ${blogPost.category}`}
      />
      
      <Header />
      
      {/* Hero Section */}
      <section 
        className="relative h-[60vh] min-h-[400px] flex items-center justify-center"
        style={{
          backgroundImage: `url(${blogPost.image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70"></div>
        <div className="container mx-auto px-4 relative z-10 text-center text-white">
          <div className="max-w-4xl mx-auto">
            <span className="inline-block px-4 py-2 bg-golden/20 text-golden rounded-full text-sm font-semibold mb-6">
              {blogPost.category}
            </span>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              {blogPost.title}
            </h1>
            <div className="flex items-center justify-center space-x-4 text-white/90">
              <div className="flex items-center">
                <img 
                  src={blogPost.authorImage} 
                  alt={blogPost.author}
                  className="w-10 h-10 rounded-full mr-3"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'https://source.unsplash.com/100x100?person,profile';
                  }}
                />
                <span>{blogPost.author}</span>
              </div>
              <span>•</span>
              <time>{blogPost.date}</time>
              <span>•</span>
              <span>{blogPost.readTime}</span>
            </div>
          </div>
        </div>
      </section>

      <article className="max-w-4xl mx-auto px-4 py-12">
        <header className="mb-8">
          <div className="flex items-center justify-center space-x-4 text-gray-600">
            <div className="flex items-center">
              <img 
                src={blogPost.authorImage} 
                alt={blogPost.author}
                className="w-10 h-10 rounded-full mr-3"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'https://source.unsplash.com/100x100?person,profile';
                }}
              />
              <span>{blogPost.author}</span>
            </div>
            <span>•</span>
            <time>{blogPost.date}</time>
          </div>
        </header>

        <div className="relative h-96 mb-12 rounded-xl overflow-hidden">
          <img
            src={blogPost.image || `https://source.unsplash.com/1200x600?makhana,foxnuts&${id}`}
            alt={blogPost.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = `https://source.unsplash.com/1200x600?makhana,foxnuts&${id}`;
            }}
          />
        </div>

        <div className="prose prose-lg max-w-none">
          {blogPost.content.split('\n\n').map((paragraph, index) => (
            <p key={index} className="mb-6 text-gray-700 leading-relaxed">
              {paragraph.trim()}
            </p>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h2 className="text-2xl font-bold text-heritage mb-4">Share this article</h2>
              <p className="text-sm text-muted-foreground">Help spread the word about Bihar's finest Makhana</p>
            </div>
            <div className="flex space-x-4">
              <button className="p-3 rounded-full bg-[#1877F2] text-white hover:bg-[#1877F2]/90 transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.77 7.46H14.5v-1.9c0-.9.6-1.1 1-1.1h3V.5h-4.33C10.24.5 9.5 3.44 9.5 5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4z"/>
                </svg>
              </button>
              <button className="p-3 rounded-full bg-[#1DA1F2] text-white hover:bg-[#1DA1F2]/90 transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </button>
              <button className="p-3 rounded-full bg-[#25D366] text-white hover:bg-[#25D366]/90 transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 3.006c-4.404-4.176-11.507-4.176-15.911 0-4.405 4.176-4.405 10.938 0 15.113l7.967 7.881 7.961-7.881c4.405-4.175 4.405-10.937-.017-15.113zm-7.967 19.095l-6.504-6.43c-3.591-3.401-3.591-8.917 0-12.318 3.592-3.402 9.416-3.402 13.008 0 3.591 3.401 3.591 8.917 0 12.318l-6.504 6.43z"/>
                </svg>
              </button>
              <button className="p-3 rounded-full bg-[#E60023] text-white hover:bg-[#E60023]/90 transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.217-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/>
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Related Posts */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-heritage mb-8">Related Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {Object.entries(blogPosts)
              .filter(([key]) => key !== id)
              .slice(0, 3)
              .map(([key, post]) => (
                <Link 
                  key={key}
                  to={`/blog/${key}`}
                  className="group hover:shadow-lg transition-all duration-300 rounded-xl overflow-hidden bg-white border border-gray-100"
                >
                  <div className="relative aspect-[4/3]">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="inline-block px-3 py-1 bg-white/90 backdrop-blur-sm text-heritage rounded-full text-xs font-semibold">
                        {post.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-heritage group-hover:text-golden transition-colors duration-300">
                      {post.title}
                    </h3>
                    <div className="mt-2 text-xs text-muted-foreground">
                      {post.date}
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </article>

      <Footer />
    </div>
  );
};

export default BlogPost;