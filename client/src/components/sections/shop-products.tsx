import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Star, Truck } from "lucide-react";

export default function ShopProducts() {
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

                <Button 
                  className="w-full" 
                  disabled={!product.inStock}
                  variant={product.inStock ? "default" : "secondary"}
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  {product.inStock ? "Add to Cart" : "Notify Me"}
                </Button>
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
    </section>
  );
}