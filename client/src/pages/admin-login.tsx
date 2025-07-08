import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Shield, User, Lock, Package, Bell, MessageSquare } from "lucide-react";

export default function AdminLoginPage() {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [, navigate] = useLocation();
  const { toast } = useToast();

  // Fetch recent product inquiries
  const { data: contacts } = useQuery({
    queryKey: ['/api/contacts'],
    queryFn: () => fetch('/api/contacts').then(res => res.json()).catch(() => []),
    refetchInterval: 10000 // Refresh every 10 seconds
  });

  const { data: notifications } = useQuery({
    queryKey: ['/api/notifications'],
    queryFn: () => fetch('/api/notifications').then(res => res.json()).catch(() => []),
    refetchInterval: 5000 // Refresh every 5 seconds
  });

  useEffect(() => {
    document.title = "Admin Login - JK Trout Feed";
    
    // Check if already authenticated
    const isAuthenticated = localStorage.getItem("adminAuthenticated") === "true";
    if (isAuthenticated) {
      navigate("/admin/dashboard");
    }
  }, [navigate]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call delay
    setTimeout(() => {
      if (credentials.username === "admin" && credentials.password === "admintanveer123") {
        localStorage.setItem("adminAuthenticated", "true");
        localStorage.setItem("adminUser", "admin");
        toast({
          title: "Login Successful",
          description: "Welcome to JK Trout Feed Admin Panel",
        });
        navigate("/admin/dashboard");
      } else {
        toast({
          title: "Login Failed",
          description: "Invalid username or password",
          variant: "destructive",
        });
      }
      setIsLoading(false);
    }, 1000);
  };

  // const recentContacts = contacts?.slice(0, 5) || [];
  const recentContacts = Array.isArray(contacts) ? contacts.slice(0, 5) : [];
  // const unreadNotifications = notifications?.filter((n: any) => !n.isRead).length || 0;
  const unreadNotifications = Array.isArray(notifications) ? notifications.filter((n: any) => !n.isRead).length : 0;
  // const productInquiries = contacts?.filter((c: any) => c.subject?.includes("Product Inquiry")) || [];
  const productInquiries = Array.isArray(contacts) ? contacts.filter((c: any) => c.subject?.includes("Product Inquiry")) : [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary to-secondary p-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Login Form */}
          <div className="lg:col-span-1 flex items-center justify-center">
            <Card className="w-full max-w-md">
              <CardHeader className="text-center">
                <div className="mx-auto w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-4">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-2xl font-bold">Admin Login</CardTitle>
                <p className="text-neutral">JK Trout Feed Management System</p>
              </CardHeader>
              
              <CardContent>
                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <Label htmlFor="username">Username</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral w-4 h-4" />
                      <Input
                        id="username"
                        type="text"
                        value={credentials.username}
                        onChange={(e) => setCredentials(prev => ({ ...prev, username: e.target.value }))}
                        placeholder="Enter admin username"
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral w-4 h-4" />
                      <Input
                        id="password"
                        type="password"
                        value={credentials.password}
                        onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
                        placeholder="Enter admin password"
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                  
                  <Button
                    type="submit"
                    className="w-full bg-primary text-white hover:bg-secondary"
                    disabled={isLoading}
                  >
                    {isLoading ? "Signing In..." : "Sign In"}
                  </Button>
                </form>
                
                <div className="mt-6 pt-6 border-t text-center">
                  <p className="text-sm text-neutral">
                    For security purposes, admin access is restricted
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity Dashboard */}
          <div className="lg:col-span-2 space-y-6">
            {/* Notifications Summary */}
            <Card className="bg-white/95 backdrop-blur">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="w-5 h-5" />
                  Recent Activity
                  {unreadNotifications > 0 && (
                    <Badge variant="destructive" className="ml-2">
                      {unreadNotifications} new
                    </Badge>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <MessageSquare className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-blue-600">{contacts?.length || 0}</p>
                    <p className="text-sm text-neutral">Total Inquiries</p>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <Package className="w-8 h-8 text-green-600 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-green-600">{productInquiries.length}</p>
                    <p className="text-sm text-neutral">Product Inquiries</p>
                  </div>
                  <div className="text-center p-4 bg-orange-50 rounded-lg">
                    <Bell className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-orange-600">{unreadNotifications}</p>
                    <p className="text-sm text-neutral">Unread Alerts</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Product Inquiries */}
            <Card className="bg-white/95 backdrop-blur">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="w-5 h-5" />
                  Recent Product Inquiries
                </CardTitle>
              </CardHeader>
              <CardContent>
                {productInquiries.length > 0 ? (
                  <div className="space-y-3">
                    {productInquiries.slice(0, 5).map((inquiry: any) => (
                      <div key={inquiry.id} className="p-3 bg-gray-50 rounded-lg border-l-4 border-blue-500">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium text-sm">{inquiry.subject}</h4>
                          <Badge variant="secondary" className="text-xs">
                            {new Date(inquiry.createdAt).toLocaleDateString()}
                          </Badge>
                        </div>
                        <p className="text-xs text-neutral mt-1 line-clamp-2">
                          {inquiry.message}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-neutral">No product inquiries yet</p>
                    <p className="text-sm text-gray-500 mt-1">
                      Product inquiries from the shop will appear here
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Recent Contact Messages */}
            <Card className="bg-white/95 backdrop-blur">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5" />
                  Latest Contact Messages
                </CardTitle>
              </CardHeader>
              <CardContent>
                {recentContacts.length > 0 ? (
                  <div className="space-y-3">
                    {recentContacts.map((contact: any) => (
                      <div key={contact.id} className="p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium text-sm">{contact.name}</h4>
                          <Badge variant="outline" className="text-xs">
                            {new Date(contact.createdAt).toLocaleDateString()}
                          </Badge>
                        </div>
                        <p className="text-xs text-neutral">{contact.subject}</p>
                        <p className="text-xs text-gray-500 mt-1 line-clamp-1">
                          {contact.message}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-neutral">No messages yet</p>
                    <p className="text-sm text-gray-500 mt-1">
                      Contact form submissions will appear here
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}