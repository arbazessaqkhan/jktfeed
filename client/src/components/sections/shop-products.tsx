import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { MessageCircle, Star, Truck, Package } from "lucide-react";

export default function ShopProducts() {
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
  const [showSuccess, setShowSuccess] = useState(false);

  // Function to handle buy now form submission
  const handleBuyNowSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!buyNowProduct) return;
    
    setIsSubmitting(true);
    
    try {
      // Create contact entry for admin notifications
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

      // Create real-time notification for admin portal
      const notificationData = {
        title: "New Order Received",
        message: `Order from ${customerForm.name} for ${buyNowProduct.name} - ₹${(buyNowProduct.price * customerForm.quantity).toLocaleString()}`,
        type: "info",
        isRead: false
      };

      // Submit contact for admin notification
      const contactResponse = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contactData)
      });

      const notificationResponse = await fetch('/api/notifications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(notificationData)
      });

      if (contactResponse.ok && notificationResponse.ok) {
        // Reset form and show success
        setCustomerForm({
          name: "",
          email: "",
          phone: "",
          address: "",
          quantity: 1,
          message: ""
        });
        setShowSuccess(true);
        
        // Hide success message and close modal after 3 seconds
        setTimeout(() => {
          setShowSuccess(false);
          setBuyNowProduct(null);
        }, 3000);
      } else {
        throw new Error('Failed to submit order');
      }
    } catch (error) {
      console.error('Failed to submit order:', error);
      alert('Failed to submit order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // WhatsApp function to share product details
  const shareOnWhatsApp = (product: any) => {
    const whatsappNumber = "923369976123"; // Your WhatsApp number
    const message = `Hi! I'm interested in your product:

*${product.name}*
Category: ${product.category}
Price: ₹${product.price.toLocaleString()}
Features: ${product.features.join(", ")}

${product.description}

Please provide more details and availability.`;

    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const shopProducts = [
    {
      id: 1,
      name: "Premium Trout Starter Feed",
      description: "High-protein feed specially formulated for trout fry and fingerlings",
      price: 2850,
      originalPrice: 3200,
      rating: 4.8,
      reviews: 124,
      image: "/api/placeholder/300/200",
      category: "Starter Feed",
      inStock: true,
      features: ["45% Protein", "0.5mm Pellet", "15 KJ/GM Energy"],
      badge: "Best Seller"
    },
    {
      id: 2,
      name: "Growth Booster Pellets",
      description: "Optimal nutrition for growing trout with enhanced growth formula",
      price: 3200,
      originalPrice: 3600,
      rating: 4.9,
      reviews: 89,
      image: "/api/placeholder/300/200",
      category: "Growth Feed",
      inStock: true,
      features: ["48% Protein", "1.5mm Pellet", "14 KJ/GM Energy"],
      badge: "New"
    },
    {
      id: 3,
      name: "Stock Fish Feed Premium",
      description: "Complete nutrition for mature stock fish with superior quality",
      price: 3800,
      originalPrice: 4200,
      rating: 4.7,
      reviews: 156,
      image: "/api/placeholder/300/200",
      category: "Stock Feed",
      inStock: true,
      features: ["52% Protein", "3.0mm Pellet", "13 KJ/GM Energy"],
      badge: "Premium"
    },
    {
      id: 4,
      name: "Complete Nutrition Mix",
      description: "All-in-one feed solution for all growth stages of trout",
      price: 4500,
      originalPrice: 5000,
      rating: 4.6,
      reviews: 78,
      image: "/api/placeholder/300/200",
      category: "Complete Feed",
      inStock: false,
      features: ["Multi-Stage", "Variable Size", "Balanced Nutrition"],
      badge: "Limited"
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Featured Products
          </h2>
          <p className="text-lg text-neutral max-w-3xl mx-auto">
            Discover our top-rated trout feed products with competitive pricing and guaranteed quality
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {shopProducts.map((product) => (
            <Card key={product.id} className="group hover:shadow-lg transition-all duration-300 border-0 bg-white">
              <CardHeader className="p-0 relative">
                <div className="relative overflow-hidden rounded-t-lg">
                  <div className="w-full h-48 bg-gradient-to-br from-blue-100 to-teal-100 flex items-center justify-center">
                    <div className="text-6xl opacity-20">🐟</div>
                  </div>
                  {product.badge && (
                    <Badge 
                      className={`absolute top-3 left-3 ${
                        product.badge === 'Best Seller' ? 'bg-orange-500' :
                        product.badge === 'New' ? 'bg-green-500' :
                        product.badge === 'Premium' ? 'bg-purple-500' :
                        'bg-red-500'
                      }`}
                    >
                      {product.badge}
                    </Badge>
                  )}
                  {!product.inStock && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                      <span className="text-white font-semibold">Out of Stock</span>
                    </div>
                  )}
                </div>
              </CardHeader>
              
              <CardContent className="p-4 space-y-3">
                <div>
                  <Badge variant="secondary" className="text-xs mb-2">
                    {product.category}
                  </Badge>
                  <CardTitle className="text-lg font-semibold line-clamp-2 group-hover:text-primary transition-colors">
                    {product.name}
                  </CardTitle>
                  <p className="text-sm text-neutral line-clamp-2 mt-1">
                    {product.description}
                  </p>
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <div className="flex items-center">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="ml-1 font-medium">{product.rating}</span>
                  </div>
                  <span className="text-neutral">({product.reviews} reviews)</span>
                </div>

                <div className="space-y-2">
                  <div className="flex flex-wrap gap-1">
                    {product.features.map((feature, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xl font-bold text-primary">
                        ₹{product.price.toLocaleString()}
                      </span>
                      <span className="text-sm text-neutral line-through">
                        ₹{product.originalPrice.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center text-xs text-green-600 mt-1">
                      <Truck className="w-3 h-3 mr-1" />
                      Free delivery
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex gap-2">
                    <Button 
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white" 
                      disabled={!product.inStock}
                      onClick={() => shareOnWhatsApp(product)}
                    >
                      <MessageCircle className="w-4 h-4 mr-2" />
                      WhatsApp
                    </Button>
                    <Button 
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white" 
                      disabled={!product.inStock}
                      onClick={() => setBuyNowProduct(product)}
                    >
                      <Package className="w-4 h-4 mr-2" />
                      Buy Now
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" size="lg" className="px-8">
            View All Products
          </Button>
        </div>
      </div>

      {/* Buy Now Form Modal */}
      <Dialog open={!!buyNowProduct} onOpenChange={(open) => !open && setBuyNowProduct(null)}>
        <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Order: {buyNowProduct?.name}</DialogTitle>
          </DialogHeader>
          
          {buyNowProduct && !showSuccess && (
            <form onSubmit={handleBuyNowSubmit} className="space-y-4">
              {/* Product Summary */}
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-medium">{buyNowProduct.name}</h3>
                <p className="text-sm text-gray-600 mt-1">{buyNowProduct.category}</p>
                <p className="text-lg font-bold text-blue-600 mt-2">
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
                  <span className="text-blue-600">
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
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                  disabled={isSubmitting}
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

          {/* Success Message */}
          {showSuccess && (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Package className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-green-600 mb-2">Order Submitted Successfully!</h3>
              <p className="text-gray-600">
                Thank you for your order. We'll contact you soon to confirm and process your request.
              </p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}