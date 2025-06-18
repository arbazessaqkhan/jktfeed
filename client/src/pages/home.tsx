import { useEffect } from "react";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import Hero from "@/components/sections/hero";
import About from "@/components/sections/about";
import Showcase from "@/components/sections/showcase";
import ShopProducts from "@/components/sections/shop-products";
import Products from "@/components/sections/products";
import FeedingGuide from "@/components/sections/feeding-guide";
import Team from "@/components/sections/team";
import FAQ from "@/components/sections/faq";
import Contact from "@/components/sections/contact";

export default function Home() {
  useEffect(() => {
    // SEO Meta Tags for Home Page
    document.title = "JK Trout Feed - Premium Aquaculture Feed Manufacturing in Kashmir | QuantaFONS";
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'JK Trout Feed manufactures premium quality trout feed in Kashmir with advanced nutritional profiles. Specialized feeds for early stage, small stage, and stock trout with proven results in aquaculture farming.');
    }
    
    // Update Open Graph title
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', 'JK Trout Feed - Premium Aquaculture Feed Manufacturing in Kashmir');
    }
    
    // Add structured data for homepage
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "JK Trout Feed - Premium Aquaculture Feed Manufacturing",
      "description": "Premium quality trout feed manufacturing in Kashmir with specialized feeds for all stages of trout development.",
      "url": "https://jktroutfeed.com/",
      "mainEntity": {
        "@type": "Organization",
        "name": "JK Trout Feed",
        "description": "Leading aquaculture feed manufacturer in Kashmir specializing in premium trout feed production."
      },
      "breadcrumb": {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://jktroutfeed.com/"
          }
        ]
      }
    };
    
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(structuredData);
    document.head.appendChild(script);
    
    return () => {
      // Cleanup script on unmount
      const scripts = document.querySelectorAll('script[type="application/ld+json"]');
      scripts.forEach(script => {
        if (script.textContent?.includes('"@type":"WebPage"')) {
          script.remove();
        }
      });
    };
  }, []);

  return (
    <div className="min-h-screen page-enter">
      <Navbar />
      <main itemScope itemType="https://schema.org/WebPage">
        <Hero />
        <section className="py-16 bg-white/70 backdrop-blur-sm fade-in">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center slide-in-1">
                <div className="bg-primary text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 hover-lift float-gentle">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Advanced Manufacturing</h3>
                <p className="text-neutral">State-of-the-art facility in SIDCO Estate, Lassipora</p>
              </div>
              <div className="text-center">
                <div className="bg-secondary text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Premium Quality</h3>
                <p className="text-neutral">Superior raw materials with balanced nutritional profiles</p>
              </div>
              <div className="text-center">
                <div className="bg-accent text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Proven Results</h3>
                <p className="text-neutral">Excellent feed conversion and low mortality rates</p>
              </div>
            </div>
          </div>
        </section>
        <About />
        <Showcase />
        <ShopProducts />
        <Products />
        <FeedingGuide />
        <Team />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
