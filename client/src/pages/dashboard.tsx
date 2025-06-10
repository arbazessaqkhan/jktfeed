import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Mail, Phone, Calendar, TrendingUp, Users, Package, MessageSquare } from "lucide-react";
import { format } from "date-fns";

export default function DashboardPage() {
  useEffect(() => {
    document.title = "Business Dashboard - JK Trout Feed | Contact Management & Analytics";
  }, []);

  const { data: contacts, isLoading, error } = useQuery({
    queryKey: ['/api/contacts'],
    queryFn: () => fetch('/api/contacts').then(res => res.json())
  });

  const mockAnalytics = {
    totalContacts: contacts?.length || 0,
    monthlyGrowth: "+23%",
    productInquiries: contacts?.filter((c: any) => c.subject.toLowerCase().includes('product')).length || 0,
    technicalSupport: contacts?.filter((c: any) => c.subject.toLowerCase().includes('technical')).length || 0,
    recentContacts: contacts?.slice(0, 5) || []
  };

  const businessMetrics = [
    {
      title: "Total Inquiries",
      value: mockAnalytics.totalContacts,
      change: mockAnalytics.monthlyGrowth,
      icon: <MessageSquare className="w-6 h-6" />,
      color: "text-primary"
    },
    {
      title: "Product Inquiries",
      value: mockAnalytics.productInquiries,
      change: "+15%",
      icon: <Package className="w-6 h-6" />,
      color: "text-secondary"
    },
    {
      title: "Technical Support",
      value: mockAnalytics.technicalSupport,
      change: "+8%",
      icon: <Users className="w-6 h-6" />,
      color: "text-accent"
    },
    {
      title: "Response Rate",
      value: "98.5%",
      change: "+2%",
      icon: <TrendingUp className="w-6 h-6" />,
      color: "text-primary"
    }
  ];

  const inquiryTypes = [
    { type: "Product Information", count: mockAnalytics.productInquiries, percentage: 45, color: "bg-blue-500" },
    { type: "Technical Support", count: mockAnalytics.technicalSupport, percentage: 30, color: "bg-green-500" },
    { type: "Partnership", count: Math.floor(mockAnalytics.totalContacts * 0.15), percentage: 15, color: "bg-purple-500" },
    { type: "General Inquiry", count: Math.floor(mockAnalytics.totalContacts * 0.10), percentage: 10, color: "bg-orange-500" }
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-neutral">Loading dashboard...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-secondary text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Business Dashboard</h1>
            <p className="text-xl text-blue-200">
              Monitor customer inquiries and business performance
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Business Metrics */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-primary mb-6">Key Performance Indicators</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {businessMetrics.map((metric, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-neutral font-medium">{metric.title}</p>
                      <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
                      <p className="text-sm text-green-600 font-medium">{metric.change} vs last month</p>
                    </div>
                    <div className={`${metric.color} bg-gray-100 p-3 rounded-lg`}>
                      {metric.icon}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Inquiry Types Analysis */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-primary mb-6">Inquiry Type Breakdown</h2>
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                {inquiryTypes.map((type, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-4 h-4 rounded ${type.color}`}></div>
                      <span className="font-medium">{type.type}</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="text-sm text-neutral">{type.count} inquiries</span>
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${type.color}`}
                          style={{ width: `${type.percentage}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium w-12">{type.percentage}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Recent Contacts */}
        <section className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-primary">Recent Customer Inquiries</h2>
            <Button className="bg-primary text-white">
              Export Report
            </Button>
          </div>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Latest Contact Submissions</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {error ? (
                <div className="p-6 text-center text-red-600">
                  Error loading contacts. Please check your connection.
                </div>
              ) : contacts && contacts.length > 0 ? (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-gray-50">
                        <TableHead className="font-semibold">Name</TableHead>
                        <TableHead className="font-semibold">Contact</TableHead>
                        <TableHead className="font-semibold">Subject</TableHead>
                        <TableHead className="font-semibold">Message</TableHead>
                        <TableHead className="font-semibold">Date</TableHead>
                        <TableHead className="font-semibold">Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {contacts.map((contact: any, index: number) => (
                        <TableRow key={contact.id} className={index % 2 === 0 ? "bg-white" : "bg-gray-25"}>
                          <TableCell className="font-medium">{contact.name}</TableCell>
                          <TableCell>
                            <div className="space-y-1">
                              <div className="flex items-center text-sm">
                                <Mail className="w-3 h-3 mr-1" />
                                {contact.email}
                              </div>
                              {contact.phone && (
                                <div className="flex items-center text-sm text-neutral">
                                  <Phone className="w-3 h-3 mr-1" />
                                  {contact.phone}
                                </div>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <span className="font-medium text-primary">{contact.subject}</span>
                          </TableCell>
                          <TableCell>
                            <p className="text-sm text-neutral max-w-xs truncate">
                              {contact.message}
                            </p>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center text-sm">
                              <Calendar className="w-3 h-3 mr-1" />
                              {format(new Date(contact.createdAt), 'MMM dd, yyyy')}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge 
                              variant="secondary"
                              className="bg-yellow-100 text-yellow-800"
                            >
                              Pending
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <div className="p-6 text-center text-neutral">
                  <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No customer inquiries yet</p>
                </div>
              )}
            </CardContent>
          </Card>
        </section>

        {/* Quick Actions */}
        <section>
          <h2 className="text-2xl font-bold text-primary mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <Mail className="w-8 h-8 text-primary mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Send Newsletter</h3>
                <p className="text-sm text-neutral">Send updates to all customers</p>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <TrendingUp className="w-8 h-8 text-secondary mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Generate Report</h3>
                <p className="text-sm text-neutral">Download monthly analytics</p>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <Users className="w-8 h-8 text-accent mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Manage Customers</h3>
                <p className="text-sm text-neutral">View and respond to inquiries</p>
              </CardContent>
            </Card>
            <a href="/analytics" className="block">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6 text-center">
                  <TrendingUp className="w-8 h-8 text-purple-600 mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">View Analytics</h3>
                  <p className="text-sm text-neutral">Detailed business insights</p>
                </CardContent>
              </Card>
            </a>
            <a href="/admin/login" className="block">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6 text-center">
                  <TrendingUp className="w-8 h-8 text-green-600 mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">Admin Panel</h3>
                  <p className="text-sm text-neutral">Manage products & orders</p>
                </CardContent>
              </Card>
            </a>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}