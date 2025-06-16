import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { 
  BarChart3, TrendingUp, Users, ShoppingCart, Package, 
  DollarSign, Calendar, Eye, User, LogOut
} from "lucide-react";

export default function AdminAnalyticsPage() {
  const { toast } = useToast();
  const [, navigate] = useLocation();

  useEffect(() => {
    document.title = "Analytics Dashboard - JK Trout Feed Admin";
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

  // Fetch data for analytics
  const { data: products } = useQuery({
    queryKey: ['/api/products'],
    queryFn: () => fetch('/api/products').then(res => res.json())
  });

  const { data: orders } = useQuery({
    queryKey: ['/api/orders'],
    queryFn: () => fetch('/api/orders').then(res => res.json())
  });

  const { data: contacts } = useQuery({
    queryKey: ['/api/contacts'],
    queryFn: () => fetch('/api/contacts').then(res => res.json())
  });

  const { data: showcaseImages } = useQuery({
    queryKey: ['/api/showcase-images'],
    queryFn: () => fetch('/api/showcase-images').then(res => res.json())
  });

  // Calculate analytics data
  const analytics = {
    totalRevenue: orders?.reduce((sum: number, order: any) => sum + parseFloat(order.totalAmount), 0) || 0,
    totalOrders: orders?.length || 0,
    totalProducts: products?.length || 0,
    totalContacts: contacts?.length || 0,
    activeProducts: products?.filter((p: any) => p.isActive).length || 0,
    pendingOrders: orders?.filter((o: any) => o.status === "pending").length || 0,
    completedOrders: orders?.filter((o: any) => o.status === "delivered").length || 0,
    activeShowcaseImages: showcaseImages?.filter((img: any) => img.isActive).length || 0,
    averageOrderValue: orders?.length ? (orders?.reduce((sum: number, order: any) => sum + parseFloat(order.totalAmount), 0) / orders.length) : 0,
    conversionRate: contacts?.length ? ((orders?.length || 0) / contacts.length * 100) : 0
  };

  // Recent activity data
  const recentOrders = orders?.slice(0, 5) || [];
  const recentContacts = contacts?.slice(0, 5) || [];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Header */}
      <section className="bg-gradient-to-r from-primary to-secondary text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Analytics Dashboard</h1>
              <p className="text-xl text-blue-200">Business insights and performance metrics</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center text-blue-200">
                <User className="w-4 h-4 mr-2" />
                <span>Welcome, {localStorage.getItem("adminUser")}</span>
              </div>
              <Button 
                onClick={() => navigate("/admin/dashboard")}
                variant="outline"
                className="bg-white text-primary hover:bg-gray-100"
              >
                Dashboard
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
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-neutral font-medium">Total Revenue</p>
                  <p className="text-2xl font-bold text-green-600">{formatCurrency(analytics.totalRevenue)}</p>
                  <p className="text-xs text-green-600 mt-1">+12% from last month</p>
                </div>
                <DollarSign className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-neutral font-medium">Total Orders</p>
                  <p className="text-2xl font-bold text-blue-600">{analytics.totalOrders}</p>
                  <p className="text-xs text-blue-600 mt-1">+8% from last month</p>
                </div>
                <ShoppingCart className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-neutral font-medium">Customer Inquiries</p>
                  <p className="text-2xl font-bold text-purple-600">{analytics.totalContacts}</p>
                  <p className="text-xs text-purple-600 mt-1">+15% from last month</p>
                </div>
                <Users className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-neutral font-medium">Active Products</p>
                  <p className="text-2xl font-bold text-orange-600">{analytics.activeProducts}</p>
                  <p className="text-xs text-orange-600 mt-1">{analytics.totalProducts} total products</p>
                </div>
                <Package className="w-8 h-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Performance Metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Conversion Rate</h3>
                <TrendingUp className="w-5 h-5 text-green-600" />
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-green-600">{analytics.conversionRate.toFixed(1)}%</p>
                <p className="text-sm text-neutral mt-2">Inquiries to Orders</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Average Order Value</h3>
                <DollarSign className="w-5 h-5 text-blue-600" />
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-blue-600">{formatCurrency(analytics.averageOrderValue)}</p>
                <p className="text-sm text-neutral mt-2">Per Order</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Order Completion</h3>
                <ShoppingCart className="w-5 h-5 text-purple-600" />
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-purple-600">
                  {analytics.totalOrders ? ((analytics.completedOrders / analytics.totalOrders) * 100).toFixed(1) : 0}%
                </p>
                <p className="text-sm text-neutral mt-2">{analytics.completedOrders} of {analytics.totalOrders} orders</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <ShoppingCart className="w-5 h-5 mr-2" />
                Recent Orders
              </CardTitle>
            </CardHeader>
            <CardContent>
              {recentOrders.length > 0 ? (
                <div className="space-y-4">
                  {recentOrders.map((order: any) => (
                    <div key={order.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-semibold text-sm">#{order.id} - {order.customerName}</p>
                        <p className="text-xs text-gray-600">{formatDate(order.createdAt)}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-green-600">{formatCurrency(parseFloat(order.totalAmount))}</p>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                          order.status === 'shipped' ? 'bg-blue-100 text-blue-800' :
                          order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {order.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <ShoppingCart className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-neutral">No orders yet</p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="w-5 h-5 mr-2" />
                Recent Inquiries
              </CardTitle>
            </CardHeader>
            <CardContent>
              {recentContacts.length > 0 ? (
                <div className="space-y-4">
                  {recentContacts.map((contact: any) => (
                    <div key={contact.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <p className="font-semibold text-sm">{contact.name}</p>
                        <p className="text-xs text-gray-600 truncate">{contact.subject}</p>
                        <p className="text-xs text-gray-500">{formatDate(contact.createdAt)}</p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => navigate("/admin-messages")}
                      >
                        <Eye className="w-3 h-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-neutral">No inquiries yet</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Button 
                onClick={() => navigate("/admin-orders")}
                className="h-16 bg-blue-500 hover:bg-blue-600 text-white"
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                View All Orders
              </Button>
              <Button 
                onClick={() => navigate("/admin-messages")}
                className="h-16 bg-purple-500 hover:bg-purple-600 text-white"
              >
                <Users className="w-5 h-5 mr-2" />
                Customer Messages
              </Button>
              <Button 
                onClick={() => navigate("/admin-products")}
                className="h-16 bg-green-500 hover:bg-green-600 text-white"
              >
                <Package className="w-5 h-5 mr-2" />
                Manage Products
              </Button>
              <Button 
                onClick={() => navigate("/admin-showcase")}
                className="h-16 bg-orange-500 hover:bg-orange-600 text-white"
              >
                <Eye className="w-5 h-5 mr-2" />
                Gallery Images
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
}