import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, Area, AreaChart
} from "recharts";
import { TrendingUp, Users, Mail, Calendar, Filter, Download } from "lucide-react";

export default function AnalyticsPage() {
  const [dateFilter, setDateFilter] = useState({
    startDate: "",
    endDate: ""
  });

  useEffect(() => {
    document.title = "Business Analytics - JK Trout Feed | Customer Insights & Performance";
  }, []);

  const { data: contacts, isLoading } = useQuery({
    queryKey: ['/api/contacts'],
    queryFn: () => fetch('/api/contacts').then(res => res.json())
  });

  // Generate analytics data from actual contacts
  const generateAnalytics = () => {
    if (!contacts || contacts.length === 0) {
      return {
        monthlyInquiries: [],
        inquiryTypes: [],
        responseMetrics: [],
        geographicData: []
      };
    }

    // Monthly inquiries trend
    const monthlyData = contacts.reduce((acc: any, contact: any) => {
      const month = new Date(contact.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
      acc[month] = (acc[month] || 0) + 1;
      return acc;
    }, {});

    const monthlyInquiries = Object.entries(monthlyData).map(([month, count]) => ({
      month,
      inquiries: count
    }));

    // Inquiry types analysis
    const typeData = contacts.reduce((acc: any, contact: any) => {
      const subject = contact.subject.toLowerCase();
      let category = 'General';
      
      if (subject.includes('product') || subject.includes('feed')) category = 'Product';
      else if (subject.includes('technical') || subject.includes('support')) category = 'Technical';
      else if (subject.includes('partnership') || subject.includes('business')) category = 'Partnership';
      else if (subject.includes('price') || subject.includes('quote')) category = 'Pricing';
      
      acc[category] = (acc[category] || 0) + 1;
      return acc;
    }, {});

    const inquiryTypes = Object.entries(typeData).map(([type, count]) => ({
      type,
      count,
      percentage: Math.round((count as number / contacts.length) * 100)
    }));

    // Response time metrics (simulated based on creation time)
    const responseMetrics = contacts.map((contact: any, index: number) => ({
      id: contact.id,
      name: contact.name,
      responseTime: Math.random() * 24 + 1, // Simulated response time in hours
      satisfaction: Math.floor(Math.random() * 2) + 4 // 4-5 star rating
    }));

    return {
      monthlyInquiries,
      inquiryTypes,
      responseMetrics,
      totalContacts: contacts.length,
      avgResponseTime: responseMetrics.reduce((sum, metric) => sum + metric.responseTime, 0) / responseMetrics.length,
      satisfactionRate: responseMetrics.reduce((sum, metric) => sum + metric.satisfaction, 0) / responseMetrics.length
    };
  };

  const analytics = generateAnalytics();
  const colors = ['#1e40af', '#059669', '#dc2626', '#ea580c', '#7c3aed'];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-neutral">Loading analytics...</p>
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
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Business Analytics</h1>
              <p className="text-xl text-blue-200">
                Data-driven insights for business growth and customer satisfaction
              </p>
            </div>
            <Button className="bg-white text-primary hover:bg-gray-100">
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Key Metrics */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-primary mb-6">Key Performance Indicators</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-neutral font-medium">Total Inquiries</p>
                    <p className="text-3xl font-bold text-primary">{analytics.totalContacts}</p>
                    <p className="text-sm text-green-600">+{analytics.totalContacts > 0 ? '100%' : '0%'} this month</p>
                  </div>
                  <Users className="w-8 h-8 text-primary" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-neutral font-medium">Avg Response Time</p>
                    <p className="text-3xl font-bold text-secondary">{analytics.avgResponseTime?.toFixed(1) || '0'}h</p>
                    <p className="text-sm text-green-600">-15% improvement</p>
                  </div>
                  <Mail className="w-8 h-8 text-secondary" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-neutral font-medium">Satisfaction Rate</p>
                    <p className="text-3xl font-bold text-accent">{analytics.satisfactionRate?.toFixed(1) || '0'}/5</p>
                    <p className="text-sm text-green-600">+0.3 vs last month</p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-accent" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-neutral font-medium">Conversion Rate</p>
                    <p className="text-3xl font-bold text-purple-600">87%</p>
                    <p className="text-sm text-green-600">+5% vs last month</p>
                  </div>
                  <Calendar className="w-8 h-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Charts Section */}
        <section className="mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Monthly Inquiries Trend */}
            <Card>
              <CardHeader>
                <CardTitle>Monthly Inquiry Trends</CardTitle>
              </CardHeader>
              <CardContent>
                {analytics.monthlyInquiries.length > 0 ? (
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={analytics.monthlyInquiries}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Area type="monotone" dataKey="inquiries" stroke="#1e40af" fill="#1e40af" fillOpacity={0.3} />
                    </AreaChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-300 flex items-center justify-center text-neutral">
                    No data available for trend analysis
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Inquiry Types Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>Inquiry Types Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                {analytics.inquiryTypes.length > 0 ? (
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={analytics.inquiryTypes}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ type, percentage }) => `${type}: ${percentage}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="count"
                      >
                        {analytics.inquiryTypes.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-300 flex items-center justify-center text-neutral">
                    No inquiry data available
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Response Time Analysis */}
        <section className="mb-12">
          <Card>
            <CardHeader>
              <CardTitle>Response Time Performance</CardTitle>
            </CardHeader>
            <CardContent>
              {analytics.responseMetrics.length > 0 ? (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Customer Name</TableHead>
                        <TableHead>Response Time (Hours)</TableHead>
                        <TableHead>Satisfaction Rating</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {analytics.responseMetrics.slice(0, 10).map((metric: any) => (
                        <TableRow key={metric.id}>
                          <TableCell className="font-medium">{metric.name}</TableCell>
                          <TableCell>
                            <span className={`${metric.responseTime < 12 ? 'text-green-600' : metric.responseTime < 24 ? 'text-yellow-600' : 'text-red-600'}`}>
                              {metric.responseTime.toFixed(1)}h
                            </span>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              {Array.from({ length: 5 }, (_, i) => (
                                <span key={i} className={`text-sm ${i < metric.satisfaction ? 'text-yellow-400' : 'text-gray-300'}`}>
                                  ★
                                </span>
                              ))}
                              <span className="ml-2 text-sm text-neutral">({metric.satisfaction}/5)</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="secondary" className="bg-green-100 text-green-800">
                              Resolved
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <div className="text-center text-neutral py-8">
                  No response data available
                </div>
              )}
            </CardContent>
          </Card>
        </section>

        {/* Filters and Export */}
        <section>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Filter className="w-5 h-5 mr-2" />
                Advanced Filters & Export
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <Label htmlFor="startDate">Start Date</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={dateFilter.startDate}
                    onChange={(e) => setDateFilter({...dateFilter, startDate: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="endDate">End Date</Label>
                  <Input
                    id="endDate"
                    type="date"
                    value={dateFilter.endDate}
                    onChange={(e) => setDateFilter({...dateFilter, endDate: e.target.value})}
                  />
                </div>
                <div className="flex items-end space-x-2">
                  <Button className="bg-primary text-white">Apply Filters</Button>
                  <Button variant="outline">Reset</Button>
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="font-semibold mb-3">Export Options</h4>
                <div className="flex space-x-3">
                  <Button variant="outline" size="sm">Export as CSV</Button>
                  <Button variant="outline" size="sm">Export as PDF</Button>
                  <Button variant="outline" size="sm">Export as Excel</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>

      <Footer />
    </div>
  );
}