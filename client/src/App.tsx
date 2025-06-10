import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import About from "@/pages/about";
import Products from "@/pages/products";
import Team from "@/pages/team";
import Contact from "@/pages/contact";
import FeedingGuide from "@/pages/feeding-guide";
import Dashboard from "@/pages/dashboard";
import Analytics from "@/pages/analytics";
import AdminProducts from "@/pages/admin-products";
import AdminLogin from "@/pages/admin-login";
import Shop from "@/pages/shop";
import AdminGuard from "@/components/admin-guard";
import FishAnimation from "@/components/fish-animation";
import WhatsAppButton from "@/components/whatsapp-button";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/products" component={Products} />
      <Route path="/shop" component={Shop} />
      <Route path="/team" component={Team} />
      <Route path="/contact" component={Contact} />
      <Route path="/feeding-guide" component={FeedingGuide} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/analytics" component={Analytics} />
      <Route path="/admin/login" component={AdminLogin} />
      <Route path="/admin/products">
        {() => (
          <AdminGuard>
            <AdminProducts />
          </AdminGuard>
        )}
      </Route>
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  // Disable right-click context menu
  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    return false;
  };

  // Disable F12, Ctrl+Shift+I, Ctrl+U, and other developer shortcuts
  const handleKeyDown = (e: React.KeyboardEvent) => {
    // F12
    if (e.key === 'F12') {
      e.preventDefault();
      return false;
    }
    // Ctrl+Shift+I (Developer Tools)
    if (e.ctrlKey && e.shiftKey && e.key === 'I') {
      e.preventDefault();
      return false;
    }
    // Ctrl+U (View Source)
    if (e.ctrlKey && e.key === 'u') {
      e.preventDefault();
      return false;
    }
    // Ctrl+Shift+C (Inspect Element)
    if (e.ctrlKey && e.shiftKey && e.key === 'C') {
      e.preventDefault();
      return false;
    }
    // Ctrl+Shift+J (Console)
    if (e.ctrlKey && e.shiftKey && e.key === 'J') {
      e.preventDefault();
      return false;
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div 
          className="relative min-h-screen"
          onContextMenu={handleContextMenu}
          onKeyDown={handleKeyDown}
          style={{ userSelect: 'none' }}
        >
          <FishAnimation />
          <div className="relative z-10">
            <Router />
          </div>
          <WhatsAppButton />
          <Toaster />
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
