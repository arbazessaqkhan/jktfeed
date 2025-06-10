import { Button } from "@/components/ui/button";

export default function Hero() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="home" className="relative bg-gradient-to-r from-primary to-secondary text-white py-20">
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080')"
        }}
      />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">The Name You Can Trust</h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            We have the most advanced Manufacturing Facility to produce premium Trout Feed in Jammu & Kashmir
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => scrollToSection("products")}
              className="bg-white text-primary px-8 py-3 text-lg font-semibold hover:bg-gray-100"
            >
              View Products
            </Button>
            <Button 
              onClick={() => scrollToSection("contact")}
              variant="outline"
              className="border-2 border-white text-white px-8 py-3 text-lg font-semibold hover:bg-white hover:text-primary"
            >
              Get Quote
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
