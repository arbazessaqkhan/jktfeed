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
import NotificationSystem from "@/components/notification-system";
import { 
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger 
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { 
  Plus, Edit2, Trash2, Image as ImageIcon, Upload, LogOut, User, 
  Eye, EyeOff, ArrowUp, ArrowDown, Images, Package
} from "lucide-react";

export default function AdminShowcasePage() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingImage, setEditingImage] = useState<any>(null);
  const [imageForm, setImageForm] = useState({
    title: "",
    description: "",
    imageUrl: "",
    order: 0,
    isActive: true
  });

  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [, navigate] = useLocation();

  useEffect(() => {
    document.title = "Showcase Management - JK Trout Feed Admin";
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

  const { data: showcaseImages, isLoading } = useQuery({
    queryKey: ['/api/showcase-images'],
    queryFn: () => fetch('/api/showcase-images').then(res => res.json())
  });

  const createImageMutation = useMutation({
    mutationFn: (imageData: any) => apiRequest("POST", "/api/showcase-images", imageData),
    onSuccess: () => {
      toast({
        title: "Image Added",
        description: "Showcase image has been successfully added.",
      });
      queryClient.invalidateQueries({ queryKey: ['/api/showcase-images'] });
      setIsCreateModalOpen(false);
      resetForm();
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to add showcase image.",
        variant: "destructive",
      });
    }
  });

  const updateImageMutation = useMutation({
    mutationFn: ({ id, data }: { id: number, data: any }) => 
      apiRequest("PUT", `/api/showcase-images/${id}`, data),
    onSuccess: () => {
      toast({
        title: "Image Updated",
        description: "Showcase image has been successfully updated.",
      });
      queryClient.invalidateQueries({ queryKey: ['/api/showcase-images'] });
      setEditingImage(null);
      resetForm();
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update showcase image.",
        variant: "destructive",
      });
    }
  });

  const deleteImageMutation = useMutation({
    mutationFn: (id: number) => apiRequest("DELETE", `/api/showcase-images/${id}`),
    onSuccess: () => {
      toast({
        title: "Image Deleted",
        description: "Showcase image has been successfully deleted.",
      });
      queryClient.invalidateQueries({ queryKey: ['/api/showcase-images'] });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete showcase image.",
        variant: "destructive",
      });
    }
  });

  const resetForm = () => {
    setImageForm({
      title: "",
      description: "",
      imageUrl: "",
      order: 0,
      isActive: true
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingImage) {
      updateImageMutation.mutate({ id: editingImage.id, data: imageForm });
    } else {
      createImageMutation.mutate(imageForm);
    }
  };

  const handleEdit = (image: any) => {
    setEditingImage(image);
    setImageForm({
      title: image.title,
      description: image.description || "",
      imageUrl: image.imageUrl,
      order: image.order,
      isActive: image.isActive
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In a real application, you'd upload to a cloud service like Cloudinary or AWS S3
      // For now, we'll create a local URL
      const imageUrl = URL.createObjectURL(file);
      setImageForm(prev => ({
        ...prev,
        imageUrl: imageUrl
      }));
      
      toast({
        title: "Image Selected",
        description: "Image has been selected. In production, this would be uploaded to cloud storage.",
      });
    }
  };

  const stats = {
    totalImages: showcaseImages?.length || 0,
    activeImages: showcaseImages?.filter((img: any) => img.isActive).length || 0,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Header */}
      <section className="bg-gradient-to-r from-primary to-secondary text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Showcase Management</h1>
              <p className="text-xl text-blue-200">Manage homepage showcase images</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center text-blue-200">
                <User className="w-4 h-4 mr-2" />
                <span>Welcome, {localStorage.getItem("adminUser")}</span>
              </div>
              <NotificationSystem />
              <Button 
                onClick={() => navigate("/admin-products")}
                variant="outline"
                className="bg-white text-primary hover:bg-gray-100"
              >
                <Package className="w-4 h-4 mr-2" />
                Products
              </Button>
              <Button 
                onClick={() => setIsCreateModalOpen(true)}
                className="bg-white text-primary hover:bg-gray-100"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Image
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-neutral font-medium">Total Images</p>
                  <p className="text-3xl font-bold text-primary">{stats.totalImages}</p>
                </div>
                <Images className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-neutral font-medium">Active Images</p>
                  <p className="text-3xl font-bold text-secondary">{stats.activeImages}</p>
                </div>
                <Eye className="w-8 h-8 text-secondary" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-neutral font-medium">Hidden Images</p>
                  <p className="text-3xl font-bold text-red-600">{stats.totalImages - stats.activeImages}</p>
                </div>
                <EyeOff className="w-8 h-8 text-red-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Images Table */}
        <Card>
          <CardHeader>
            <CardTitle>Showcase Images</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {isLoading ? (
              <div className="p-8 text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                <p className="mt-4 text-neutral">Loading showcase images...</p>
              </div>
            ) : showcaseImages?.length > 0 ? (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50">
                      <TableHead>Image</TableHead>
                      <TableHead>Title</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Order</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {showcaseImages.map((image: any) => (
                      <TableRow key={image.id}>
                        <TableCell>
                          <div className="w-20 h-12 bg-gray-200 rounded-lg flex items-center justify-center overflow-hidden">
                            {image.imageUrl ? (
                              <img 
                                src={image.imageUrl} 
                                alt={image.title}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <ImageIcon className="w-6 h-6 text-gray-400" />
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="font-semibold">{image.title}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <p className="text-sm text-neutral max-w-xs truncate">
                            {image.description || "No description"}
                          </p>
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary">
                            Order: {image.order}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge 
                            variant={image.isActive ? "default" : "secondary"}
                            className={image.isActive ? "bg-green-100 text-green-800" : ""}
                          >
                            {image.isActive ? "Active" : "Hidden"}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleEdit(image)}
                            >
                              <Edit2 className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => deleteImageMutation.mutate(image.id)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="p-8 text-center">
                <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-neutral">No showcase images found</p>
                <Button 
                  onClick={() => setIsCreateModalOpen(true)}
                  className="mt-4"
                >
                  Add Your First Image
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Create/Edit Modal */}
      <Dialog 
        open={isCreateModalOpen || editingImage !== null} 
        onOpenChange={(open) => {
          if (!open) {
            setIsCreateModalOpen(false);
            setEditingImage(null);
            resetForm();
          }
        }}
      >
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {editingImage ? "Edit Showcase Image" : "Add New Showcase Image"}
            </DialogTitle>
          </DialogHeader>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={imageForm.title}
                  onChange={(e) => setImageForm(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Enter image title"
                  required
                />
              </div>

              <div>
                <Label htmlFor="description">Description (Optional)</Label>
                <Textarea
                  id="description"
                  value={imageForm.description}
                  onChange={(e) => setImageForm(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Enter image description"
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="imageUpload">Image</Label>
                <div className="space-y-2">
                  <Input
                    id="imageUpload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-primary/90"
                  />
                  {imageForm.imageUrl && (
                    <div className="mt-2">
                      <img 
                        src={imageForm.imageUrl} 
                        alt="Preview" 
                        className="w-full h-32 object-cover rounded-lg border"
                      />
                    </div>
                  )}
                </div>
              </div>

              <div>
                <Label htmlFor="order">Display Order</Label>
                <Input
                  id="order"
                  type="number"
                  value={imageForm.order}
                  onChange={(e) => setImageForm(prev => ({ ...prev, order: parseInt(e.target.value) }))}
                  placeholder="0"
                  min="0"
                />
                <p className="text-sm text-neutral mt-1">Lower numbers appear first</p>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="isActive"
                  checked={imageForm.isActive}
                  onCheckedChange={(checked) => setImageForm(prev => ({ ...prev, isActive: checked }))}
                />
                <Label htmlFor="isActive">Show on homepage</Label>
              </div>
            </div>

            <div className="flex justify-end space-x-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setIsCreateModalOpen(false);
                  setEditingImage(null);
                  resetForm();
                }}
              >
                Cancel
              </Button>
              <Button 
                type="submit"
                disabled={createImageMutation.isPending || updateImageMutation.isPending}
              >
                {editingImage ? "Update Image" : "Add Image"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
}