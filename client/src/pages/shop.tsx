import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Dialog, DialogContent, DialogHeader, DialogTitle 
} from "@/components/ui/dialog";
import { 
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue 
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  MessageCircle, Eye, Filter, Search, 
  Package, Star, Truck, Shield
} from "lucide-react";

export default function ShopPage() {
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [buyNowProduct, setBuyNowProduct] = useState<any>(null);
  const [customerForm, setCustomerForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    quantity: 1,
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // WhatsApp function to share product details
  const shareOnWhatsApp = (product: any) => {
    const whatsappNumber = "923369976123"; // Your WhatsApp number
    const specifications = product.specifications;
    const features = Object.entries(specifications || {}).map(([key, value]) => `${key}: ${value}`).join(", ");
    
    const message = `Hi! I'm interested in your product:

*${product.name}*
Category: ${product.category}
Price: ₹${product.price.toLocaleString()}
Weight: ${product.weight}
SKU: ${product.sku}
Specifications: ${features}

${product.description}

Please provide more details and availability.`;

    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  // Function to handle buy now form submission
  const handleBuyNowSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!buyNowProduct) return;
    
    setIsSubmitting(true);
    
    try {
      const specifications = buyNowProduct.specifications;
      const features = Object.entries(specifications || {}).map(([key, value]) => `${key}: ${value}`).join(", ");
      
      // Create order data for orders API
      const orderData = {
        customerName: customerForm.name,
        customerEmail: customerForm.email,
        customerPhone: customerForm.phone,
        shippingAddress: {
          street: customerForm.address,
          city: "Kashmir",
          state: "Jammu & Kashmir",
          zipCode: "190001",
          country: "India"
        },
        totalAmount: buyNowProduct.price * customerForm.quantity,
        notes: customerForm.message || "",
        items: [{
          productId: buyNowProduct.id,
          quantity: customerForm.quantity,
          unitPrice: buyNowProduct.price,
          totalPrice: buyNowProduct.price * customerForm.quantity
        }]
      };

      // Also create contact entry for admin notifications
      const contactData = {
        name: customerForm.name,
        email: customerForm.email,
        phone: customerForm.phone,
        subject: `New Order: ${buyNowProduct.name}`,
        message: `NEW ORDER PLACED:

        Customer: ${customerForm.name}
        Product: ${buyNowProduct.name}
        Quantity: ${customerForm.quantity}
        Total: ₹${(buyNowProduct.price * customerForm.quantity).toLocaleString()}
        Address: ${customerForm.address}

        ${customerForm.message || "No additional message"}`
      };

      // Submit order to orders API
      const orderResponse = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData)
      });

      // Submit contact for admin notification
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contactData)
      });

      // Create real-time notification for admin portal
      const notificationData = {
        title: "New Order Received",
        message: `Order from ${customerForm.name} for ${buyNowProduct.name} - ₹${(buyNowProduct.price * customerForm.quantity).toLocaleString()}`,
        type: "info",
        isRead: false
      };

      const notificationResponse = await fetch('/api/notifications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(notificationData)
      });
      console.log('all responses')
      console.log(notificationResponse);
      console.log(response);
      console.log(orderResponse);
      if (response.ok || orderResponse.ok || notificationResponse.ok) {
        // Reset form and close modal
        setCustomerForm({
          name: "",
          email: "",
          phone: "",
          address: "",
          quantity: 1,
          message: ""
        });
        setBuyNowProduct(null);
        
        // Show success message
        alert('Order submitted successfully! You will be contacted soon for confirmation.');
      } else {
        throw new Error('Failed to submit order');
      }
    } catch (error) {
      console.error('Failed to submit order:', error);
      console.log(error);
      alert('Failed to submit order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    // Advanced SEO for Shop Page
    document.title = "Buy Premium Trout Feed Online - Early, Small & Stock Stage Feeds | JK Trout Feed Kashmir";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Buy premium trout feed online from Kashmir\'s leading manufacturer. Early Stage (₹2,500), Small Stage (₹2,750), Stock Stage (₹3,000) feeds with proven results. Fast delivery across India.');
    }
    
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', 'Buy Premium Trout Feed Online - Early, Small & Stock Stage Feeds | JK Trout Feed');
    }
    
    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) {
      ogDescription.setAttribute('content', 'Shop premium trout feed online with fast delivery. Specialized nutrition for every stage of trout development from Kashmir\'s trusted manufacturer.');
    }
    
    // Shop Page Structured Data
    const shopStructuredData = {
      "@context": "https://schema.org",
      "@type": "Store",
      "name": "JK Trout Feed Online Shop",
      "description": "Online store for premium trout feed products with delivery across India",
      "url": "https://jktroutfeed.com/shop",
      "currenciesAccepted": "INR",
      "paymentAccepted": ["Cash", "Credit Card", "Bank Transfer"],
      "priceRange": "₹₹",
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Trout Feed Products",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Product",
              "name": "Premium Early Stage Trout Feed",
              "category": "Aquaculture Feed"
            },
            "price": "2500",
            "priceCurrency": "INR"
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Product",
              "name": "Advanced Small Stage Trout Feed",
              "category": "Aquaculture Feed"
            },
            "price": "2750",
            "priceCurrency": "INR"
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Product",
              "name": "Professional Stock Stage Trout Feed",
              "category": "Aquaculture Feed"
            },
            "price": "3000",
            "priceCurrency": "INR"
          }
        ]
      },
      "breadcrumb": {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://jktroutfeed.com/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Shop",
            "item": "https://jktroutfeed.com/shop"
          }
        ]
      }
    };
    
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(shopStructuredData);
    document.head.appendChild(script);
    
    return () => {
      const scripts = document.querySelectorAll('script[type="application/ld+json"]');
      scripts.forEach(script => {
        if (script.textContent?.includes('"@type":"Store"')) {
          script.remove();
        }
      });
    };
  }, []);

  const { data: products, isLoading } = useQuery({
    queryKey: ['/api/products'],
    queryFn: () => fetch('/api/products').then(res => res.json())
  });

  const filteredProducts = products?.filter((product: any) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === "all" || product.category === filterCategory;
    return matchesSearch && matchesCategory;
  }) || [];

  const categories = Array.from(new Set(products?.map((p: any) => p.category) || [])) as string[];

  const getStockStatus = (stock: number) => {
    if (stock === 0) return { label: "Out of Stock", color: "bg-red-100 text-red-800" };
    if (stock < 10) return { label: "Low Stock", color: "bg-yellow-100 text-yellow-800" };
    return { label: "In Stock", color: "bg-green-100 text-green-800" };
  };

  return (
    <div className="min-h-screen bg-gray-50 page-enter">
      <Navbar />
      
      {/* Header */}
      <section className="bg-gradient-to-r from-primary to-secondary text-white py-16 fade-in">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 scale-in">Premium Trout Feed Shop</h1>
            <p className="text-xl text-blue-200 max-w-3xl mx-auto">
              Discover our complete range of high-quality trout feed products with detailed specifications and competitive pricing
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-8 reveal-up">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral w-4 h-4 float-gentle" />
            <Input
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 hover-glow click-ripple smooth-transition"
            />
          </div>
          <Select value={filterCategory} onValueChange={setFilterCategory}>
            <SelectTrigger className="w-full md:w-48 hover-glow click-ripple smooth-transition">
              <Filter className="w-4 h-4 mr-2 float-gentle" />
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((category: string) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Products Grid */}
        {isLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-neutral">Loading products...</p>
          </div>
        ) : filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product: any, index: number) => {
              const stockStatus = getStockStatus(product.stockQuantity);
              return (
                <Card key={product.id} className="group hover:shadow-xl transition-all duration-300 card-hover stagger-animation" style={{animationDelay: `${index * 0.1}s`}}>
                  <CardHeader className="p-0 relative">
                    <div className="w-full h-48 bg-gradient-to-br from-blue-100 to-teal-100 flex items-center justify-center rounded-t-lg">
                      <Package className="w-16 h-16 text-primary opacity-50" />
                    </div>
                    <Badge 
                      className={`absolute top-3 right-3 ${stockStatus.color}`}
                    >
                      {stockStatus.label}
                    </Badge>
                  </CardHeader>
                  
                  <CardContent className="p-6 space-y-4">
                    <div>
                      <Badge variant="secondary" className="mb-2">
                        {product.category}
                      </Badge>
                      <CardTitle className="text-xl font-bold group-hover:text-primary transition-colors">
                        {product.name}
                      </CardTitle>
                      <p className="text-neutral mt-2 line-clamp-2">
                        {product.description}
                      </p>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-neutral">Weight:</span>
                        <span className="font-medium">{product.weight}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-neutral">SKU:</span>
                        <span className="font-medium">{product.sku}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-neutral">Stock:</span>
                        <span className="font-medium">{product.stockQuantity} units</span>
                      </div>
                    </div>

                    <div className="border-t pt-4">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <span className="text-2xl font-bold text-primary">
                            ₹{product.price.toLocaleString()}
                          </span>
                          <div className="flex items-center text-sm text-green-600 mt-1">
                            <Truck className="w-3 h-3 mr-1" />
                            Free delivery available
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Button
                          variant="outline"
                          className="w-full"
                          onClick={() => setSelectedProduct(product)}
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          View Details
                        </Button>
                        <div className="flex gap-2">
                          <Button
                            className="flex-1 bg-green-600 hover:bg-green-700 text-white btn-bounce click-ripple hover-glow"
                            onClick={() => shareOnWhatsApp(product)}
                            disabled={product.stockQuantity === 0}
                          >
                            <MessageCircle className="w-4 h-4 mr-2 float-gentle" />
                            WhatsApp
                          </Button>
                          <Button
                            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white btn-bounce click-ripple hover-glow"
                            onClick={() => setBuyNowProduct(product)}
                            disabled={product.stockQuantity === 0}
                          >
                            <Package className="w-4 h-4 mr-2 float-gentle" />
                            Buy Now
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-neutral text-lg">No products found</p>
            <p className="text-sm text-gray-500 mt-2">Try adjusting your search or filter criteria</p>
          </div>
        )}

        {/* Trust Indicators */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 p-8 bg-white rounded-xl shadow-sm">
          <div className="text-center">
            <Shield className="w-12 h-12 text-green-600 mx-auto mb-4" />
            <h3 className="font-semibold text-lg mb-2">Quality Guaranteed</h3>
            <p className="text-neutral text-sm">Premium quality trout feed with nutritional certification</p>
          </div>
          <div className="text-center">
            <Truck className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h3 className="font-semibold text-lg mb-2">Fast Delivery</h3>
            <p className="text-neutral text-sm">Quick delivery across India with proper packaging</p>
          </div>
          <div className="text-center">
            <MessageCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
            <h3 className="font-semibold text-lg mb-2">WhatsApp Support</h3>
            <p className="text-neutral text-sm">Direct communication for orders and support</p>
          </div>
        </div>
      </div>

      {/* Product Details Modal */}
      <Dialog open={!!selectedProduct} onOpenChange={(open) => !open && setSelectedProduct(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Product Details</DialogTitle>
          </DialogHeader>
          
          {selectedProduct && (
            <div className="space-y-6">
              <div className="w-full h-48 bg-gradient-to-br from-blue-100 to-teal-100 flex items-center justify-center rounded-lg">
                <Package className="w-20 h-20 text-primary opacity-50" />
              </div>
              
              <div>
                <Badge variant="secondary" className="mb-2">
                  {selectedProduct.category}
                </Badge>
                <h2 className="text-2xl font-bold">{selectedProduct.name}</h2>
                <p className="text-neutral mt-2">{selectedProduct.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-neutral">Price</label>
                  <p className="text-xl font-bold text-primary">₹{selectedProduct.price.toLocaleString()}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-neutral">Weight</label>
                  <p className="text-lg">{selectedProduct.weight}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-neutral">SKU</label>
                  <p className="text-lg">{selectedProduct.sku}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-neutral">Stock</label>
                  <p className="text-lg">{selectedProduct.stockQuantity} units</p>
                </div>
              </div>

              {selectedProduct.specifications && (
                <div>
                  <label className="text-sm font-medium text-neutral">Specifications</label>
                  <div className="mt-2 grid grid-cols-2 gap-2">
                    {Object.entries(selectedProduct.specifications).map(([key, value]) => (
                      <div key={key} className="bg-gray-50 p-2 rounded">
                        <span className="text-xs text-neutral capitalize">{key}:</span>
                        <span className="ml-2 font-medium">{value as string}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="space-y-2 pt-4 border-t">
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => setSelectedProduct(null)}
                >
                  Close
                </Button>
                <div className="flex gap-2">
                  <Button
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                    onClick={() => {
                      shareOnWhatsApp(selectedProduct);
                      setSelectedProduct(null);
                    }}
                    disabled={selectedProduct.stockQuantity === 0}
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    WhatsApp
                  </Button>
                  <Button
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                    onClick={() => {
                      setBuyNowProduct(selectedProduct);
                      setSelectedProduct(null);
                    }}
                    disabled={selectedProduct.stockQuantity === 0}
                  >
                    <Package className="w-4 h-4 mr-2" />
                    Buy Now
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Buy Now Form Modal */}
      <Dialog open={!!buyNowProduct} onOpenChange={(open) => !open && setBuyNowProduct(null)}>
        <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto modal-content">
          <DialogHeader>
            <DialogTitle className="text-glow">Order: {buyNowProduct?.name}</DialogTitle>
            <p className="text-sm text-neutral fade-in">Fill in your details to place an order</p>
          </DialogHeader>
          
          {buyNowProduct && (
            <form onSubmit={handleBuyNowSubmit} className="space-y-4">
              {/* Product Summary */}
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium">{buyNowProduct.name}</h3>
                  <Badge variant="secondary">{buyNowProduct.category}</Badge>
                </div>
                <p className="text-sm text-neutral mt-1">{buyNowProduct.weight}</p>
                <p className="text-lg font-bold text-primary mt-2">
                  ₹{buyNowProduct.price.toLocaleString()} per unit
                </p>
              </div>

              {/* Customer Details */}
              <div className="space-y-3">
                <div>
                  <Label htmlFor="customer-name">Full Name *</Label>
                  <Input
                    id="customer-name"
                    value={customerForm.name}
                    onChange={(e) => setCustomerForm(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="customer-email">Email Address *</Label>
                  <Input
                    id="customer-email"
                    type="email"
                    value={customerForm.email}
                    onChange={(e) => setCustomerForm(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="Enter your email"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="customer-phone">Phone Number *</Label>
                  <Input
                    id="customer-phone"
                    value={customerForm.phone}
                    onChange={(e) => setCustomerForm(prev => ({ ...prev, phone: e.target.value }))}
                    placeholder="Enter your phone number"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="customer-address">Delivery Address *</Label>
                  <Textarea
                    id="customer-address"
                    value={customerForm.address}
                    onChange={(e) => setCustomerForm(prev => ({ ...prev, address: e.target.value }))}
                    placeholder="Enter complete delivery address"
                    required
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor="quantity">Quantity *</Label>
                  <Input
                    id="quantity"
                    type="number"
                    min="1"
                    value={customerForm.quantity}
                    onChange={(e) => setCustomerForm(prev => ({ ...prev, quantity: parseInt(e.target.value) || 1 }))}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="customer-message">Additional Message (Optional)</Label>
                  <Textarea
                    id="customer-message"
                    value={customerForm.message}
                    onChange={(e) => setCustomerForm(prev => ({ ...prev, message: e.target.value }))}
                    placeholder="Any special requirements or questions?"
                    rows={2}
                  />
                </div>
              </div>

              {/* Order Summary */}
              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="flex justify-between items-center text-sm">
                  <span>Quantity:</span>
                  <span>{customerForm.quantity} units</span>
                </div>
                <div className="flex justify-between items-center text-sm mt-1">
                  <span>Unit Price:</span>
                  <span>₹{buyNowProduct.price.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center font-bold text-lg mt-2 pt-2 border-t">
                  <span>Total Amount:</span>
                  <span className="text-primary">
                    ₹{(buyNowProduct.price * customerForm.quantity).toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex gap-2 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1"
                  onClick={() => setBuyNowProduct(null)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white touch-manipulation"
                  disabled={isSubmitting}
                  style={{ 
                    WebkitTapHighlightColor: 'transparent',
                    WebkitTouchCallout: 'none',
                    WebkitUserSelect: 'none',
                    touchAction: 'manipulation'
                  }}
                  onTouchStart={(e) => e.preventDefault()}
                  onTouchEnd={(e) => {
                    e.preventDefault();
                    if (!isSubmitting) {
                      const form = e.currentTarget.closest('form');
                      if (form) {
                        form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
                      }
                    }
                  }}
                >
                  <Package className="w-4 h-4 mr-2" />
                  {isSubmitting ? 'Submitting...' : 'Submit Order'}
                </Button>
              </div>

              <p className="text-xs text-gray-500 text-center mt-2">
                Your order will be sent to our admin portal. We'll contact you soon to confirm and process.
              </p>
            </form>
          )}
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
}