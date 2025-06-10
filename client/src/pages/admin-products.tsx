import { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocation } from "wouter";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { 
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger 
} from "@/components/ui/dialog";
import { 
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue 
} from "@/components/ui/select";
import { 
  Plus, Edit2, Trash2, Package, TrendingUp, AlertTriangle, 
  Image as ImageIcon, Upload, Search, Filter, LogOut, User
} from "lucide-react";

export default function AdminProductsPage() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [productForm, setProductForm] = useState({
    name: "",
    description: "",
    category: "early",
    price: "",
    stockQuantity: "",
    weight: "",
    sku: "",
    specifications: {
      protein: "",
      fat: "",
      fiber: "",
      moisture: "",
      energy: "",
      pelletSize: ""
    },
    images: [] as string[],
    isActive: true
  });

  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [, navigate] = useLocation();

  useEffect(() => {
    document.title = "Product Management - JK Trout Feed Admin";
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("adminAuthenticated");
    localStorage.removeItem("adminUser");
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
    navigate("/secure-portal-jk2024");
  };

  const { data: products, isLoading } = useQuery({
    queryKey: ['/api/products'],
    queryFn: () => fetch('/api/products').then(res => res.json())
  });

  const createProductMutation = useMutation({
    mutationFn: (productData: any) => apiRequest("POST", "/api/products", productData),
    onSuccess: () => {
      toast({
        title: "Product Created",
        description: "Product has been successfully created.",
      });
      queryClient.invalidateQueries({ queryKey: ['/api/products'] });
      setIsCreateModalOpen(false);
      resetForm();
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to create product.",
        variant: "destructive",
      });
    }
  });

  const updateProductMutation = useMutation({
    mutationFn: ({ id, data }: { id: number, data: any }) => 
      apiRequest("PUT", `/api/products/${id}`, data),
    onSuccess: () => {
      toast({
        title: "Product Updated",
        description: "Product has been successfully updated.",
      });
      queryClient.invalidateQueries({ queryKey: ['/api/products'] });
      setEditingProduct(null);
      resetForm();
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update product.",
        variant: "destructive",
      });
    }
  });

  const deleteProductMutation = useMutation({
    mutationFn: (id: number) => apiRequest("DELETE", `/api/products/${id}`),
    onSuccess: () => {
      toast({
        title: "Product Deleted",
        description: "Product has been successfully deleted.",
      });
      queryClient.invalidateQueries({ queryKey: ['/api/products'] });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete product.",
        variant: "destructive",
      });
    }
  });

  const resetForm = () => {
    setProductForm({
      name: "",
      description: "",
      category: "early",
      price: "",
      stockQuantity: "",
      weight: "",
      sku: "",
      specifications: {
        protein: "",
        fat: "",
        fiber: "",
        moisture: "",
        energy: "",
        pelletSize: ""
      },
      images: [],
      isActive: true
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const formData = {
      ...productForm,
      price: productForm.price,
      stockQuantity: parseInt(productForm.stockQuantity),
    };

    if (editingProduct) {
      updateProductMutation.mutate({ id: editingProduct.id, data: formData });
    } else {
      createProductMutation.mutate(formData);
    }
  };

  const handleEdit = (product: any) => {
    setEditingProduct(product);
    setProductForm({
      name: product.name,
      description: product.description,
      category: product.category,
      price: product.price,
      stockQuantity: product.stockQuantity.toString(),
      weight: product.weight,
      sku: product.sku,
      specifications: product.specifications,
      images: product.images || [],
      isActive: product.isActive
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      // Simulate image upload - in production, you'd upload to a cloud service
      const newImages = Array.from(files).map(file => URL.createObjectURL(file));
      setProductForm(prev => ({
        ...prev,
        images: [...prev.images, ...newImages]
      }));
    }
  };

  const filteredProducts = products?.filter((product: any) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === "all" || product.category === filterCategory;
    return matchesSearch && matchesCategory;
  }) || [];

  const getStockStatus = (stock: number) => {
    if (stock === 0) return { label: "Out of Stock", color: "bg-red-100 text-red-800" };
    if (stock < 10) return { label: "Low Stock", color: "bg-yellow-100 text-yellow-800" };
    return { label: "In Stock", color: "bg-green-100 text-green-800" };
  };

  const stats = {
    totalProducts: products?.length || 0,
    activeProducts: products?.filter((p: any) => p.isActive).length || 0,
    lowStockProducts: products?.filter((p: any) => p.stockQuantity < 10).length || 0,
    totalValue: products?.reduce((sum: number, p: any) => sum + (parseFloat(p.price) * p.stockQuantity), 0) || 0
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Header */}
      <section className="bg-gradient-to-r from-primary to-secondary text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Product Management</h1>
              <p className="text-xl text-blue-200">Manage your trout feed product catalog</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center text-blue-200">
                <User className="w-4 h-4 mr-2" />
                <span>Welcome, {localStorage.getItem("adminUser")}</span>
              </div>
              <Button 
                onClick={() => setIsCreateModalOpen(true)}
                className="bg-white text-primary hover:bg-gray-100"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Product
              </Button>
              <Button 
                onClick={handleLogout}
                variant="outline"
                className="bg-red-500 text-white hover:bg-red-600 border-red-500"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-neutral font-medium">Total Products</p>
                  <p className="text-3xl font-bold text-primary">{stats.totalProducts}</p>
                </div>
                <Package className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-neutral font-medium">Active Products</p>
                  <p className="text-3xl font-bold text-secondary">{stats.activeProducts}</p>
                </div>
                <TrendingUp className="w-8 h-8 text-secondary" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-neutral font-medium">Low Stock Alerts</p>
                  <p className="text-3xl font-bold text-red-600">{stats.lowStockProducts}</p>
                </div>
                <AlertTriangle className="w-8 h-8 text-red-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-neutral font-medium">Inventory Value</p>
                  <p className="text-3xl font-bold text-accent">₹{stats.totalValue.toLocaleString()}</p>
                </div>
                <TrendingUp className="w-8 h-8 text-accent" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral w-4 h-4" />
                  <Input
                    placeholder="Search products by name or SKU..."
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
                    <SelectValue placeholder="Filter by category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="early">Early Stage</SelectItem>
                    <SelectItem value="small">Small Stage</SelectItem>
                    <SelectItem value="stock">Stock Stage</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Products Table */}
        <Card>
          <CardHeader>
            <CardTitle>Product Catalog</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {isLoading ? (
              <div className="p-8 text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                <p className="mt-4 text-neutral">Loading products...</p>
              </div>
            ) : filteredProducts.length > 0 ? (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50">
                      <TableHead>Product</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Stock</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>SKU</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredProducts.map((product: any) => {
                      const stockStatus = getStockStatus(product.stockQuantity);
                      return (
                        <TableRow key={product.id}>
                          <TableCell>
                            <div className="flex items-center space-x-3">
                              <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                                {product.images?.length > 0 ? (
                                  <img 
                                    src={product.images[0]} 
                                    alt={product.name}
                                    className="w-full h-full object-cover rounded-lg"
                                  />
                                ) : (
                                  <ImageIcon className="w-6 h-6 text-gray-400" />
                                )}
                              </div>
                              <div>
                                <p className="font-semibold">{product.name}</p>
                                <p className="text-sm text-neutral">{product.weight}</p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="secondary" className="capitalize">
                              {product.category}
                            </Badge>
                          </TableCell>
                          <TableCell>₹{product.price}</TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <span>{product.stockQuantity}</span>
                              <Badge variant="secondary" className={stockStatus.color}>
                                {stockStatus.label}
                              </Badge>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge 
                              variant={product.isActive ? "default" : "secondary"}
                              className={product.isActive ? "bg-green-100 text-green-800" : ""}
                            >
                              {product.isActive ? "Active" : "Inactive"}
                            </Badge>
                          </TableCell>
                          <TableCell className="font-mono text-sm">{product.sku}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end space-x-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleEdit(product)}
                              >
                                <Edit2 className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => deleteProductMutation.mutate(product.id)}
                                className="text-red-600 hover:text-red-700"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="p-8 text-center text-neutral">
                <Package className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No products found matching your criteria</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Create/Edit Product Modal */}
        <Dialog open={isCreateModalOpen || !!editingProduct} onOpenChange={(open) => {
          if (!open) {
            setIsCreateModalOpen(false);
            setEditingProduct(null);
            resetForm();
          }
        }}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingProduct ? "Edit Product" : "Create New Product"}
              </DialogTitle>
            </DialogHeader>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Basic Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Basic Information</h3>
                  
                  <div>
                    <Label htmlFor="name">Product Name *</Label>
                    <Input
                      id="name"
                      value={productForm.name}
                      onChange={(e) => setProductForm(prev => ({...prev, name: e.target.value}))}
                      placeholder="e.g., Premium Early Stage Feed"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="sku">SKU *</Label>
                    <Input
                      id="sku"
                      value={productForm.sku}
                      onChange={(e) => setProductForm(prev => ({...prev, sku: e.target.value}))}
                      placeholder="e.g., JKT-EARLY-25KG"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="category">Category *</Label>
                    <Select 
                      value={productForm.category} 
                      onValueChange={(value) => setProductForm(prev => ({...prev, category: value}))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="early">Early Stage</SelectItem>
                        <SelectItem value="small">Small Stage</SelectItem>
                        <SelectItem value="stock">Stock Stage</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="price">Price (₹) *</Label>
                      <Input
                        id="price"
                        type="number"
                        step="0.01"
                        value={productForm.price}
                        onChange={(e) => setProductForm(prev => ({...prev, price: e.target.value}))}
                        placeholder="2500.00"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="weight">Weight *</Label>
                      <Input
                        id="weight"
                        value={productForm.weight}
                        onChange={(e) => setProductForm(prev => ({...prev, weight: e.target.value}))}
                        placeholder="25kg"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="stockQuantity">Stock Quantity *</Label>
                    <Input
                      id="stockQuantity"
                      type="number"
                      value={productForm.stockQuantity}
                      onChange={(e) => setProductForm(prev => ({...prev, stockQuantity: e.target.value}))}
                      placeholder="100"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="description">Description *</Label>
                    <Textarea
                      id="description"
                      value={productForm.description}
                      onChange={(e) => setProductForm(prev => ({...prev, description: e.target.value}))}
                      placeholder="Detailed product description..."
                      rows={4}
                      required
                    />
                  </div>
                </div>

                {/* Specifications */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Nutritional Specifications</h3>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="protein">Protein Content *</Label>
                      <Input
                        id="protein"
                        value={productForm.specifications.protein}
                        onChange={(e) => setProductForm(prev => ({
                          ...prev, 
                          specifications: {...prev.specifications, protein: e.target.value}
                        }))}
                        placeholder="45%"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="fat">Fat Content *</Label>
                      <Input
                        id="fat"
                        value={productForm.specifications.fat}
                        onChange={(e) => setProductForm(prev => ({
                          ...prev, 
                          specifications: {...prev.specifications, fat: e.target.value}
                        }))}
                        placeholder="15-18%"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="fiber">Fiber Content *</Label>
                      <Input
                        id="fiber"
                        value={productForm.specifications.fiber}
                        onChange={(e) => setProductForm(prev => ({
                          ...prev, 
                          specifications: {...prev.specifications, fiber: e.target.value}
                        }))}
                        placeholder="3% max"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="moisture">Moisture Content *</Label>
                      <Input
                        id="moisture"
                        value={productForm.specifications.moisture}
                        onChange={(e) => setProductForm(prev => ({
                          ...prev, 
                          specifications: {...prev.specifications, moisture: e.target.value}
                        }))}
                        placeholder="8% max"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="energy">Energy Content *</Label>
                      <Input
                        id="energy"
                        value={productForm.specifications.energy}
                        onChange={(e) => setProductForm(prev => ({
                          ...prev, 
                          specifications: {...prev.specifications, energy: e.target.value}
                        }))}
                        placeholder="15 KJ/GM"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="pelletSize">Pellet Size *</Label>
                      <Input
                        id="pelletSize"
                        value={productForm.specifications.pelletSize}
                        onChange={(e) => setProductForm(prev => ({
                          ...prev, 
                          specifications: {...prev.specifications, pelletSize: e.target.value}
                        }))}
                        placeholder="0.5mm"
                        required
                      />
                    </div>
                  </div>
                  
                  {/* Image Upload */}
                  <div>
                    <Label htmlFor="images">Product Images</Label>
                    <div className="mt-2">
                      <div className="flex items-center justify-center w-full">
                        <label htmlFor="images" className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <Upload className="w-8 h-8 mb-4 text-gray-500" />
                            <p className="mb-2 text-sm text-gray-500">
                              <span className="font-semibold">Click to upload</span> or drag and drop
                            </p>
                            <p className="text-xs text-gray-500">PNG, JPG or WebP (MAX. 5MB)</p>
                          </div>
                          <Input
                            id="images"
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                          />
                        </label>
                      </div>
                      
                      {productForm.images.length > 0 && (
                        <div className="mt-4 grid grid-cols-3 gap-2">
                          {productForm.images.map((image, index) => (
                            <div key={index} className="relative">
                              <img 
                                src={image} 
                                alt={`Product ${index + 1}`}
                                className="w-full h-20 object-cover rounded-lg"
                              />
                              <button
                                type="button"
                                onClick={() => setProductForm(prev => ({
                                  ...prev,
                                  images: prev.images.filter((_, i) => i !== index)
                                }))}
                                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                              >
                                ×
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end space-x-4 pt-6 border-t">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setIsCreateModalOpen(false);
                    setEditingProduct(null);
                    resetForm();
                  }}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={createProductMutation.isPending || updateProductMutation.isPending}
                  className="bg-primary text-white"
                >
                  {createProductMutation.isPending || updateProductMutation.isPending ? (
                    "Saving..."
                  ) : editingProduct ? (
                    "Update Product"
                  ) : (
                    "Create Product"
                  )}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Footer />
    </div>
  );
}