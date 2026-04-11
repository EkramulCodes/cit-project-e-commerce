import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '../components/Layout/Home';
import { products } from '../constants';
import { Star, Heart, Minus, Plus, ShieldCheck, ChevronUp, ChevronDown, Linkedin, Twitter, Facebook, MessageCircle, Link2 } from 'lucide-react';
import Button from '../ui/Button';
import { useCart } from '../context/CartContext';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(2);
  const [selectedSize, setSelectedSize] = useState('M');
  const { addToCart } = useCart();

  useEffect(() => {
    // For demo purposes, we'll use the first product if not found or just use the data from the image
    const foundProduct = products.find(p => p.id === Number(id)) || products[0];
    if (foundProduct) {
      // Overriding with image data for exact match
      setProduct({
        ...foundProduct,
        name: "Super Skinny Rib Trouser & Joggers for Men By Sowdagar Trouser",
        price: 976.33,
        oldPrice: 1020.99,
        discount: "20%",
        rating: 4.0,
        reviews: 223,
        sold: "4,320",
        sku: "12314124124",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
        features: [
          "Direct Full Array",
          "Quantum Dot Technology",
          "Ambient Mode",
          "One Remote Control"
        ],
        sizes: ['S', 'M', 'L', 'X', 'XL', 'XXL']
      });
    }
    window.scrollTo(0, 0);
  }, [id]);

  if (!product) return null;

  return (
    <Layout>
      <div className="bg-[#F9FAFB] min-h-screen pb-20">
        <div className="max-w-7xl mx-auto px-4 py-4">
          {/* Breadcrumbs */}
          <nav className="flex text-xs text-gray-500 mb-6">
            <Link to="/" className="hover:text-[#00aaff]">Home</Link>
            <span className="mx-2 text-gray-300">&gt;</span>
            <Link to="/category/men" className="hover:text-[#00aaff]">Men's Fashion</Link>
            <span className="mx-2 text-gray-300">&gt;</span>
            <span className="text-gray-800 font-medium">Men's Stand Collar Leather Jacket</span>
          </nav>

          <div className="bg-white rounded-sm p-8 shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              {/* Product Images */}
              <div className="lg:col-span-7">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-1 relative aspect-[4/5] bg-[#F3F4F6] rounded-sm overflow-hidden group">
                    <img 
                      src="https://picsum.photos/seed/fashion1/800/1000" 
                      alt={product.name} 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  
                  {/* Thumbnails with Arrows */}
                  <div className="flex flex-col items-center gap-4">
                    <button className="text-gray-400 hover:text-gray-600 transition-colors">
                      <ChevronUp size={24} />
                    </button>
                    <div className="flex flex-row md:flex-col gap-3">
                      {[1, 2, 3, 4].map((i) => (
                        <div key={i} className={`w-16 h-20 rounded-sm overflow-hidden border-2 cursor-pointer transition-all ${i === 1 ? 'border-[#00aaff]' : 'border-transparent hover:border-gray-200'}`}>
                          <img 
                            src={`https://picsum.photos/seed/fashion${i}/200/250`} 
                            alt="" 
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                      ))}
                    </div>
                    <button className="text-gray-400 hover:text-gray-600 transition-colors">
                      <ChevronDown size={24} />
                    </button>
                  </div>
                </div>

                {/* Share Section (Desktop) */}
                <div className="hidden lg:flex items-center gap-4 mt-8">
                  <span className="text-sm font-medium text-gray-700">Share</span>
                  <div className="flex items-center gap-3">
                    <a href="#" className="text-[#0077B5] hover:opacity-80 transition-opacity"><Linkedin size={18} /></a>
                    <a href="#" className="text-[#1DA1F2] hover:opacity-80 transition-opacity"><Twitter size={18} /></a>
                    <a href="#" className="text-[#1877F2] hover:opacity-80 transition-opacity"><Facebook size={18} /></a>
                    <a href="#" className="text-[#25D366] hover:opacity-80 transition-opacity"><MessageCircle size={18} /></a>
                    <a href="#" className="text-gray-400 hover:text-gray-600 transition-colors"><Link2 size={18} /></a>
                  </div>
                </div>
              </div>

              {/* Share Section (Mobile) */}
              <div className="lg:hidden flex items-center gap-4 mt-6">
                <span className="text-sm font-medium text-gray-700">Share</span>
                <div className="flex items-center gap-3">
                  <a href="#" className="text-[#0077B5] hover:opacity-80 transition-opacity"><Linkedin size={18} /></a>
                  <a href="#" className="text-[#1DA1F2] hover:opacity-80 transition-opacity"><Twitter size={18} /></a>
                  <a href="#" className="text-[#1877F2] hover:opacity-80 transition-opacity"><Facebook size={18} /></a>
                  <a href="#" className="text-[#25D366] hover:opacity-80 transition-opacity"><MessageCircle size={18} /></a>
                  <a href="#" className="text-gray-400 hover:text-gray-600 transition-colors"><Link2 size={18} /></a>
                </div>
              </div>

              {/* Product Info */}
              <div className="lg:col-span-5 space-y-6">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 leading-tight">{product.name}</h1>
                  <div className="flex items-center gap-4 mt-4 flex-wrap">
                    <div className="flex items-center gap-1">
                      <span className="text-sm font-bold text-gray-700">{product.rating.toFixed(1)}</span>
                      <div className="flex text-orange-400">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={14} fill={i < Math.floor(product.rating) ? 'currentColor' : 'none'} className={i < Math.floor(product.rating) ? '' : 'text-gray-300'} />
                        ))}
                      </div>
                      <span className="text-xs text-gray-400">({product.reviews})</span>
                    </div>
                    <div className="h-4 w-[1px] bg-gray-200"></div>
                    <div className="flex items-center gap-1">
                      <ShieldCheck size={16} className="text-green-500" />
                      <span className="text-xs text-gray-600 font-bold">{product.sold} Sold</span>
                    </div>
                    <button className="flex items-center gap-1 text-xs text-gray-500 hover:text-red-500 transition-colors ml-auto">
                      <Heart size={16} />
                      <span>Add to wishlist</span>
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <span className="text-3xl font-bold text-[#00aaff]">${product.price}</span>
                  <span className="text-lg text-gray-400 line-through">${product.oldPrice}</span>
                  <span className="bg-orange-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-sm">
                    {product.discount}
                  </span>
                </div>

                <div className="flex items-center gap-6 text-xs">
                  <p className="text-gray-500">SKU: <span className="text-gray-800">{product.sku}</span></p>
                  <p className="text-gray-500 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-green-500"></span>
                    In Stock
                  </p>
                </div>

                <p className="text-gray-500 text-sm leading-relaxed">
                  {product.description}
                </p>

                <ul className="space-y-2">
                  {product.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-gray-700">
                      <span className="w-1 h-1 rounded-full bg-gray-900"></span>
                      {feature}
                    </li>
                  ))}
                </ul>

                <div className="space-y-3">
                  <p className="text-sm font-bold text-gray-900">Size</p>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
                      <button 
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`min-w-[36px] h-8 flex items-center justify-center text-[10px] font-medium border transition-all rounded-sm
                          ${selectedSize === size 
                            ? 'bg-[#00aaff] border-[#00aaff] text-white shadow-md' 
                            : 'bg-white border-gray-200 text-gray-500 hover:border-[#00aaff]'}`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-4 pt-4">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500">Quantity:</span>
                    <div className="flex items-center border border-gray-200 rounded-sm overflow-hidden h-10">
                      <button 
                        onClick={() => setQuantity(q => Math.max(1, q - 1))}
                        className="px-3 hover:bg-gray-50 text-gray-400 transition-colors"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="w-8 text-center text-sm font-medium">{quantity}</span>
                      <button 
                        onClick={() => setQuantity(q => q + 1)}
                        className="px-3 hover:bg-gray-50 text-gray-400 transition-colors"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>
                  <div className="flex-1 flex gap-3">
                    <Button 
                      variant="primary" 
                      className="flex-1 h-10 text-xs font-bold rounded-sm bg-[#00aaff] hover:bg-[#0088cc]"
                      onClick={() => addToCart(product, quantity)}
                    >
                      Add cart
                    </Button>
                    <button className="flex-1 h-10 text-xs font-bold border border-[#00aaff] text-[#00aaff] hover:bg-[#00aaff] hover:text-white transition-all rounded-sm">
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Product Details Section */}
          <div className="mt-8 bg-white rounded-sm shadow-sm overflow-hidden">
            <div className="bg-[#F9FAFB] border-b border-gray-100 px-8 py-4">
              <h2 className="text-[#00aaff] font-bold text-lg">Product details of LED Monitor With High Quality In The World</h2>
            </div>
            <div className="p-8 space-y-10">
              <div className="space-y-6">
                <h3 className="text-lg font-bold text-gray-900">See the best picture no matter where you sit</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-4">
                  <div className="space-y-4">
                    <div className="flex text-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-gray-900 mt-1.5 mr-2 shrink-0"></span>
                      <p className="text-gray-700"><span className="font-bold">Size :</span> M, L, XL</p>
                    </div>
                    <div className="flex text-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-gray-900 mt-1.5 mr-2 shrink-0"></span>
                      <p className="text-gray-700"><span className="font-bold">Product Type :</span> Jogger</p>
                    </div>
                    <div className="flex text-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-gray-900 mt-1.5 mr-2 shrink-0"></span>
                      <p className="text-gray-700"><span className="font-bold">Main Material :</span> Cotton</p>
                    </div>
                    <div className="flex text-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-gray-900 mt-1.5 mr-2 shrink-0"></span>
                      <p className="text-gray-700"><span className="font-bold">Gender :</span> Male</p>
                    </div>
                    <div className="flex text-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-gray-900 mt-1.5 mr-2 shrink-0"></span>
                      <p className="text-gray-700"><span className="font-bold">Waist :</span> Mid-rise</p>
                    </div>
                    <div className="flex text-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-gray-900 mt-1.5 mr-2 shrink-0"></span>
                      <p className="text-gray-700"><span className="font-bold">Zip :</span> Fly</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex text-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-gray-900 mt-1.5 mr-2 shrink-0"></span>
                      <p className="text-gray-700"><span className="font-bold">Zipper :</span> Yes</p>
                    </div>
                    <div className="flex text-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-gray-900 mt-1.5 mr-2 shrink-0"></span>
                      <p className="text-gray-700"><span className="font-bold">Pocket :</span> Two front and One Back Pockets.</p>
                    </div>
                    <div className="flex text-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-gray-900 mt-1.5 mr-2 shrink-0"></span>
                      <p className="text-gray-700"><span className="font-bold">100% Authentic Product</span></p>
                    </div>
                    <div className="flex text-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-gray-900 mt-1.5 mr-2 shrink-0"></span>
                      <p className="text-gray-700">Product color may slightly vary due to our photography and Sometimes it's vary on our devices</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6 pt-8 border-t border-gray-100">
                <h3 className="text-lg font-bold text-gray-900">Powerful intelligence for perfection</h3>
                <div className="space-y-4 text-sm text-gray-600 leading-relaxed">
                  <p>
                    Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequat, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?
                  </p>
                  <p>
                    At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Customer Reviews Section */}
          <div className="mt-8 bg-white rounded-sm shadow-sm p-8">
            <div className="flex flex-col md:flex-row gap-12 items-start">
              <div className="w-full md:w-64 space-y-4">
                <h3 className="text-lg font-bold text-gray-900">Customer reviews</h3>
                <div className="flex items-center gap-2">
                  <div className="flex text-orange-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={16} fill={i < 4 ? 'currentColor' : 'none'} className={i < 4 ? '' : 'text-gray-300'} />
                    ))}
                  </div>
                  <span className="text-sm text-gray-500">4.6 out of 5</span>
                </div>
                
                <div className="space-y-2">
                  {[
                    { stars: 5, percent: 79 },
                    { stars: 4, percent: 12 },
                    { stars: 3, percent: 4 },
                    { stars: 2, percent: 2 },
                    { stars: 1, percent: 4 }
                  ].map((rating) => (
                    <div key={rating.stars} className="flex items-center gap-3 text-xs">
                      <span className="w-12 text-gray-500">{rating.stars} Stars</span>
                      <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-orange-400" style={{ width: `${rating.percent}%` }}></div>
                      </div>
                      <span className="w-8 text-gray-500 text-right">{rating.percent}%</span>
                    </div>
                  ))}
                </div>

                <button className="w-full py-2 bg-[#00aaff] text-white text-xs font-bold rounded-sm mt-4 hover:bg-[#0088cc] transition-colors">
                  Write a Review
                </button>
              </div>

              <div className="flex-1 space-y-8">
                <h3 className="text-lg font-bold text-gray-900">Reviews (4)</h3>
                <div className="space-y-8">
                  {[
                    { name: "Vanille", rating: 5, date: "1 Month Ago", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
                    { name: "Maduin", rating: 5, date: "1 Month Ago", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
                    { name: "Samantha", rating: 5, date: "1 Month Ago", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
                    { name: "Roveria", rating: 5, date: "1 Month Ago", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." }
                  ].map((review, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden shrink-0">
                        <img src={`https://i.pravatar.cc/150?u=${review.name}`} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-sm text-gray-900">{review.name}</h4>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-gray-700">{review.rating.toFixed(1)}</span>
                          <div className="flex text-orange-400">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} size={12} fill="currentColor" />
                            ))}
                          </div>
                          <span className="text-[10px] text-gray-400 ml-2">{review.date}</span>
                        </div>
                        <p className="text-sm text-gray-500 leading-relaxed">{review.text}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Add Your Review Form */}
                <div className="pt-12 border-t border-gray-100 space-y-6">
                  <h3 className="text-lg font-bold text-gray-900">Add Your Review</h3>
                  <p className="text-sm text-gray-500">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.</p>
                  
                  <form className="space-y-4 max-w-2xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-700">Name *</label>
                        <input type="text" className="w-full border border-gray-200 rounded-sm p-3 text-sm focus:outline-none focus:border-[#00aaff]" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-700">Email *</label>
                        <input type="email" className="w-full border border-gray-200 rounded-sm p-3 text-sm focus:outline-none focus:border-[#00aaff]" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-700">Review *</label>
                      <textarea rows={4} className="w-full border border-gray-200 rounded-sm p-3 text-sm focus:outline-none focus:border-[#00aaff]"></textarea>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-xs font-bold text-gray-700">Rating</span>
                      <div className="flex text-gray-300">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={18} className="cursor-pointer hover:text-orange-400 transition-colors" />
                        ))}
                      </div>
                    </div>
                    <button type="submit" className="px-10 py-3 bg-[#00aaff] text-white text-xs font-bold rounded-sm hover:bg-[#0088cc] transition-colors">
                      Submit
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetail;
