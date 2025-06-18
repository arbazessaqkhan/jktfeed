import { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { 
  Dialog, DialogContent, DialogHeader, DialogTitle 
} from "@/components/ui/dialog";
import { 
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue 
} from "@/components/ui/select";
import { 
  MessageCircle, Eye, Filter, Search, 
  Package, Star, Truck, Shield
} from "lucide-react";

export default function ShopPage() {
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");

  const { toast } = useToast();

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

  useEffect(() => {
    document.title = "Shop Premium Trout Feed - JK Trout Feed";
  }, []);

  const { data: products, isLoading } = useQuery({
    queryKey: ['/api/products'],
    queryFn: () => fetch('/api/products').then(res => res.json())
  });

  const updateCartMutation = useMutation({
    mutationFn: ({ id, quantity }: { id: number, quantity: number }) => 
      apiRequest("PUT", `/api/cart/${id}`, { quantity }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/cart', sessionId] });
    }
  });

  const removeFromCartMutation = useMutation({
    mutationFn: (id: number) => apiRequest("DELETE", `/api/cart/${id}`),
    onSuccess: () => {
      toast({
        title: "Removed from Cart",
        description: "Product has been removed from your cart.",
      });
      queryClient.invalidateQueries({ queryKey: ['/api/cart', sessionId] });
    }
  });

  const handleAddToCart = (product: any, quantity: number = 1) => {
    addToCartMutation.mutate({
      sessionId,
      productId: product.id,
      quantity
    });
  };

  const filteredProducts = products?.filter((product: any) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === "all" || product.category === filterCategory;
    const isActive = product.isActive;
    return matchesSearch && matchesCategory && isActive;
  }) || [];

  const getCategoryInfo = (category: string) => {
    const categoryMap = {
      early: { 
        name: "Early Stage", 
        description: "For fry and young fingerlings (0.3-25g)",
        color: "bg-blue-100 text-blue-800"
      },
      small: { 
        name: "Small Stage", 
        description: "For growing fingerlings (25-200g)",
        color: "bg-green-100 text-green-800"
      },
      stock: { 
        name: "Stock Stage", 
        description: "For mature stock fish (200g+)",
        color: "bg-purple-100 text-purple-800"
      }
    };
    return categoryMap[category as keyof typeof categoryMap] || { name: category, description: "", color: "bg-gray-100 text-gray-800" };
  };

  const cartTotal = cart?.reduce((sum: number, item: any) => {
    const product = products?.find((p: any) => p.id === item.productId);
    return sum + (product ? parseFloat(product.price) * item.quantity : 0);
  }, 0) || 0;

  const cartItemCount = cart?.reduce((sum: number, item: any) => sum + item.quantity, 0) || 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Header */}
      <section className="bg-gradient-to-r from-primary to-secondary text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Premium Trout Feed Store</h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Professional-grade nutrition for every stage of trout development
            </p>
            <div className="flex justify-center items-center space-x-8 text-blue-200">
              <div className="flex items-center">
                <Truck className="w-5 h-5 mr-2" />
                <span>Free Delivery on Orders Above ₹5,000</span>
              </div>
              <div className="flex items-center">
                <Shield className="w-5 h-5 mr-2" />
                <span>Quality Guaranteed</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Shopping Cart Button */}
      <div className="fixed top-20 right-4 z-40">
        <Button 
          onClick={() => setIsCartOpen(true)}
          className="bg-primary text-white shadow-lg hover:bg-secondary relative"
          size="lg"
        >
          <ShoppingCart className="w-5 h-5 mr-2" />
          Cart ({cartItemCount})
          {cartItemCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">
              {cartItemCount}
            </span>
          )}
        </Button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search and Filters */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral w-4 h-4" />
                  <Input
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="w-full md:w-48">
                <Select value={filterCategory} onValueChange={setFilterCategory}>
                  <SelectTrigger>
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="Filter by stage" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Stages</SelectItem>
                    <SelectItem value="early">Early Stage</SelectItem>
                    <SelectItem value="small">Small Stage</SelectItem>
                    <SelectItem value="stock">Stock Stage</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Product Grid */}
        {isLoading ? (
          <div className="text-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-neutral">Loading products...</p>
          </div>
        ) : filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product: any) => {
              const categoryInfo = getCategoryInfo(product.category);
              const isInStock = product.stockQuantity > 0;
              
              return (
                <Card key={product.id} className="hover:shadow-lg transition-shadow overflow-hidden">
                  <div className="relative">
                    <div className="h-48 bg-gray-200 flex items-center justify-center">
                      {product.images?.length > 0 ? (
                        <img 
                          src={product.images[0]} 
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <Package className="w-16 h-16 text-gray-400" />
                      )}
                    </div>
                    <Badge className={`absolute top-2 left-2 ${categoryInfo.color}`}>
                      {categoryInfo.name}
                    </Badge>
                    {!isInStock && (
                      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <Badge variant="destructive">Out of Stock</Badge>
                      </div>
                    )}
                  </div>
                  
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-2">{product.name}</h3>
                    <p className="text-neutral text-sm mb-3 line-clamp-2">{product.description}</p>
                    
                    <div className="flex items-center mb-3">
                      <div className="flex text-yellow-400 mr-2">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-current" />
                        ))}
                      </div>
                      <span className="text-sm text-neutral">(4.8) • {product.weight}</span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2 text-xs text-neutral mb-4">
                      <div>Protein: {product.specifications.protein}</div>
                      <div>Size: {product.specifications.pelletSize}</div>
                      <div>Energy: {product.specifications.energy}</div>
                      <div>Stock: {product.stockQuantity}</div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-2xl font-bold text-primary">₹{product.price}</span>
                        <span className="text-sm text-neutral ml-1">/{product.weight}</span>
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedProduct(product)}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => handleAddToCart(product)}
                          disabled={!isInStock || addToCartMutation.isPending}
                          className="bg-primary text-white hover:bg-secondary"
                        >
                          <Plus className="w-4 h-4 mr-1" />
                          Add to Cart
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16">
            <Package className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <h3 className="text-xl font-semibold mb-2">No products found</h3>
            <p className="text-neutral">Try adjusting your search or filter criteria</p>
          </div>
        )}

        {/* Product Detail Modal */}
        <Dialog open={!!selectedProduct} onOpenChange={() => setSelectedProduct(null)}>
          <DialogContent className="max-w-4xl">
            {selectedProduct && (
              <>
                <DialogHeader>
                  <DialogTitle className="text-2xl">{selectedProduct.name}</DialogTitle>
                </DialogHeader>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <div className="h-64 bg-gray-200 rounded-lg flex items-center justify-center mb-4">
                      {selectedProduct.images?.length > 0 ? (
                        <img 
                          src={selectedProduct.images[0]} 
                          alt={selectedProduct.name}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      ) : (
                        <Package className="w-16 h-16 text-gray-400" />
                      )}
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      {selectedProduct.images?.slice(1, 4).map((image: string, index: number) => (
                        <img 
                          key={index}
                          src={image} 
                          alt={`${selectedProduct.name} ${index + 2}`}
                          className="w-full h-16 object-cover rounded"
                        />
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <Badge className={getCategoryInfo(selectedProduct.category).color}>
                      {getCategoryInfo(selectedProduct.category).name}
                    </Badge>
                    
                    <div className="flex items-center my-4">
                      <div className="flex text-yellow-400 mr-2">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 fill-current" />
                        ))}
                      </div>
                      <span className="text-neutral">(4.8) • 127 reviews</span>
                    </div>
                    
                    <p className="text-neutral mb-6">{selectedProduct.description}</p>
                    
                    <div className="bg-gray-50 p-4 rounded-lg mb-6">
                      <h4 className="font-semibold mb-3">Nutritional Specifications</h4>
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div>Protein: <span className="font-semibold">{selectedProduct.specifications.protein}</span></div>
                        <div>Fat: <span className="font-semibold">{selectedProduct.specifications.fat}</span></div>
                        <div>Fiber: <span className="font-semibold">{selectedProduct.specifications.fiber}</span></div>
                        <div>Moisture: <span className="font-semibold">{selectedProduct.specifications.moisture}</span></div>
                        <div>Energy: <span className="font-semibold">{selectedProduct.specifications.energy}</span></div>
                        <div>Pellet Size: <span className="font-semibold">{selectedProduct.specifications.pelletSize}</span></div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <span className="text-3xl font-bold text-primary">₹{selectedProduct.price}</span>
                        <span className="text-neutral ml-2">per {selectedProduct.weight}</span>
                      </div>
                      <div className="text-sm text-neutral">
                        Stock: {selectedProduct.stockQuantity} units
                      </div>
                    </div>
                    
                    <Button
                      onClick={() => {
                        handleAddToCart(selectedProduct);
                        setSelectedProduct(null);
                      }}
                      disabled={selectedProduct.stockQuantity === 0}
                      className="w-full bg-primary text-white hover:bg-secondary"
                      size="lg"
                    >
                      <ShoppingCart className="w-5 h-5 mr-2" />
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>

        {/* Shopping Cart Modal */}
        <Dialog open={isCartOpen} onOpenChange={setIsCartOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center">
                <ShoppingCart className="w-5 h-5 mr-2" />
                Shopping Cart ({cartItemCount} items)
              </DialogTitle>
            </DialogHeader>
            
            <div className="max-h-96 overflow-y-auto">
              {cart && cart.length > 0 ? (
                <div className="space-y-4">
                  {cart.map((item: any) => {
                    const product = products?.find((p: any) => p.id === item.productId);
                    if (!product) return null;
                    
                    return (
                      <div key={item.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                        <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
                          {product.images?.length > 0 ? (
                            <img 
                              src={product.images[0]} 
                              alt={product.name}
                              className="w-full h-full object-cover rounded-lg"
                            />
                          ) : (
                            <Package className="w-8 h-8 text-gray-400" />
                          )}
                        </div>
                        
                        <div className="flex-1">
                          <h4 className="font-semibold">{product.name}</h4>
                          <p className="text-sm text-neutral">{product.weight}</p>
                          <p className="text-primary font-semibold">₹{product.price}</p>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateCartMutation.mutate({ 
                              id: item.id, 
                              quantity: Math.max(1, item.quantity - 1) 
                            })}
                          >
                            <Minus className="w-4 h-4" />
                          </Button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateCartMutation.mutate({ 
                              id: item.id, 
                              quantity: item.quantity + 1 
                            })}
                          >
                            <Plus className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => removeFromCartMutation.mutate(item.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Minus className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-8">
                  <ShoppingCart className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                  <p className="text-neutral">Your cart is empty</p>
                </div>
              )}
            </div>
            
            {cart && cart.length > 0 && (
              <div className="border-t pt-4">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-semibold">Total:</span>
                  <span className="text-2xl font-bold text-primary">₹{cartTotal.toFixed(2)}</span>
                </div>
                <Button className="w-full bg-primary text-white hover:bg-secondary" size="lg">
                  Proceed to Checkout
                </Button>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>

      <Footer />
    </div>
  );
}