import { useEffect } from "react";
import { useLocation } from "wouter";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { 
  Package, Image as ImageIcon, LogOut, User, 
  BarChart3, Users, ShoppingCart, Settings, MessageCircle
} from "lucide-react";

export default function AdminDashboard() {
  const [, navigate] = useLocation();
  const { toast } = useToast();

  useEffect(() => {
    document.title = "Admin Dashboard - JK Trout Feed";
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

  const adminModules = [
    {
      title: "Product Management",
      description: "Manage trout feed products, inventory, and specifications",
      icon: Package,
      path: "/admin-products",
      color: "bg-blue-500",
      stats: "Manage Catalog"
    },
    {
      title: "Messages & Support",
      description: "Customer inquiries and communication management",
      icon: MessageCircle,
      path: "/admin-messages",
      color: "bg-green-500",
      stats: "Customer Support"
    },
    {
      title: "Order Management",
      description: "Track and process customer orders",
      icon: ShoppingCart,
      path: "/admin-orders",
      color: "bg-yellow-500",
      stats: "Order Processing"
    },
    {
      title: "Showcase Gallery",
      description: "Upload and manage homepage showcase images",
      icon: ImageIcon,
      path: "/admin-showcase",
      color: "bg-purple-500",
      stats: "Image Gallery"
    },
    {
      title: "Analytics Dashboard",
      description: "Business insights and performance metrics",
      icon: BarChart3,
      path: "/admin-analytics",
      color: "bg-red-500",
      stats: "Business Analytics"
    },
    {
      title: "System Settings",
      description: "Configure business preferences and system settings",
      icon: Settings,
      path: "/admin-settings",
      color: "bg-gray-500",
      stats: "Configuration"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Header */}
      <section className="bg-gradient-to-r from-primary to-secondary text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Admin Dashboard</h1>
              <p className="text-xl text-blue-200">JK Trout Feed Management System</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center text-blue-200">
                <User className="w-4 h-4 mr-2" />
                <span>Welcome, {localStorage.getItem("adminUser")}</span>
              </div>
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
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-neutral font-medium">System Status</p>
                  <p className="text-2xl font-bold text-green-600">Online</p>
                </div>
                <Settings className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-neutral font-medium">Active Products</p>
                  <p className="text-2xl font-bold text-primary">Available</p>
                </div>
                <Package className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-neutral font-medium">Gallery Images</p>
                  <p className="text-2xl font-bold text-purple-600">Managed</p>
                </div>
                <ImageIcon className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-neutral font-medium">Orders</p>
                  <p className="text-2xl font-bold text-orange-600">Tracking</p>
                </div>
                <ShoppingCart className="w-8 h-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Admin Modules */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Management Modules</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {adminModules.map((module) => {
              const IconComponent = module.icon;
              return (
                <Card key={module.title} className="group hover:shadow-lg transition-all duration-300 cursor-pointer">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className={`${module.color} text-white w-12 h-12 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">{module.title}</h3>
                        <p className="text-neutral text-sm mb-4">{module.description}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                            {module.stats}
                          </span>
                          <Button 
                            onClick={() => navigate(module.path)}
                            variant="outline"
                            size="sm"
                            className="group-hover:bg-primary group-hover:text-white transition-colors duration-300"
                          >
                            Access
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button 
                onClick={() => navigate("/admin-products")}
                className="h-16 bg-blue-500 hover:bg-blue-600 text-white"
              >
                <Package className="w-5 h-5 mr-2" />
                Manage Products
              </Button>
              <Button 
                onClick={() => navigate("/admin-showcase")}
                className="h-16 bg-purple-500 hover:bg-purple-600 text-white"
              >
                <ImageIcon className="w-5 h-5 mr-2" />
                Upload Images
              </Button>
              <Button 
                onClick={() => navigate("/")}
                variant="outline"
                className="h-16"
              >
                View Website
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
}