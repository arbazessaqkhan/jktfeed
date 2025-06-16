import { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocation } from "wouter";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { 
  Settings, Save, User, LogOut, Globe, Bell, 
  Shield, Database, Mail, Phone
} from "lucide-react";

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<any>({});
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [, navigate] = useLocation();

  useEffect(() => {
    document.title = "Settings - JK Trout Feed Admin";
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

  const { data: settingsData, isLoading } = useQuery({
    queryKey: ['/api/settings'],
    queryFn: () => fetch('/api/settings').then(res => res.json())
  });

  useEffect(() => {
    if (settingsData) {
      const settingsObj = settingsData.reduce((acc: any, setting: any) => {
        acc[setting.key] = setting.value;
        return acc;
      }, {});
      setSettings(settingsObj);
    }
  }, [settingsData]);

  const updateSettingMutation = useMutation({
    mutationFn: ({ key, value }: { key: string, value: string }) =>
      apiRequest("PUT", `/api/settings/${key}`, { value }),
    onSuccess: () => {
      toast({
        title: "Settings Updated",
        description: "Your settings have been saved successfully.",
      });
      queryClient.invalidateQueries({ queryKey: ['/api/settings'] });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update settings.",
        variant: "destructive",
      });
    }
  });

  const handleSettingChange = (key: string, value: string) => {
    setSettings((prev: any) => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    Object.entries(settings).forEach(([key, value]) => {
      updateSettingMutation.mutate({ key, value: value as string });
    });
  };

  const settingsSections = [
    {
      title: "General Settings",
      icon: Globe,
      settings: [
        { key: "site_name", label: "Site Name", type: "text", defaultValue: "JK Trout Feed" },
        { key: "site_description", label: "Site Description", type: "textarea", defaultValue: "Premium quality trout feed for optimal growth" },
        { key: "admin_email", label: "Admin Email", type: "email", defaultValue: "admin@jktroutfeed.com" },
        { key: "support_phone", label: "Support Phone", type: "text", defaultValue: "+91 9876543210" }
      ]
    },
    {
      title: "Business Information",
      icon: Database,
      settings: [
        { key: "company_address", label: "Company Address", type: "textarea", defaultValue: "SIDCO Estate, Lassipora, Pulwama, J&K" },
        { key: "business_hours", label: "Business Hours", type: "text", defaultValue: "Mon-Sat: 9:00 AM - 6:00 PM" },
        { key: "gst_number", label: "GST Number", type: "text", defaultValue: "22XXXXX1234X1Z5" },
        { key: "pan_number", label: "PAN Number", type: "text", defaultValue: "ABCDE1234F" }
      ]
    },
    {
      title: "Notification Settings",
      icon: Bell,
      settings: [
        { key: "email_notifications", label: "Email Notifications", type: "switch", defaultValue: "true" },
        { key: "sms_notifications", label: "SMS Notifications", type: "switch", defaultValue: "false" },
        { key: "order_notifications", label: "Order Notifications", type: "switch", defaultValue: "true" },
        { key: "low_stock_alerts", label: "Low Stock Alerts", type: "switch", defaultValue: "true" }
      ]
    },
    {
      title: "Security Settings",
      icon: Shield,
      settings: [
        { key: "session_timeout", label: "Session Timeout (hours)", type: "number", defaultValue: "24" },
        { key: "require_2fa", label: "Require 2FA", type: "switch", defaultValue: "false" },
        { key: "login_attempts", label: "Max Login Attempts", type: "number", defaultValue: "5" },
        { key: "password_expiry", label: "Password Expiry (days)", type: "number", defaultValue: "90" }
      ]
    }
  ];

  const renderSettingInput = (setting: any) => {
    const value = settings[setting.key] || setting.defaultValue;

    switch (setting.type) {
      case "textarea":
        return (
          <Textarea
            value={value}
            onChange={(e) => handleSettingChange(setting.key, e.target.value)}
            placeholder={setting.defaultValue}
            rows={3}
          />
        );
      case "switch":
        return (
          <Switch
            checked={value === "true"}
            onCheckedChange={(checked) => handleSettingChange(setting.key, checked.toString())}
          />
        );
      case "number":
        return (
          <Input
            type="number"
            value={value}
            onChange={(e) => handleSettingChange(setting.key, e.target.value)}
            placeholder={setting.defaultValue}
          />
        );
      default:
        return (
          <Input
            type={setting.type}
            value={value}
            onChange={(e) => handleSettingChange(setting.key, e.target.value)}
            placeholder={setting.defaultValue}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Header */}
      <section className="bg-gradient-to-r from-primary to-secondary text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">System Settings</h1>
              <p className="text-xl text-blue-200">Configure your business preferences</p>
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
        {isLoading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-neutral">Loading settings...</p>
          </div>
        ) : (
          <>
            {/* Settings Sections */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {settingsSections.map((section) => {
                const IconComponent = section.icon;
                return (
                  <Card key={section.title}>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <IconComponent className="w-5 h-5 mr-2" />
                        {section.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {section.settings.map((setting) => (
                        <div key={setting.key} className="space-y-2">
                          <Label htmlFor={setting.key}>
                            {setting.label}
                          </Label>
                          {setting.type === "switch" ? (
                            <div className="flex items-center space-x-2">
                              {renderSettingInput(setting)}
                              <span className="text-sm text-gray-600">
                                {settings[setting.key] === "true" ? "Enabled" : "Disabled"}
                              </span>
                            </div>
                          ) : (
                            renderSettingInput(setting)
                          )}
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* System Information */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Database className="w-5 h-5 mr-2" />
                  System Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-semibold text-gray-900">System Status</h4>
                    <p className="text-2xl font-bold text-green-600 mt-2">Online</p>
                    <p className="text-sm text-gray-600">All systems operational</p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-semibold text-gray-900">Database</h4>
                    <p className="text-2xl font-bold text-blue-600 mt-2">Connected</p>
                    <p className="text-sm text-gray-600">PostgreSQL ready</p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-semibold text-gray-900">Last Backup</h4>
                    <p className="text-2xl font-bold text-purple-600 mt-2">Today</p>
                    <p className="text-sm text-gray-600">Auto-backup enabled</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Save Button */}
            <div className="flex justify-end">
              <Button
                onClick={handleSave}
                disabled={updateSettingMutation.isPending}
                className="bg-primary text-white hover:bg-secondary"
              >
                <Save className="w-4 h-4 mr-2" />
                {updateSettingMutation.isPending ? "Saving..." : "Save All Settings"}
              </Button>
            </div>
          </>
        )}
      </div>

      <Footer />
    </div>
  );
}