import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { initializeSecurity } from "@/lib/security";
import { useEffect } from "react";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import About from "@/pages/about";
import Products from "@/pages/products";
import Team from "@/pages/team";
import Contact from "@/pages/contact";
import FeedingGuide from "@/pages/feeding-guide";
import AdminProducts from "@/pages/admin-products";
import AdminShowcase from "@/pages/admin-showcase";
import AdminDashboard from "@/pages/admin-dashboard";
import AdminContacts from "@/pages/admin-contacts";
import AdminOrders from "@/pages/admin-orders";
import AdminAnalytics from "@/pages/admin-analytics";
import AdminSettings from "@/pages/admin-settings";
import AdminLogin from "@/pages/admin-login";
import Shop from "@/pages/shop";
import AdminGuard from "@/components/admin-guard";
import FishAnimation from "@/components/fish-animation";
import WhatsAppButton from "@/components/whatsapp-button";

function ScrollToTop() {
  const [location] = useLocation();
  
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location]);
  
  return null;
}

function Router() {
  return (
    <>
      <ScrollToTop />
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/products" component={Products} />
        <Route path="/shop" component={Shop} />
        <Route path="/team" component={Team} />
        <Route path="/contact" component={Contact} />
        <Route path="/feeding-guide" component={FeedingGuide} />
        <Route path="/secure-portal-jk2024" component={AdminLogin} />
        <Route path="/admin/dashboard">
          {() => (
            <AdminGuard>
              <AdminDashboard />
            </AdminGuard>
          )}
        </Route>
        <Route path="/admin-products">
          {() => (
            <AdminGuard>
              <AdminProducts />
            </AdminGuard>
          )}
        </Route>
        <Route path="/admin-showcase">
          {() => (
            <AdminGuard>
              <AdminShowcase />
            </AdminGuard>
          )}
        </Route>
        <Route path="/admin-contacts">
          {() => (
            <AdminGuard>
              <AdminContacts />
            </AdminGuard>
          )}
        </Route>
        <Route path="/admin-orders">
          {() => (
            <AdminGuard>
              <AdminOrders />
            </AdminGuard>
          )}
        </Route>
        <Route path="/admin-analytics">
          {() => (
            <AdminGuard>
              <AdminAnalytics />
            </AdminGuard>
          )}
        </Route>
        <Route path="/admin-settings">
          {() => (
            <AdminGuard>
              <AdminSettings />
            </AdminGuard>
          )}
        </Route>
        <Route component={NotFound} />
      </Switch>
    </>
  );
}

function App() {
  useEffect(() => {
    initializeSecurity();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen bg-background text-foreground page-transition">
          <Router />
          <FishAnimation />
          <WhatsAppButton />
          <Toaster />
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;