import { Button } from "@/components/ui/button";

export default function Hero() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="home" className="relative bg-gradient-to-r from-primary to-secondary text-white py-20 overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0">
        <video 
          className="w-full h-full object-cover opacity-25"
          autoPlay 
          muted 
          loop 
          playsInline
        >
          <source src="https://videos.pexels.com/video-files/4770988/4770988-uhd_2560_1440_25fps.mp4" type="video/mp4" />
          <source src="https://videos.pexels.com/video-files/856356/856356-hd_1920_1080_30fps.mp4" type="video/mp4" />
        </video>
        {/* Fallback background image */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080')"
          }}
        />
      </div>
      
      {/* Animated Water Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-900/10 to-primary/30"></div>
      
      {/* Floating Particles */}
      <div className="absolute inset-0">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={`particle-${i}`}
            className="absolute rounded-full bg-white opacity-10 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${2 + Math.random() * 6}px`,
              height: `${2 + Math.random() * 6}px`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${3 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
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
              className="border-2 border-white px-8 py-3 text-lg font-semibold hover:bg-white hover:text-primary text-[#064e87]"
            >
              Get Quote
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
