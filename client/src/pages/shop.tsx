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
import { 
  MessageCircle, Eye, Filter, Search, 
  Package, Star, Truck, Shield
} from "lucide-react";

export default function ShopPage() {
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");

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

  // Function to send product inquiry to admin portal
  const sendToAdmin = async (product: any) => {
    try {
      const specifications = product.specifications;
      const features = Object.entries(specifications || {}).map(([key, value]) => `${key}: ${value}`).join(", ");
      
      const inquiryData = {
        name: "Product Inquiry",
        email: "customer@inquiry.com",
        phone: "",
        subject: `Product Inquiry: ${product.name}`,
        message: `Customer interested in:

Product: ${product.name}
Category: ${product.category}
Price: ₹${product.price.toLocaleString()}
Weight: ${product.weight}
SKU: ${product.sku}
Specifications: ${features}

Description: ${product.description}

Customer requested more details and availability.`
      };

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(inquiryData)
      });

      if (response.ok) {
        // Redirect to admin portal after successful submission
        window.open('/secure-portal-jk2024', '_blank');
      }
    } catch (error) {
      console.error('Failed to send inquiry:', error);
    }
  };

  useEffect(() => {
    document.title = "Shop Premium Trout Feed - JK Trout Feed";
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
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Header */}
      <section className="bg-gradient-to-r from-primary to-secondary text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Premium Trout Feed Shop</h1>
            <p className="text-xl text-blue-200 max-w-3xl mx-auto">
              Discover our complete range of high-quality trout feed products with detailed specifications and competitive pricing
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral w-4 h-4" />
            <Input
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={filterCategory} onValueChange={setFilterCategory}>
            <SelectTrigger className="w-full md:w-48">
              <Filter className="w-4 h-4 mr-2" />
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
            {filteredProducts.map((product: any) => {
              const stockStatus = getStockStatus(product.stockQuantity);
              return (
                <Card key={product.id} className="group hover:shadow-xl transition-all duration-300">
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
                            className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                            onClick={() => shareOnWhatsApp(product)}
                            disabled={product.stockQuantity === 0}
                          >
                            <MessageCircle className="w-4 h-4 mr-2" />
                            WhatsApp
                          </Button>
                          <Button
                            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                            onClick={() => sendToAdmin(product)}
                            disabled={product.stockQuantity === 0}
                          >
                            <Package className="w-4 h-4 mr-2" />
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
                      sendToAdmin(selectedProduct);
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

      <Footer />
    </div>
  );
}