import { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocation } from "wouter";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { 
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue 
} from "@/components/ui/select";
import { 
  ShoppingCart, User, LogOut, Search, Filter, Eye, 
  Package, TrendingUp, AlertTriangle, Clock, CheckCircle
} from "lucide-react";

export default function AdminOrdersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [, navigate] = useLocation();

  useEffect(() => {
    document.title = "Order Management - JK Trout Feed Admin";
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

  const { data: orders, isLoading } = useQuery({
    queryKey: ['/api/orders'],
    queryFn: () => fetch('/api/orders').then(res => res.json())
  });

  const updateOrderStatusMutation = useMutation({
    mutationFn: ({ orderId, status }: { orderId: number, status: string }) => 
      apiRequest("PUT", `/api/orders/${orderId}/status`, { status }),
    onSuccess: () => {
      toast({
        title: "Order Updated",
        description: "Order status has been updated successfully.",
      });
      queryClient.invalidateQueries({ queryKey: ['/api/orders'] });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update order status.",
        variant: "destructive",
      });
    }
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "confirmed": return "bg-blue-100 text-blue-800";
      case "shipped": return "bg-purple-100 text-purple-800";
      case "delivered": return "bg-green-100 text-green-800";
      case "cancelled": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case "paid": return "bg-green-100 text-green-800";
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "failed": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const filteredOrders = orders?.filter((order: any) => {
    const matchesSearch = order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customerEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.id.toString().includes(searchTerm);
    const matchesStatus = statusFilter === "all" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  }) || [];

  const stats = {
    totalOrders: orders?.length || 0,
    pendingOrders: orders?.filter((o: any) => o.status === "pending").length || 0,
    shippedOrders: orders?.filter((o: any) => o.status === "shipped").length || 0,
    totalRevenue: orders?.reduce((sum: number, o: any) => sum + parseFloat(o.totalAmount), 0) || 0
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
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
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Order Management</h1>
              <p className="text-xl text-blue-200">Track and manage customer orders</p>
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
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-neutral font-medium">Total Orders</p>
                  <p className="text-3xl font-bold text-primary">{stats.totalOrders}</p>
                </div>
                <ShoppingCart className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-neutral font-medium">Pending Orders</p>
                  <p className="text-3xl font-bold text-yellow-600">{stats.pendingOrders}</p>
                </div>
                <Clock className="w-8 h-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-neutral font-medium">Shipped Orders</p>
                  <p className="text-3xl font-bold text-purple-600">{stats.shippedOrders}</p>
                </div>
                <Package className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-neutral font-medium">Total Revenue</p>
                  <p className="text-3xl font-bold text-green-600">₹{stats.totalRevenue.toLocaleString()}</p>
                </div>
                <TrendingUp className="w-8 h-8 text-green-600" />
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
                    placeholder="Search orders by customer name, email, or order ID..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="w-full md:w-48">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="confirmed">Confirmed</SelectItem>
                    <SelectItem value="shipped">Shipped</SelectItem>
                    <SelectItem value="delivered">Delivered</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Orders Table */}
        <Card>
          <CardHeader>
            <CardTitle>Customer Orders</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {isLoading ? (
              <div className="p-8 text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                <p className="mt-4 text-neutral">Loading orders...</p>
              </div>
            ) : filteredOrders.length > 0 ? (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50">
                      <TableHead>Order ID</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Payment</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredOrders.map((order: any) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-mono">#{order.id}</TableCell>
                        <TableCell>
                          <div>
                            <p className="font-semibold">{order.customerName}</p>
                            <p className="text-sm text-neutral">{order.customerEmail}</p>
                            {order.customerPhone && (
                              <p className="text-sm text-neutral">{order.customerPhone}</p>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            {formatDate(order.createdAt)}
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className="font-semibold">₹{parseFloat(order.totalAmount).toLocaleString()}</span>
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary" className={getPaymentStatusColor(order.paymentStatus)}>
                            {order.paymentStatus}
                          </Badge>
                          {order.paymentMethod && (
                            <p className="text-xs text-gray-500 mt-1 capitalize">{order.paymentMethod}</p>
                          )}
                        </TableCell>
                        <TableCell>
                          <Select
                            value={order.status}
                            onValueChange={(status) => updateOrderStatusMutation.mutate({ orderId: order.id, status })}
                          >
                            <SelectTrigger className="w-32">
                              <SelectValue>
                                <Badge variant="secondary" className={getStatusColor(order.status)}>
                                  {order.status}
                                </Badge>
                              </SelectValue>
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="pending">Pending</SelectItem>
                              <SelectItem value="confirmed">Confirmed</SelectItem>
                              <SelectItem value="shipped">Shipped</SelectItem>
                              <SelectItem value="delivered">Delivered</SelectItem>
                              <SelectItem value="cancelled">Cancelled</SelectItem>
                            </SelectContent>
                          </Select>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setSelectedOrder(order)}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="p-8 text-center">
                <ShoppingCart className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-neutral">No orders found</p>
                <p className="text-sm text-gray-500 mt-2">Orders will appear here when customers make purchases</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
}