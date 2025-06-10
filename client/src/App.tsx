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
import Shop from "@/pages/shop";

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
      <Route path="/admin/products" component={AdminProducts} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
